// Utility for DOM parsing, element tagging, property extraction and inline modifications

export const resolveRelativePath = (basePath, relPath) => {
  if (!relPath || relPath.startsWith('http') || relPath.startsWith('//') || relPath.startsWith('data:')) {
    return relPath;
  }
  
  // Normalize windows backslashes
  const normalizedRel = relPath.replace(/\\/g, '/');
  
  // If absolute path or root relative path
  if (normalizedRel.startsWith('/')) {
    return normalizedRel.substring(1);
  }
  
  const baseParts = basePath.split('/').slice(0, -1);
  const relParts = normalizedRel.split('/');
  
  for (const part of relParts) {
    if (part === '.' || part === '') {
      continue;
    } else if (part === '..') {
      baseParts.pop();
    } else {
      baseParts.push(part);
    }
  }
  
  const resolved = baseParts.join('/');
  // Strip query params and hash strings
  return resolved.split('?')[0].split('#')[0];
};

// Inline @import statements inside a CSS file recursively
export const inlineCssImports = (cssContent, cssFilePath, filesMap, visited = new Set()) => {
  if (!cssContent || visited.has(cssFilePath)) return '';
  visited.add(cssFilePath);
  
  // Match @import url("path.css"); or @import "path.css";
  const importRegex = /@import\s+(?:url\s*\(\s*(['"]?)([^'")]+)\1\s*\)|(['"])([^'"]+)\3)\s*;?/gi;
  
  return cssContent.replace(importRegex, (match, quote1, urlPath1, quote2, urlPath2) => {
    const relPath = urlPath1 || urlPath2;
    if (!relPath) return match;
    
    // Skip absolute/external imports
    if (relPath.startsWith('http') || relPath.startsWith('//') || relPath.startsWith('data:')) {
      return match;
    }
    
    const resolvedPath = resolveRelativePath(cssFilePath, relPath);
    const importedFile = filesMap[resolvedPath];
    
    if (importedFile && importedFile.content) {
      return inlineCssImports(importedFile.content, resolvedPath, filesMap, visited);
    }
    
    return match;
  });
};

// Cache for converted inline data URLs to prevent duplicate Blob URL creation
const inlineBlobCache = new Map();

// Convert inline base64 data URLs in CSS/styles to lightweight Blob URLs
export const convertDataUrlToBlobUrl = (dataUrl) => {
  if (!dataUrl || !dataUrl.startsWith('data:image/')) return dataUrl;
  if (inlineBlobCache.has(dataUrl)) {
    return inlineBlobCache.get(dataUrl);
  }
  try {
    const commaIdx = dataUrl.indexOf(',');
    if (commaIdx === -1) return dataUrl;
    const header = dataUrl.substring(0, commaIdx);
    const base64 = dataUrl.substring(commaIdx + 1);
    const mimeMatch = header.match(/data:(image\/[^;]+);base64/i);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    const blobUrl = base64ToBlobUrl(base64, mimeType);
    inlineBlobCache.set(dataUrl, blobUrl);
    return blobUrl;
  } catch (e) {
    return dataUrl;
  }
};

// Convert base64 data strings to browser Blob URLs on demand to avoid megabyte-sized HTML strings
export const base64ToBlobUrl = (base64, mimeType = 'image/png') => {
  try {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: mimeType });
    return URL.createObjectURL(blob);
  } catch (e) {
    return `data:${mimeType};base64,${base64}`;
  }
};

const getMimeType = (path) => {
  const ext = (path || '').split('.').pop().toLowerCase();
  switch (ext) {
    case 'svg': return 'image/svg+xml';
    case 'jpg': case 'jpeg': return 'image/jpeg';
    case 'webp': return 'image/webp';
    case 'gif': return 'image/gif';
    case 'png': default: return 'image/png';
  }
};

// Retrieve or generate a lightweight Blob URL for image files to keep HTML strings small
export const getOrCreateBlobUrl = (fileObj) => {
  if (!fileObj) return '';
  if (fileObj.blobUrl) return fileObj.blobUrl;
  if (fileObj.content && fileObj.type === 'image') {
    const mime = getMimeType(fileObj.path || fileObj.name);
    fileObj.blobUrl = base64ToBlobUrl(fileObj.content, mime);
    return fileObj.blobUrl;
  }
  return '';
};

// Non-interactive micro tags to skip during DOM element tagging to keep DOM size small
const IGNORED_TAGS = new Set([
  'SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME',
  'SVG', 'PATH', 'G', 'CIRCLE', 'RECT', 'POLYGON', 'POLYLINE', 'LINE', 'USE', 'DEFS', 'SYMBOL',
  'BR', 'HR', 'HEAD', 'META', 'LINK', 'TITLE'
]);

// Resolve relative url(...) references in a CSS content string to browser blob URLs
export const resolveCssUrls = (cssContent, cssFilePath = 'style.css', filesMap = {}) => {
  if (!cssContent) return '';
  
  // Matches url(...) in CSS
  const urlRegex = /url\s*\(\s*(['"]?)([^'")\s]+)\1\s*\)/gi;
  
  return cssContent.replace(urlRegex, (match, quote, relPath) => {
    if (relPath.startsWith('data:image/')) {
      const bUrl = convertDataUrlToBlobUrl(relPath);
      return `url(${quote}${bUrl}${quote})`;
    }
    if (relPath.startsWith('http') || relPath.startsWith('//') || relPath.startsWith('#')) {
      return match;
    }
    
    const resolvedPath = resolveRelativePath(cssFilePath, relPath);
    const matchedFile = filesMap[resolvedPath];
    
    if (matchedFile && matchedFile.type === 'image') {
      const bUrl = getOrCreateBlobUrl(matchedFile);
      if (bUrl) {
        return `url(${quote}${bUrl}${quote})`;
      }
    }
    
    return match;
  });
};

export const inlineJsonFiles = (htmlString, filesMap) => {
  if (!htmlString) return '';
  
  // Regex to match: // sitecraft-inline-json:filename.json followed by variable declaration const/let/var varname = ...;
  const jsonRegex = /\/\/\s*sitecraft-inline-json:([a-zA-Z0-9_\-\.]+)\s*\r?\n\s*(const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*([\s\S]*?);/g;
  
  return htmlString.replace(jsonRegex, (match, filename, decl, varName, defaultValue) => {
    const jsonFile = filesMap[filename];
    if (jsonFile && jsonFile.content) {
      try {
        // Validate it is valid JSON
        JSON.parse(jsonFile.content);
        return `// sitecraft-inline-json:${filename}\n${decl} ${varName} = ${jsonFile.content.trim()};`;
      } catch (e) {
        console.warn(`Invalid JSON content in ${filename}`, e);
      }
    }
    return match;
  });
};

const getMaxSitecraftId = (doc) => {
  let maxId = 0;
  if (!doc || !doc.body) return maxId;
  const allElements = doc.body.querySelectorAll('*');
  allElements.forEach((el) => {
    const id = el.getAttribute('data-sitecraft-id');
    if (id && id.startsWith('sc-')) {
      const num = parseInt(id.replace('sc-', ''), 10);
      if (!isNaN(num) && num > maxId) {
        maxId = num;
      }
    }
  });
  return maxId;
};

export const tagHtmlElements = (htmlString, filesMap = {}, activeFilePath = 'index.html') => {
  if (!htmlString) return '';
  
  const inlinedJsonHtml = inlineJsonFiles(htmlString, filesMap);
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(inlinedJsonHtml, 'text/html');
  
  let elementIdCounter = getMaxSitecraftId(doc) + 1;
  
  // Traverse elements in body and assign data-sitecraft-id, filtering out SVG/micro tags
  const allElements = doc.body ? doc.body.querySelectorAll('*') : [];
  allElements.forEach((el) => {
    if (IGNORED_TAGS.has(el.tagName.toUpperCase())) return;
    
    if (!el.getAttribute('data-sitecraft-id')) {
      el.setAttribute('data-sitecraft-id', `sc-${elementIdCounter++}`);
    }
  });
  
  // Filter linked CSS stylesheet tags case-insensitively
  const linkTags = Array.from(doc.querySelectorAll('link')).filter(link => {
    const rel = (link.getAttribute('rel') || '').toLowerCase().trim();
    return rel === 'stylesheet';
  });

  linkTags.forEach((link) => {
    const href = link.getAttribute('href');
    if (href) {
      const cssFileName = resolveRelativePath(activeFilePath, href);
      const cssFile = filesMap[cssFileName];
      if (cssFile && cssFile.content) {
        // Resolve nested imports recursively and swap relative assets with base64/blobs
        const inlinedCss = inlineCssImports(cssFile.content, cssFileName, filesMap);
        const resolvedCss = resolveCssUrls(inlinedCss, cssFileName, filesMap);
        
        const styleEl = doc.createElement('style');
        styleEl.setAttribute('data-injected-from', cssFileName);
        styleEl.textContent = resolvedCss;
        link.parentNode.insertBefore(styleEl, link);
      }
    }
  });

  // Optimize all <style> tags containing data:image/ URIs
  const styleTags = doc.querySelectorAll('style');
  styleTags.forEach((styleTag) => {
    if (styleTag.textContent && styleTag.textContent.includes('data:image/')) {
      styleTag.textContent = resolveCssUrls(styleTag.textContent, activeFilePath, filesMap);
    }
  });

  // Optimize all elements with inline style attributes containing data:image/ URIs
  const inlineStyledElements = doc.querySelectorAll('[style*="data:image/"]');
  inlineStyledElements.forEach((el) => {
    const styleAttr = el.getAttribute('style');
    if (styleAttr) {
      el.setAttribute('style', resolveCssUrls(styleAttr, activeFilePath, filesMap));
    }
  });

  // Dynamically swap image src elements with cached Blob URLs and optimize async decoding / lazy loading for galleries
  const imgTags = doc.querySelectorAll('img');
  imgTags.forEach((img) => {
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    const src = img.getAttribute('src');
    if (src) {
      if (src.startsWith('data:image/')) {
        const bUrl = convertDataUrlToBlobUrl(src);
        img.setAttribute('src', bUrl);
      } else {
        const imgPath = resolveRelativePath(activeFilePath, src);
        const imgFile = filesMap[imgPath];
        if (imgFile) {
          const bUrl = getOrCreateBlobUrl(imgFile);
          if (bUrl) {
            img.setAttribute('src', bUrl);
          }
        }
      }
    }
  });

  const head = doc.head || doc.createElement('head');

  // Preconnect to Google Fonts if font stylesheets are used to optimize iframe rendering speed
  if (doc.querySelector('link[href*="fonts.googleapis.com"]')) {
    if (!doc.querySelector('link[rel="preconnect"][href*="fonts.googleapis.com"]')) {
      const p1 = doc.createElement('link');
      p1.rel = 'preconnect';
      p1.href = 'https://fonts.googleapis.com';
      head.appendChild(p1);
    }
    if (!doc.querySelector('link[rel="preconnect"][href*="fonts.gstatic.com"]')) {
      const p2 = doc.createElement('link');
      p2.rel = 'preconnect';
      p2.href = 'https://fonts.gstatic.com';
      p2.setAttribute('crossorigin', '');
      head.appendChild(p2);
    }
  }

  const flagScript = doc.createElement('script');
  flagScript.id = 'sitecraft-editor-flag';
  flagScript.textContent = 'window._sitecraftEditorMode = true;';
  head.appendChild(flagScript);

  const styleEl = doc.createElement('style');
  styleEl.id = 'sitecraft-editor-styles';
  styleEl.textContent = `
    #sitecraft-lightbox-modal {
      display: none !important;
      pointer-events: none !important;
    }
    [data-sitecraft-id] {
      transition: outline 0.15s ease, box-shadow 0.15s ease;
      cursor: pointer !important;
    }
    [data-sitecraft-id]:hover {
      outline: 2px dashed #6366f1 !important;
      outline-offset: 2px;
    }
    [data-sitecraft-id].sitecraft-selected {
      outline: 3px solid #6366f1 !important;
      outline-offset: 3px;
      box-shadow: 0 0 12px rgba(99, 102, 241, 0.4) !important;
    }
    .sitecraft-drop-indicator {
      height: 4px;
      background: #6366f1;
      margin: 12px 0;
      border-radius: 2px;
      box-shadow: 0 0 8px rgba(99, 102, 241, 0.8);
      position: relative;
      pointer-events: none;
      transition: all 0.2s ease;
    }
    .sitecraft-drop-indicator::before {
      content: '';
      position: absolute;
      left: 0;
      top: -4px;
      width: 12px;
      height: 12px;
      background: #6366f1;
      border-radius: 50%;
    }
    .sitecraft-drop-indicator::after {
      content: '';
      position: absolute;
      right: 0;
      top: -4px;
      width: 12px;
      height: 12px;
      background: #6366f1;
      border-radius: 50%;
    }
  `;
  head.appendChild(styleEl);

  return doc.documentElement.outerHTML;
};

// Update element properties inside an HTML string
export const updateElementInHtml = (htmlString, sitecraftId, updates) => {
  if (!htmlString || !sitecraftId) return htmlString;
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const targetEl = doc.querySelector(`[data-sitecraft-id="${sitecraftId}"]`);
  
  if (!targetEl) return htmlString;

  if (updates.textContent !== undefined) {
    targetEl.textContent = updates.textContent;
  }
  
  if (updates.attributes) {
    Object.entries(updates.attributes).forEach(([attr, val]) => {
      if (val === null || val === '') {
        targetEl.removeAttribute(attr);
      } else {
        targetEl.setAttribute(attr, val);
      }
    });
  }

  if (updates.styles) {
    Object.entries(updates.styles).forEach(([styleKey, styleVal]) => {
      targetEl.style[styleKey] = styleVal;
    });
  }

  return doc.documentElement.outerHTML;
};

// Insert a component block into an HTML string before closing </body>
export const insertBlockIntoHtml = (htmlString, blockHtml) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  
  const tempContainer = doc.createElement('div');
  tempContainer.innerHTML = blockHtml;
  
  if (doc.body) {
    const scripts = doc.body.querySelectorAll('script');
    const insertBeforeEl = scripts.length > 0 ? scripts[0] : null;
    
    // Copy child nodes to array to avoid DOM mutation index shift issues
    const childrenToInsert = Array.from(tempContainer.childNodes);
    childrenToInsert.forEach(child => {
      if (insertBeforeEl) {
        doc.body.insertBefore(child, insertBeforeEl);
      } else {
        doc.body.appendChild(child);
      }
    });
  }
  
  return doc.documentElement.outerHTML;
};

// Delete element by data-sitecraft-id
export const deleteElementFromHtml = (htmlString, sitecraftId) => {
  if (!htmlString || !sitecraftId) return htmlString;
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const targetEl = doc.querySelector(`[data-sitecraft-id="${sitecraftId}"]`);
  if (targetEl) {
    targetEl.remove();
  }
  return doc.documentElement.outerHTML;
};

// Generate clean compiled HTML string with inline stylesheets for standalone/detached viewing
export const getCompiledPageHtml = (fileObj, filesMap = {}, activeFilePath = 'index.html') => {
  if (!fileObj || fileObj.type !== 'html') return '';
  
  const inlinedJsonHtml = inlineJsonFiles(fileObj.content, filesMap);
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(inlinedJsonHtml, 'text/html');

  // Filter linked CSS stylesheet tags case-insensitively
  const linkTags = Array.from(doc.querySelectorAll('link')).filter(link => {
    const rel = (link.getAttribute('rel') || '').toLowerCase().trim();
    return rel === 'stylesheet';
  });

  linkTags.forEach((link) => {
    const href = link.getAttribute('href');
    if (href) {
      const cssFileName = resolveRelativePath(activeFilePath, href);
      const cssFile = filesMap[cssFileName];
      if (cssFile && cssFile.content) {
        // Resolve nested CSS imports recursively and swap relative assets
        const inlinedCss = inlineCssImports(cssFile.content, cssFileName, filesMap);
        const resolvedCss = resolveCssUrls(inlinedCss, cssFileName, filesMap);
        
        const styleEl = doc.createElement('style');
        styleEl.textContent = resolvedCss;
        link.parentNode.insertBefore(styleEl, link);
      }
    }
  });

  // Dynamically swap image src elements with object URLs/blob URLs
  const imgTags = doc.querySelectorAll('img');
  imgTags.forEach((img) => {
    const src = img.getAttribute('src');
    if (src) {
      const imgPath = resolveRelativePath(activeFilePath, src);
      const imgFile = filesMap[imgPath];
      if (imgFile && imgFile.blobUrl) {
        img.setAttribute('src', imgFile.blobUrl);
      }
    }
  });

  // Remove editor-only helper elements (e.g. "+ Add Image Card" placeholders)
  const editorOnlyElems = doc.querySelectorAll('[data-sitecraft-editor-only="true"], .sitecraft-add-card');
  editorOnlyElems.forEach((el) => el.remove());

  // Remove any editor helper attributes
  const elements = doc.querySelectorAll('*');
  elements.forEach((el) => {
    el.removeAttribute('data-sitecraft-id');
    el.removeAttribute('contenteditable');
  });

  return doc.documentElement.outerHTML;
};

// Retrieve a list of direct page section containers for layout rearranging
export const getPageSections = (htmlString) => {
  if (!htmlString) return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  if (!doc.body) return [];
  
  const sections = [];
  const children = Array.from(doc.body.children);
  
  children.forEach((child) => {
    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME'].includes(child.tagName)) return;
    
    const scId = child.getAttribute('data-sitecraft-id');
    if (!scId) return; // Skip helper elements without ids
    
    // Get a descriptive name
    let displayName = '';
    const heading = child.querySelector('h1, h2, h3, h4');
    if (heading && heading.textContent.trim()) {
      displayName = heading.textContent.trim().substring(0, 32);
    } else {
      const tag = child.tagName.toLowerCase();
      displayName = tag.charAt(0).toUpperCase() + tag.slice(1);
      
      // Check classes to make it descriptive
      if (child.className) {
        const firstClass = child.className.split(' ').find(c => c !== 'sitecraft-block' && c !== 'sitecraft-selected');
        if (firstClass) displayName += ` (${firstClass})`;
      }
    }
    
    sections.push({
      id: scId,
      name: displayName,
      tagName: child.tagName.toLowerCase()
    });
  });
  
  return sections;
};

// Find top-level block container (direct child of body, or element with class sitecraft-block)
const getTopLevelBlock = (doc, targetId) => {
  const target = doc.querySelector(`[data-sitecraft-id="${targetId}"]`);
  if (!target) return null;
  
  let current = target;
  while (current && current.parentElement && current.parentElement.tagName !== 'BODY') {
    if (current.classList.contains('sitecraft-block')) {
      break;
    }
    current = current.parentElement;
  }
  return current;
};

// Move block up inside body
export const moveBlockUpInHtml = (htmlString, sitecraftId) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const target = getTopLevelBlock(doc, sitecraftId);
  
  if (target && target.previousElementSibling && target.previousElementSibling.tagName !== 'HEAD') {
    const prev = target.previousElementSibling;
    target.parentNode.insertBefore(target, prev);
  }
  return doc.documentElement.outerHTML;
};

// Move block down inside body
export const moveBlockDownInHtml = (htmlString, sitecraftId) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const target = getTopLevelBlock(doc, sitecraftId);
  
  if (target && target.nextElementSibling && target.nextElementSibling.tagName !== 'SCRIPT') {
    const next = target.nextElementSibling;
    target.parentNode.insertBefore(target, next.nextSibling);
  }
  return doc.documentElement.outerHTML;
};

// Insert a block relative to an existing element (before/after its section)
export const insertBlockRelativeInHtml = (htmlString, blockHtml, relativeToId, position = 'after') => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  
  const tempContainer = doc.createElement('div');
  tempContainer.innerHTML = blockHtml;
  
  const target = getTopLevelBlock(doc, relativeToId);
  const childrenToInsert = Array.from(tempContainer.childNodes);
  
  if (target) {
    if (position === 'before') {
      childrenToInsert.forEach(child => {
        target.parentNode.insertBefore(child, target);
      });
    } else {
      const nextSibling = target.nextSibling;
      childrenToInsert.forEach(child => {
        target.parentNode.insertBefore(child, nextSibling);
      });
    }
  } else if (doc.body) {
    childrenToInsert.forEach(child => {
      doc.body.appendChild(child);
    });
  }
  
  return doc.documentElement.outerHTML;
};

// Tag raw HTML elements persistently in state with sitecraft IDs
export const tagRawHtml = (htmlString) => {
  if (!htmlString) return '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  if (!doc.body) return htmlString;
  
  let elementIdCounter = getMaxSitecraftId(doc) + 1;
  const allElements = doc.body.querySelectorAll('*');
  let taggedAny = false;

  allElements.forEach((el) => {
    if (IGNORED_TAGS.has(el.tagName.toUpperCase())) return;
    if (!el.getAttribute('data-sitecraft-id')) {
      el.setAttribute('data-sitecraft-id', `sc-${elementIdCounter++}`);
      taggedAny = true;
    }
  });
  
  return taggedAny ? doc.documentElement.outerHTML : htmlString;
};

// Insert an image element inside a specific target container
export const insertImageIntoElementInHtml = (htmlString, sitecraftId, assetPath) => {
  if (!htmlString || !sitecraftId) return htmlString;
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const targetEl = doc.querySelector(`[data-sitecraft-id="${sitecraftId}"]`);
  
  if (!targetEl) return htmlString;
  
  const imgEl = doc.createElement('img');
  imgEl.setAttribute('src', assetPath);
  imgEl.setAttribute('loading', 'lazy');
  imgEl.setAttribute('decoding', 'async');
  imgEl.setAttribute('style', 'width: 100%; height: 100%; object-fit: cover; border-radius: inherit; display: block;');
  
  // Clear any text or initials and insert the image element
  targetEl.innerHTML = '';
  targetEl.appendChild(imgEl);
  
  return doc.documentElement.outerHTML;
};

// Duplicate an element inside an HTML string
export const duplicateElementInHtml = (htmlString, sitecraftId) => {
  if (!htmlString || !sitecraftId) return htmlString;
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const targetEl = doc.querySelector(`[data-sitecraft-id="${sitecraftId}"]`);
  
  if (!targetEl) return htmlString;
  
  const clone = targetEl.cloneNode(true);
  
  // Remove sitecraft selected class and IDs from the clone and its children
  clone.classList.remove('sitecraft-selected');
  clone.removeAttribute('data-sitecraft-id');
  clone.querySelectorAll('*').forEach((el) => {
    el.removeAttribute('data-sitecraft-id');
    el.classList.remove('sitecraft-selected');
  });
  
  // Insert the clone right after the target element
  targetEl.parentNode.insertBefore(clone, targetEl.nextSibling);
  
  return doc.documentElement.outerHTML;
};

// Retrieve a clean HTML representation of an element without editor metadata
export const getCleanElementHtml = (htmlString, sitecraftId) => {
  if (!htmlString || !sitecraftId) return null;
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const targetEl = doc.querySelector(`[data-sitecraft-id="${sitecraftId}"]`);
  
  if (!targetEl) return null;
  
  const clone = targetEl.cloneNode(true);
  
  // Clean up editor helpers
  clone.classList.remove('sitecraft-selected');
  clone.removeAttribute('data-sitecraft-id');
  clone.querySelectorAll('*').forEach((el) => {
    el.removeAttribute('data-sitecraft-id');
    el.classList.remove('sitecraft-selected');
  });
  
  return clone.outerHTML;
};

// Insert an element/block relative to a specific target element itself (not its top-level section)
export const insertElementRelativeInHtml = (htmlString, blockHtml, targetId, position = 'after') => {
  if (!htmlString || !targetId) return htmlString;
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const targetEl = doc.querySelector(`[data-sitecraft-id="${targetId}"]`);
  
  if (!targetEl) return htmlString;
  
  const tempContainer = doc.createElement('div');
  tempContainer.innerHTML = blockHtml;
  const childrenToInsert = Array.from(tempContainer.childNodes);
  
  if (position === 'before') {
    childrenToInsert.forEach(child => {
      targetEl.parentNode.insertBefore(child, targetEl);
    });
  } else {
    const nextSibling = targetEl.nextSibling;
    childrenToInsert.forEach(child => {
      targetEl.parentNode.insertBefore(child, nextSibling);
    });
  }
  
  return doc.documentElement.outerHTML;
};

// Update image src (and alt) for an element or its child img tag
export const updateImageSourceInHtml = (htmlString, sitecraftId, newSrc, newAlt = null) => {
  if (!htmlString || !sitecraftId) return htmlString;
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  let targetEl = doc.querySelector(`[data-sitecraft-id="${sitecraftId}"]`);
  
  if (!targetEl) return htmlString;

  // If target element is not an img tag, find an img tag inside it or its card container
  if (targetEl.tagName.toLowerCase() !== 'img') {
    const childImg = targetEl.querySelector('img') || targetEl.closest('.editorial-item, .mosaic-item, .sitecraft-gallery-item')?.querySelector('img');
    if (childImg) {
      targetEl = childImg;
    }
  }

  if (targetEl) {
    if (targetEl.tagName.toLowerCase() === 'img') {
      targetEl.setAttribute('src', newSrc);
      if (newAlt !== null) {
        targetEl.setAttribute('alt', newAlt);
      }
    } else {
      targetEl.innerHTML = `<img src="${newSrc}" alt="Image" style="max-width: 100%; border-radius: 8px;" />`;
    }
  }

  return doc.documentElement.outerHTML;
};

