import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Box, FileArchive, Sparkles, Upload, Loader2 } from 'lucide-react';
import { HeaderBar } from './components/HeaderBar';
import { FileExplorer } from './components/FileExplorer';
import { VisualCanvas } from './components/VisualCanvas';
import { CodeEditor } from './components/CodeEditor';
import { PropertyInspector } from './components/PropertyInspector';
import { ComponentDrawer } from './components/ComponentDrawer';
import { AssetManager } from './components/AssetManager';

import { extractZipFile, downloadProjectZip } from './utils/zipHandler';
import { getSampleTemplateFiles } from './utils/sampleTemplates';
import { 
  updateElementInHtml, 
  insertBlockIntoHtml, 
  deleteElementFromHtml, 
  getCompiledPageHtml,
  moveBlockUpInHtml,
  moveBlockDownInHtml,
  insertBlockRelativeInHtml,
  getPageSections,
  tagRawHtml,
  insertImageIntoElementInHtml,
  duplicateElementInHtml,
  getCleanElementHtml,
  insertElementRelativeInHtml,
  updateImageSourceInHtml
} from './utils/htmlParser';

import './styles/studio.css';

const InitialUploadScreen = ({ onUploadZip, onLoadSample }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) onUploadZip(file);
    event.target.value = '';
  };

  return (
    <main className="initial-upload-screen">
      <section className="initial-upload-card" aria-labelledby="initial-upload-title">
        <div className="initial-upload-icon"><Box size={30} /></div>
        <p className="initial-upload-eyebrow">Start a new project</p>
        <h1 id="initial-upload-title">Upload your website template</h1>
        <p className="initial-upload-copy">
          Import an HTML template ZIP to start editing its pages, styles, scripts, and media assets.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".zip,application/zip,application/x-zip-compressed"
          onChange={handleFileChange}
          hidden
        />
        <button className="btn-studio btn-studio-primary initial-upload-action" onClick={() => fileInputRef.current?.click()}>
          <Upload size={18} /> Upload ZIP template
        </button>
        <p className="initial-upload-hint"><FileArchive size={15} /> Select a .zip file containing your website files.</p>
        <div className="initial-upload-divider"><span>or</span></div>
        <button className="initial-sample-action" onClick={onLoadSample}>
          <Sparkles size={16} /> Explore with the sample template
        </button>
      </section>
    </main>
  );
};

