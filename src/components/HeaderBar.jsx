import React, { useRef } from 'react';
import { 
  Box, 
  Upload, 
  Download, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Code, 
  Eye, 
  Sparkles,
  ExternalLink,
  Undo,
  Redo
} from 'lucide-react';

export const HeaderBar = ({ 
  onUploadZip, 
  onLoadSample, 
  onExportZip, 
  onOpenDetachedPreview,
  viewportMode, 
  setViewportMode, 
  viewMode, 
  setViewMode,
  activeFileName,
  canUndo,
  canRedo,
  onUndo,
  onRedo
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadZip(file);
      e.target.value = '';
    }
  };

  return (
    <header className="studio-header">
      {/* Brand & Project Info */}
      <div className="brand-section">
        <div className="brand-logo">
          <Box size={24} />
          <span>SiteCraft <span style={{ color: 'var(--primary)' }}>Studio</span></span>
        </div>
        <span className="brand-badge">HTML & App Builder</span>
      </div>

      {/* Center Viewport & View Mode Controls */}
      <div className="header-center-tools">
        {/* Editor Mode: Visual vs Code */}
        <div className="view-mode-toggle">
          <button 
            className={`tool-btn ${viewMode === 'visual' ? 'active' : ''}`}
            onClick={() => setViewMode('visual')}
            title="Visual Canvas Editor"
          >
            <Eye size={16} /> Visual Editor
          </button>
          <button 
            className={`tool-btn ${viewMode === 'code' ? 'active' : ''}`}
            onClick={() => setViewMode('code')}
            title="Raw Code Editor"
          >
            <Code size={16} /> Code Editor
          </button>
        </div>

        {/* Undo / Redo Actions */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-dark)', padding: '3px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <button 
            className="tool-btn" 
            onClick={onUndo} 
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
            style={{ opacity: canUndo ? 1 : 0.4, padding: '6px 8px' }}
          >
            <Undo size={14} />
          </button>
          <button 
            className="tool-btn" 
            onClick={onRedo} 
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
            style={{ opacity: canRedo ? 1 : 0.4, padding: '6px 8px' }}
          >
            <Redo size={14} />
          </button>
        </div>

        {/* Viewport Dimensions (Only active in visual mode) */}
        {viewMode === 'visual' && (
          <div className="viewport-toggle">
            <button 
              className={`tool-btn ${viewportMode === 'desktop' ? 'active' : ''}`}
              onClick={() => setViewportMode('desktop')}
              title="Desktop View (100%)"
            >
              <Monitor size={16} />
            </button>
            <button 
              className={`tool-btn ${viewportMode === 'tablet' ? 'active' : ''}`}
              onClick={() => setViewportMode('tablet')}
              title="Tablet View (768px)"
            >
              <Tablet size={16} />
            </button>
            <button 
              className={`tool-btn ${viewportMode === 'mobile' ? 'active' : ''}`}
              onClick={() => setViewportMode('mobile')}
              title="Mobile View (375px)"
            >
              <Smartphone size={16} />
            </button>
          </div>
        )}

        {/* Detached Viewport Button */}
        <button 
          className="tool-btn"
          onClick={onOpenDetachedPreview}
          title="Open Live Preview in a Detached Window / New Tab"
          style={{ border: '1px solid var(--border-color)', background: 'var(--bg-dark)' }}
        >
          <ExternalLink size={16} style={{ color: 'var(--accent-cyan)' }} /> Detached View
        </button>
      </div>

      {/* Right Header Actions */}
      <div className="header-actions">
        <input 
          type="file" 
          ref={fileInputRef} 
          accept=".zip" 
          onChange={handleFileChange} 
          style={{ display: 'none' }} 
        />
        
        <button 
          className="btn-studio" 
          onClick={() => fileInputRef.current?.click()}
          title="Upload an HTML Template ZIP file"
        >
          <Upload size={16} /> Upload ZIP Template
        </button>

        <button 
          className="btn-studio" 
          onClick={onLoadSample}
          title="Load built-in SaaS template"
        >
          <Sparkles size={16} style={{ color: '#f59e0b' }} /> Load Sample Template
        </button>

        {/* Prominent Export / Download Button */}
        <button 
          className="btn-studio btn-studio-primary" 
          onClick={onExportZip}
          title="Export and Download complete site ZIP"
        >
          <Download size={16} /> Export / Download Site (.zip)
        </button>
      </div>
    </header>
  );
};
