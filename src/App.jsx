import React, { useState, useEffect, useRef } from 'react';
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
  insertElementRelativeInHtml
} from './utils/htmlParser';

import './styles/studio.css';

export default function App() {
  const [files, setFiles] = useState({});
  const [activeFilePath, setActiveFilePath] = useState('index.html');
  const [viewMode, setViewMode] = useState('visual'); // 'visual' | 'code'
  const [viewportMode, setViewportMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [sidebarTab, setSidebarTab] = useState('files'); // 'files' | 'blocks' | 'assets'
  const [selectedElement, setSelectedElement] = useState(null);
  const [copiedElementHtml, setCopiedElementHtml] = useState(null);

  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const codeTimerRef = useRef(null);

  const saveToHistory = (currentFilesState) => {
    // Save snapshot of current files in state
    setUndoStack(prev => [...prev.slice(-49), currentFilesState]);
    setRedoStack([]); // Clear redo
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const prev = undoStack[undoStack.length - 1];
    setUndoStack(curr => curr.slice(0, -1));
    setRedoStack(curr => [...curr, files]);
    setFiles(prev);
    setSelectedElement(null);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack(curr => curr.slice(0, -1));
    setUndoStack(curr => [...curr, files]);
    setFiles(next);
    setSelectedElement(null);
  };
  
  const handleSelectParentElement = () => {
    if (!selectedElement) return;

    const iframe = document.querySelector('.preview-iframe');
    if (!iframe) return;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) return;

    const currentEl = iframeDoc.querySelector(`[data-sitecraft-id="${selectedElement.id}"]`);
    if (currentEl) {
      const parentEl = currentEl.parentElement?.closest('[data-sitecraft-id]');
      if (parentEl) {
        const sitecraftId = parentEl.getAttribute('data-sitecraft-id');
        const computedStyle = iframe.contentWindow.getComputedStyle(parentEl);

        const attrs = {};
        for (let i = 0; i < parentEl.attributes.length; i++) {
          const attr = parentEl.attributes[i];
          if (!attr.name.startsWith('data-sitecraft')) {
            attrs[attr.name] = attr.value;
          }
        }

        setSelectedElement({
          id: sitecraftId,
          tagName: parentEl.tagName.toLowerCase(),
          textContent: parentEl.innerText,
          attributes: attrs,
          styles: {
            color: computedStyle.color,
            backgroundColor: computedStyle.backgroundColor,
            fontSize: computedStyle.fontSize,
            fontWeight: computedStyle.fontWeight,
            padding: computedStyle.padding,
            paddingTop: computedStyle.paddingTop,
            paddingRight: computedStyle.paddingRight,
            paddingBottom: computedStyle.paddingBottom,
            paddingLeft: computedStyle.paddingLeft,
            margin: computedStyle.margin,
            marginTop: computedStyle.marginTop,
            marginRight: computedStyle.marginRight,
            marginBottom: computedStyle.marginBottom,
            marginLeft: computedStyle.marginLeft,
            borderRadius: computedStyle.borderRadius,
            textAlign: computedStyle.textAlign
          }
        });
      }
    }
  };

  // Keyboard Shortcuts (Ctrl+Z / Ctrl+Y / Ctrl+C / Ctrl+V / Ctrl+D / Delete / Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if focus is in an input or textarea in parent window
      const activeEl = document.activeElement;
      if (activeEl && (
        activeEl.tagName === 'INPUT' || 
        activeEl.tagName === 'TEXTAREA' || 
        activeEl.isContentEditable ||
        activeEl.closest('[contenteditable="true"]')
      )) {
        return;
      }

      const isCtrl = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();

      if (isCtrl && key === 'z') {
        e.preventDefault();
        handleUndo();
      } else if (isCtrl && key === 'y') {
        e.preventDefault();
        handleRedo();
      } else if (isCtrl && key === 'c') {
        if (selectedElement) {
          e.preventDefault();
          handleCopyElement(selectedElement.id);
        }
      } else if (isCtrl && key === 'v') {
        if (copiedElementHtml) {
          e.preventDefault();
          handlePasteElement(selectedElement?.id);
        }
      } else if (isCtrl && key === 'd') {
        if (selectedElement) {
          e.preventDefault();
          handleDuplicateElement(selectedElement.id);
        }
      } else if (key === 'delete' || key === 'backspace') {
        if (selectedElement) {
          e.preventDefault();
          handleDeleteElement(selectedElement.id);
        }
      } else if (key === 'escape') {
        if (selectedElement) {
          e.preventDefault();
          handleSelectParentElement();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [files, undoStack, redoStack, selectedElement, copiedElementHtml]);

  // Persistently tag all HTML files when switching to visual mode
  useEffect(() => {
    if (viewMode === 'visual') {
      setFiles(prev => {
        let changed = false;
        const next = { ...prev };
        Object.keys(next).forEach(path => {
          if (next[path].type === 'html') {
            const tagged = tagRawHtml(next[path].content);
            if (tagged !== next[path].content) {
              next[path] = {
                ...next[path],
                content: tagged,
                updatedAt: Date.now()
              };
              changed = true;
            }
          }
        });
        return changed ? next : prev;
      });
    }
  }, [viewMode]);

  const detachedWindowRef = useRef(null);

  // Initialize with ready-to-use sample template
  useEffect(() => {
    const defaultFiles = getSampleTemplateFiles('saas');
    Object.keys(defaultFiles).forEach((path) => {
      if (defaultFiles[path].type === 'html') {
        defaultFiles[path].content = tagRawHtml(defaultFiles[path].content);
      }
    });
    setFiles(defaultFiles);
  }, []);

  const activeFile = files[activeFilePath] || Object.values(files)[0];
  const pageSections = activeFile && activeFile.type === 'html' ? getPageSections(activeFile.content) : [];

  // Open Detached Live Preview Window
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
  }, [files, activeFilePath, activeFile]);

  // 1. Upload ZIP File
  const handleUploadZip = async (zipFile) => {
    try {
      const extractedFiles = await extractZipFile(zipFile);
      Object.keys(extractedFiles).forEach((path) => {
        if (extractedFiles[path].type === 'html') {
          extractedFiles[path].content = tagRawHtml(extractedFiles[path].content);
        }
      });
      setUndoStack([]);
      setRedoStack([]);
      setFiles(extractedFiles);
      
      // Auto-select first html file or index.html
      const htmlFile = Object.keys(extractedFiles).find(p => p.endsWith('.html')) || Object.keys(extractedFiles)[0];
      if (htmlFile) setActiveFilePath(htmlFile);
      setSelectedElement(null);
    } catch (err) {
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
      // Default to HTML
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

    // Keep inspector synced
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
    setSelectedElement(null); // Deselect element to force canvas reload
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
      updatedHtml = insertBlockRelativeInHtml(activeFile.content, blockHtml, targetId, position);
    } else {
      updatedHtml = insertBlockIntoHtml(activeFile.content, blockHtml);
    }
    
    // Tag newly inserted layout blocks persistently
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

  const assetList = Object.values(files).filter(f => f.type === 'image');

  return (
    <div className="studio-container">
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
            onCopyElement={handleCopyElement}
            onPasteElement={handlePasteElement}
            onDuplicateElement={handleDuplicateElement}
            copiedElementHtml={copiedElementHtml}
            onSelectParent={handleSelectParentElement}
          />
        )}
      </div>
    </div>
  );
}
