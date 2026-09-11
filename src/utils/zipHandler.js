import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { SERVICE_WORKER_CODE, SW_REGISTER_SCRIPT } from './swTemplate';

// Helper to determine file type based on extension
export const getFileType = (path) => {
  const ext = path.split('.').pop().toLowerCase();
  if (['html', 'htm'].includes(ext)) return 'html';
  if (['css'].includes(ext)) return 'css';
  if (['js', 'mjs', 'jsx'].includes(ext)) return 'js';
  if (['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp', 'ico'].includes(ext)) return 'image';
  return 'other';
};

// Extract ZIP file into virtual filesystem with path normalization
export const extractZipFile = async (zipBlobOrFile, onProgress) => {
  if (onProgress) onProgress(10, 'Reading ZIP archive file...');
  const zip = new JSZip();
  const loadedZip = await zip.loadAsync(zipBlobOrFile, (metadata) => {
    if (onProgress && metadata.percent) {
      const calcPct = Math.min(30, Math.round(10 + (metadata.percent * 0.2)));
      onProgress(calcPct, `Decompressing archive... ${Math.round(metadata.percent)}%`);
    }
  });
  
  const files = {};
  const entries = Object.entries(loadedZip.files);
  
  // Filter out Mac OS metadata, hidden files and directories
  const validEntries = entries.filter(([path, entry]) => {
    if (entry.dir) return false;
    const parts = path.split('/');
    // Ignore __MACOSX or hidden files (starting with dot) in any path segment
    const isHidden = parts.some(part => part.startsWith('.') || part.startsWith('__MACOSX'));
    return !isHidden;
  });

  // Detect if there is a common parent folder wrapper (e.g. "picked/index.html")
  let commonPrefix = '';
  if (validEntries.length > 0) {
    const firstPath = validEntries[0][0];
    const slashIdx = firstPath.indexOf('/');
    if (slashIdx !== -1) {
      const prefix = firstPath.substring(0, slashIdx + 1); // e.g. "picked/"
      const allSharePrefix = validEntries.every(([path]) => path.startsWith(prefix));
      if (allSharePrefix) {
        commonPrefix = prefix;
      }
    }
  }
  
  const total = validEntries.length;
  let count = 0;

  for (const [relativePath, zipEntry] of validEntries) {
    count++;
    if (onProgress && total > 0) {
      const pct = Math.min(85, Math.round(30 + ((count / total) * 55)));
      onProgress(pct, `Extracting file ${count} of ${total}: ${zipEntry.name.split('/').pop()}`);
    }

    // Normalize separating slashes
    let cleanPath = relativePath.replace(/\\/g, '/');
    if (commonPrefix && cleanPath.startsWith(commonPrefix)) {
      cleanPath = cleanPath.substring(commonPrefix.length);
    }
    
    const fileType = getFileType(cleanPath);
    let content = null;
    let blobUrl = null;
    
    if (fileType === 'image') {
      const blob = await zipEntry.async('blob');
      blobUrl = URL.createObjectURL(blob);
      content = await zipEntry.async('base64');
    } else {
      content = await zipEntry.async('string');
    }
    
    files[cleanPath] = {
      path: cleanPath,
      name: cleanPath.split('/').pop(),
      type: fileType,
      content: content,
      blobUrl: blobUrl,
      updatedAt: Date.now()
    };
  }
  
  if (onProgress) onProgress(90, 'Processing HTML tags & visual workspace...');
  return files;
};

// Generate ZIP file from virtual filesystem and trigger download
export const downloadProjectZip = async (files, projectName = 'my-published-website') => {
  const zip = new JSZip();
  
  for (const [path, fileObj] of Object.entries(files)) {
    if (fileObj.type === 'image') {
      if (fileObj.blobUrl) {
        // Fetch blob and convert to arrayBuffer
        const response = await fetch(fileObj.blobUrl);
        const blob = await response.blob();
        zip.file(path, blob);
      } else if (fileObj.content) {
        zip.file(path, fileObj.content, { base64: true });
      }
    } else {
      // Clean HTML or code before saving
      let cleanContent = fileObj.content;
      if (fileObj.type === 'html') {
        // Strip out any editor helper scripts/attributes if present
        cleanContent = cleanHtmlForExport(cleanContent);
      }
      zip.file(path, cleanContent);
    }
  }

  // Include sw.js Service Worker for automatic image caching
  zip.file('sw.js', SERVICE_WORKER_CODE);
  
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, `${projectName}.zip`);
};

// Clean up helper attributes injected for visual editing
export const cleanHtmlForExport = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  
  // Remove data-sitecraft attributes
  const elements = doc.querySelectorAll('*');
  elements.forEach((el) => {
    el.removeAttribute('data-sitecraft-id');
    el.removeAttribute('contenteditable');
  });
  
  // Remove editor-only helper elements (e.g. "+ Add Image Card" placeholders)
  const editorOnlyElems = doc.querySelectorAll('[data-sitecraft-editor-only="true"], .sitecraft-add-card');
  editorOnlyElems.forEach((el) => el.remove());

  // Remove injected helper styles/scripts if any
  const helperStyles = doc.querySelectorAll('#sitecraft-editor-styles');
  helperStyles.forEach((s) => s.remove());

  // Inject Service Worker registration script if not already present
  let html = doc.documentElement.outerHTML;
  if (!html.includes('navigator.serviceWorker.register')) {
    html = html.replace('</body>', `${SW_REGISTER_SCRIPT}\n</body>`);
  }
  
  return html;
};