export default function App() {
  const [files, setFiles] = useState({});
  const [activeFilePath, setActiveFilePath] = useState('index.html');
  const [viewportMode, setViewportMode] = useState('desktop');
  const [viewMode, setViewMode] = useState('visual');
  const [selectedElement, setSelectedElement] = useState(null);
  const [copiedElementHtml, setCopiedElementHtml] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [sidebarTab, setSidebarTab] = useState('pages');
  const [uploadProgress, setUploadProgress] = useState({ isUploading: false, percent: 0, message: '' });

  const detachedWindowRef = useRef(null);
  const codeTimerRef = useRef(null);

  // Initialize with sample template on mount
  useEffect(() => {
    const sampleFiles = getSampleTemplateFiles('saas');
    Object.keys(sampleFiles).forEach((path) => {
      if (sampleFiles[path].type === 'html') {
        sampleFiles[path].content = tagRawHtml(sampleFiles[path].content);
      }
    });
    setFiles(sampleFiles);
    setActiveFilePath('index.html');
  }, []);

  const activeFile = files[activeFilePath];

  // Save history state before mutations
  const saveToHistory = (currentFiles) => {
    setUndoStack(prev => [...prev.slice(-19), currentFiles]);
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    setRedoStack(prev => [...prev, files]);
    setFiles(previous);
    setUndoStack(prev => prev.slice(0, prev.length - 1));
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setUndoStack(prev => [...prev, files]);
    setFiles(next);
    setRedoStack(prev => prev.slice(0, prev.length - 1));
  };

  // Open Detached Preview Window
  const handleOpenDetachedPreview = () => {
    if (!activeFile || activeFile.type !== 'html') {
      alert('Please select an HTML page to view in detached window.');
      return;
    }

    const compiledHtml = getCompiledPageHtml(activeFile, files, activeFilePath);
    const win = window.open('', '_blank', 'width=1280,height=850');
    if (!win) {
      alert('Popup blocked! Please allow popups to open detached preview window.');
      return;
    }
    
    win.document.open();
    win.document.write(compiledHtml);
    win.document.close();
    win.document.title = `Detached View - ${activeFile.name}`;

    detachedWindowRef.current = win;
  };

  // Sync changes live to the Detached Window if open
  useEffect(() => {
    const win = detachedWindowRef.current;
    if (win && !win.closed && activeFile && activeFile.type === 'html') {
      const compiledHtml = getCompiledPageHtml(activeFile, files, activeFilePath);
      win.document.open();
      win.document.write(compiledHtml);
      win.document.close();
      win.document.title = `Detached View - ${activeFile.name}`;
    }
  }, [files, activeFilePath]);

  // 1. Upload ZIP File with Real-time Progress Bar
  const handleUploadZip = async (zipFile) => {
    setUploadProgress({ isUploading: true, percent: 10, message: 'Reading ZIP file...' });
    try {
      const extractedFiles = await extractZipFile(zipFile, (percent, message) => {
        setUploadProgress({ isUploading: true, percent, message });
      });

      Object.keys(extractedFiles).forEach((path) => {
        if (extractedFiles[path].type === 'html') {
          extractedFiles[path].content = tagRawHtml(extractedFiles[path].content);
        }
      });

      setUploadProgress({ isUploading: true, percent: 100, message: 'Template imported successfully!' });
      setTimeout(() => {
        setUploadProgress({ isUploading: false, percent: 0, message: '' });
      }, 400);

      setUndoStack([]);
      setRedoStack([]);
      setFiles(extractedFiles);
      
      const htmlFile = Object.keys(extractedFiles).find(p => p.endsWith('.html')) || Object.keys(extractedFiles)[0];
      if (htmlFile) setActiveFilePath(htmlFile);
      setSelectedElement(null);
    } catch (err) {
      setUploadProgress({ isUploading: false, percent: 0, message: '' });
      alert('Failed to extract ZIP file. Please ensure it is a valid zip archive.');
      console.error(err);
    }
  };

  // 2. Load Built-in Sample Template
  const handleLoadSample = () => {
    const sampleFiles = getSampleTemplateFiles('saas');
    Object.keys(sampleFiles).forEach((path) => {
      if (sampleFiles[path].type === 'html') {
        sampleFiles[path].content = tagRawHtml(sampleFiles[path].content);
      }
    });
    setUndoStack([]);
    setRedoStack([]);
    setFiles(sampleFiles);
    setActiveFilePath('index.html');
    setSelectedElement(null);
  };

  // 3. Export & Download ZIP
  const handleExportZip = async () => {
    if (Object.keys(files).length === 0) {
      alert('No project files to export.');
      return;
    }
    await downloadProjectZip(files, 'published-website');
  };

  // 4. Create New File / Page
  const handleAddPage = (pageName) => {
    saveToHistory(files);
    
    const ext = pageName.split('.').pop().toLowerCase();
    let content = '';
    let type = 'html';
    
    if (ext === 'json') {
      type = 'json';
      content = `[
  { "title": "Interactive Widget A", "description": "This is item A loaded from your local JSON file.", "price": "$10.00", "category": "Starter" },
  { "title": "Interactive Widget B", "description": "This is item B loaded from your local JSON file.", "price": "$20.00", "category": "Pro" }
]`;
    } else if (ext === 'css') {
      type = 'css';
      content = `/* Custom Stylesheet */`;
    } else if (ext === 'js') {
      type = 'js';
      content = `// Custom Script`;
    } else {
      const cleanName = pageName.replace('.html', '');
      const newHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cleanName}</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 40px; color: #0f172a;">
  <header style="text-align: center; margin-bottom: 40px;">
    <h1 style="font-size: 2.5rem;">New Page: ${pageName}</h1>
    <p style="color: #64748b;">Created with SiteCraft Studio</p>
  </header>
  <main style="max-width: 800px; margin: 0 auto; text-align: center;">
    <p>Select components from the left sidebar to start building this page!</p>
  </main>
</body>
</html>`;
      content = tagRawHtml(newHtmlContent);
    }

    setFiles(prev => ({
      ...prev,
      [pageName]: {
        path: pageName,
        name: pageName,
        type: type,
        content: content,
        updatedAt: Date.now()
      }
    }));
    setActiveFilePath(pageName);
  };

  // 5. Duplicate File
  const handleDuplicateFile = (path) => {
    saveToHistory(files);
    const source = files[path];
    if (!source) return;
    
    const parts = path.split('.');
    const ext = parts.pop();
    const newPath = `${parts.join('.')}-copy.${ext}`;
    
    setFiles(prev => ({
      ...prev,
      [newPath]: {
        ...source,
        path: newPath,
        name: newPath.split('/').pop(),
        updatedAt: Date.now()
      }
    }));
    setActiveFilePath(newPath);
  };

  // 5b. Rename File
  const handleRenameFile = (oldPath, newName) => {
    saveToHistory(files);
    if (!files[oldPath] || !newName || oldPath === newName) return;
    
    setFiles(prev => {
      const source = prev[oldPath];
      const next = { ...prev };
      delete next[oldPath];
      
      const newPath = newName;
      next[newPath] = {
        ...source,
        path: newPath,
        name: newName,
        updatedAt: Date.now()
      };
      return next;
    });

    if (activeFilePath === oldPath) {
      setActiveFilePath(newName);
    }
  };

  // 6. Delete File
  const handleDeleteFile = (path) => {
    saveToHistory(files);
    setFiles(prev => {
      const next = { ...prev };
      delete next[path];
      return next;
    });
    
    if (activeFilePath === path) {
      const remaining = Object.keys(files).filter(p => p !== path);
      if (remaining.length > 0) setActiveFilePath(remaining[0]);
    }
  };

  // 7. Direct Code Content Change
  const handleContentChange = (path, newContent, isVisualAction = false) => {
    if (!isVisualAction) {
      if (codeTimerRef.current) {
        clearTimeout(codeTimerRef.current);
      } else {
        saveToHistory(files);
      }
      codeTimerRef.current = setTimeout(() => {
        codeTimerRef.current = null;
      }, 1000);
    }

    setFiles(prev => ({
      ...prev,
      [path]: {
        ...prev[path],
        content: newContent,
        updatedAt: Date.now()
      }
    }));
  };

  // 8. Visual Element Update
  const handleUpdateElement = (elementId, updates) => {
    if (!activeFile || activeFile.type !== 'html') return;
    
    saveToHistory(files);
    const updatedHtml = updateElementInHtml(activeFile.content, elementId, updates);
    handleContentChange(activeFilePath, updatedHtml, true);

    setSelectedElement(prev => prev ? {
      ...prev,
      textContent: updates.textContent !== undefined ? updates.textContent : prev.textContent,
      attributes: updates.attributes ? { ...prev.attributes, ...updates.attributes } : prev.attributes,
      styles: updates.styles ? { ...prev.styles, ...updates.styles } : prev.styles
    } : null);
  };

  // 9. Update Element Text from Inline Edit
  const handleUpdateElementText = (elementId, text) => {
    handleUpdateElement(elementId, { textContent: text });
  };

  // 9b. Transform placeholder or container content to an image
  const handleTransformToImage = (elementId, assetPath) => {
    if (!activeFile || activeFile.type !== 'html') return;
    saveToHistory(files);
    const updatedHtml = insertImageIntoElementInHtml(activeFile.content, elementId, assetPath);
    const taggedHtml = tagRawHtml(updatedHtml);
    handleContentChange(activeFilePath, taggedHtml, true);
    setSelectedElement(null);
  };

  // 9c. Update Image Source or Child Img Source directly
  const handleUpdateImageSource = (elementId, newSrc, newAlt = null) => {
    if (!activeFile || activeFile.type !== 'html') return;
    saveToHistory(files);
    const updatedHtml = updateImageSourceInHtml(activeFile.content, elementId, newSrc, newAlt);
    const taggedHtml = tagRawHtml(updatedHtml);
    handleContentChange(activeFilePath, taggedHtml, true);

    setSelectedElement(prev => prev ? {
      ...prev,
      attributes: {
        ...(prev.attributes || {}),
        src: newSrc,
        ...(newAlt !== null ? { alt: newAlt } : {})
      }
    } : null);
  };

  // 9d. Upload and set image directly from Property Inspector
  const handleUploadAndSetImage = (elementId, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const assetPath = `assets/${cleanName}`;
      
      setFiles(prev => ({
        ...prev,
        [assetPath]: {
          path: assetPath,
          name: cleanName,
          type: 'image',
          blobUrl: dataUrl,
          content: dataUrl.split(',')[1],
          updatedAt: Date.now()
        }
      }));
      
      handleUpdateImageSource(elementId, dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // 10. Delete Element
  const handleDeleteElement = (elementId) => {
    if (!activeFile || activeFile.type !== 'html') return;
    saveToHistory(files);
    const updatedHtml = deleteElementFromHtml(activeFile.content, elementId);
    handleContentChange(activeFilePath, updatedHtml, true);
    setSelectedElement(null);
  };

  // 10b. Copy Element
  const handleCopyElement = (elementId) => {
    if (!activeFile || activeFile.type !== 'html' || !elementId) return;
    const cleanHtml = getCleanElementHtml(activeFile.content, elementId);
    if (cleanHtml) {
      setCopiedElementHtml(cleanHtml);
    }
  };

  // 10c. Paste Element
  const handlePasteElement = (relativeToId = null) => {
    if (!activeFile || activeFile.type !== 'html' || !copiedElementHtml) return;
    
    saveToHistory(files);
    const targetId = relativeToId || selectedElement?.id;
    let updatedHtml;
    if (targetId) {
      updatedHtml = insertElementRelativeInHtml(activeFile.content, copiedElementHtml, targetId, 'after');
    } else {
      updatedHtml = insertBlockIntoHtml(activeFile.content, copiedElementHtml);
    }
    updatedHtml = tagRawHtml(updatedHtml);
    handleContentChange(activeFilePath, updatedHtml, true);
  };

  // 10d. Duplicate Element
  const handleDuplicateElement = (elementId) => {
    if (!activeFile || activeFile.type !== 'html' || !elementId) return;
    
    saveToHistory(files);
    let updatedHtml = duplicateElementInHtml(activeFile.content, elementId);
    updatedHtml = tagRawHtml(updatedHtml);
    handleContentChange(activeFilePath, updatedHtml, true);
  };

  // 11. Insert Component Block
  const handleInsertBlock = (blockHtml, position = 'end', relativeToId = null) => {
    if (!activeFile || activeFile.type !== 'html') return;
    
    saveToHistory(files);
    let updatedHtml;
    const targetId = relativeToId || selectedElement?.id;
    if ((position === 'before' || position === 'after') && targetId) {
      updatedHtml = insertElementRelativeInHtml(activeFile.content, blockHtml, targetId, position);
    } else {
      updatedHtml = insertBlockIntoHtml(activeFile.content, blockHtml);
    }
    
    updatedHtml = tagRawHtml(updatedHtml);
    handleContentChange(activeFilePath, updatedHtml, true);
  };

  // 11b. Move Block Up (Rearrange)
  const handleMoveBlockUp = (elementId) => {
    if (!activeFile || activeFile.type !== 'html' || !elementId) return;
    saveToHistory(files);
    const updatedHtml = moveBlockUpInHtml(activeFile.content, elementId);
    handleContentChange(activeFilePath, updatedHtml, true);
  };

  // 11c. Move Block Down (Rearrange)
  const handleMoveBlockDown = (elementId) => {
    if (!activeFile || activeFile.type !== 'html' || !elementId) return;
    saveToHistory(files);
    const updatedHtml = moveBlockDownInHtml(activeFile.content, elementId);
    handleContentChange(activeFilePath, updatedHtml, true);
  };

  // 11d. Select Parent Element
  const handleSelectParentElement = () => {
    if (!activeFile || !selectedElement?.id) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(activeFile.content, 'text/html');
    const currentEl = doc.querySelector(`[data-sitecraft-id="${selectedElement.id}"]`);
    
    if (currentEl && currentEl.parentElement && currentEl.parentElement.tagName !== 'BODY') {
      const parent = currentEl.parentElement;
      const parentId = parent.getAttribute('data-sitecraft-id');
      if (parentId) {
        const attrs = {};
        for (let i = 0; i < parent.attributes.length; i++) {
          const attr = parent.attributes[i];
          if (!attr.name.startsWith('data-sitecraft')) {
            attrs[attr.name] = attr.value;
          }
        }
        setSelectedElement({
          id: parentId,
          tagName: parent.tagName.toLowerCase(),
          textContent: parent.children.length === 0 ? parent.textContent : '',
          attributes: attrs,
          styles: {}
        });
      }
    }
  };

  // 12. Upload Image Asset
  const handleUploadAsset = (assetPath, name, dataUrl) => {
    saveToHistory(files);
    setFiles(prev => ({
      ...prev,
      [assetPath]: {
        path: assetPath,
        name: name,
        type: 'image',
        blobUrl: dataUrl,
        content: dataUrl.split(',')[1],
        updatedAt: Date.now()
      }
    }));
  };

  // 13. Insert Image Tag into HTML
  const handleInsertImageTag = (assetPath) => {
    const imgHtml = `<div style="text-align: center; margin: 20px 0;"><img src="${assetPath}" alt="Uploaded Asset" style="max-width: 100%; border-radius: 8px;" /></div>`;
    handleInsertBlock(imgHtml);
  };

  const pageSections = useMemo(() => {
    if (!activeFile || activeFile.type !== 'html') return [];
    return getPageSections(activeFile.content);
  }, [activeFile]);

  const assetList = useMemo(() => {
    return Object.values(files).filter(f => f.type === 'image');
  }, [files]);

  return (
    <div className="studio-container">
      {/* Uploading Progress Modal */}
      {uploadProgress.isUploading && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff'
        }}>
          <div style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '16px',
            padding: '32px 40px',
            width: '420px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            textAlign: 'center'
          }}>
            <Loader2 className="animate-spin" size={42} style={{ color: '#6366f1', margin: '0 auto 16px', display: 'block' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 8px', color: '#f8fafc' }}>Extracting Template ZIP</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: '0 0 20px' }}>{uploadProgress.message || 'Processing archive files...'}</p>
            
            <div style={{ width: '100%', height: '8px', background: '#0f172a', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${uploadProgress.percent}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #a855f7)', transition: 'width 0.2s ease-out' }}></div>
            </div>
            <div style={{ marginTop: '8px', fontSize: '0.8rem', color: '#64748b', textAlign: 'right' }}>{uploadProgress.percent}%</div>
          </div>
        </div>
      )}

      <HeaderBar 
        onUploadZip={handleUploadZip}
        onLoadSample={handleLoadSample}
        onExportZip={handleExportZip}
        onOpenDetachedPreview={handleOpenDetachedPreview}
        viewportMode={viewportMode}
        setViewportMode={setViewportMode}
        viewMode={viewMode}
        setViewMode={setViewMode}
        activeFileName={activeFile?.name}
        canUndo={undoStack.length > 0}
        canRedo={redoStack.length > 0}
        onUndo={handleUndo}
        onRedo={handleRedo}
      />

      {Object.keys(files).length === 0 ? (
        <InitialUploadScreen onUploadZip={handleUploadZip} onLoadSample={handleLoadSample} />
      ) : (
        <div className="studio-workspace">
          {/* Unified Left Sidebar */}
          <FileExplorer 
            files={files}
            activeFile={activeFilePath}
            onSelectFile={(path) => {
              setActiveFilePath(path);
              setSelectedElement(null);
            }}
            onAddPage={handleAddPage}
            onDuplicateFile={handleDuplicateFile}
            onDeleteFile={handleDeleteFile}
            onRenameFile={handleRenameFile}
            pageSections={pageSections}
            onMoveBlockUp={handleMoveBlockUp}
            onMoveBlockDown={handleMoveBlockDown}
            onDeleteElement={handleDeleteElement}
            onInsertBlock={handleInsertBlock}
            hasSelectedElement={!!selectedElement}
            onUploadAsset={handleUploadAsset}
            onInsertImageToHtml={handleInsertImageTag}
            activeTab={sidebarTab}
            setActiveTab={setSidebarTab}
          />

          {/* Center Workspace (Visual Canvas or Code Editor) */}
          {viewMode === 'visual' ? (
            activeFile && activeFile.type === 'html' ? (
              <VisualCanvas 
                htmlContent={activeFile.content}
                filesMap={files}
                activeFilePath={activeFilePath}
                viewportMode={viewportMode}
                selectedElementId={selectedElement?.id}
                onSelectElement={setSelectedElement}
                onUpdateElementText={handleUpdateElementText}
                onInsertBlock={handleInsertBlock}
                onCopyElement={handleCopyElement}
                onPasteElement={handlePasteElement}
                onDuplicateElement={handleDuplicateElement}
                onDeleteElement={handleDeleteElement}
                copiedElementHtml={copiedElementHtml}
                onUndo={handleUndo}
                onRedo={handleRedo}
                onSelectParent={handleSelectParentElement}
              />
            ) : (
              <CodeEditor 
                fileObj={activeFile}
                onContentChange={handleContentChange}
              />
            )
          ) : (
            <CodeEditor 
              fileObj={activeFile}
              onContentChange={handleContentChange}
            />
          )}

          {/* Right Property Inspector Panel */}
          {viewMode === 'visual' && activeFile?.type === 'html' && (
            <PropertyInspector 
              selectedElement={selectedElement}
              onUpdateElement={handleUpdateElement}
              onDeleteElement={handleDeleteElement}
              onMoveBlockUp={handleMoveBlockUp}
              onMoveBlockDown={handleMoveBlockDown}
              availableAssets={assetList}
              onTransformToImage={handleTransformToImage}
              onUpdateImageSource={handleUpdateImageSource}
              onUploadAndSetImage={handleUploadAndSetImage}
              onCopyElement={handleCopyElement}
              onPasteElement={handlePasteElement}
              onDuplicateElement={handleDuplicateElement}
              copiedElementHtml={copiedElementHtml}
              onSelectParent={handleSelectParentElement}
            />
          )}
        </div>
      )}
    </div>
  );
}
