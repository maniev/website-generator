import React, { useState } from 'react';
import { 
  FileText, 
  Code2, 
  FileCode, 
  Image as ImageIcon, 
  Plus, 
  Copy, 
  Trash2, 
  FolderTree, 
  Box, 
  Images,
  Edit2,
  ArrowUp,
  ArrowDown,
  ListCollapse
} from 'lucide-react';
import { ComponentDrawer } from './ComponentDrawer';
import { AssetManager } from './AssetManager';

export const FileExplorer = ({ 
  files, 
  activeFile, 
  onSelectFile, 
  onAddPage, 
  onDuplicateFile, 
  onDeleteFile,
  onRenameFile,
  pageSections = [],
  onMoveBlockUp,
  onMoveBlockDown,
  onDeleteElement,
  onInsertBlock,
  hasSelectedElement,
  onUploadAsset,
  onInsertImageToHtml,
  activeTab,
  setActiveTab
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [fileToRename, setFileToRename] = useState(null);
  const [renamedName, setRenamedName] = useState('');

  const fileEntries = Object.values(files);
  const htmlFiles = fileEntries.filter(f => f.type === 'html');
  const cssFiles = fileEntries.filter(f => f.type === 'css');
  const jsFiles = fileEntries.filter(f => f.type === 'js');
  const jsonFiles = fileEntries.filter(f => f.type === 'json');

  const handleCreatePage = (e) => {
    e.preventDefault();
    if (!newPageName.trim()) return;
    
    let pageName = newPageName.trim();
    if (!pageName.includes('.')) {
      pageName += '.html';
    }
    
    onAddPage(pageName);
    setNewPageName('');
    setShowAddModal(false);
  };

  const handleOpenRename = (file) => {
    setFileToRename(file);
    setRenamedName(file.name);
    setShowRenameModal(true);
  };

  const handleRenameSubmit = (e) => {
    e.preventDefault();
    if (!renamedName.trim() || !fileToRename) return;
    let finalName = renamedName.trim();
    if (fileToRename.type === 'html' && !finalName.endsWith('.html')) {
      finalName += '.html';
    }
    onRenameFile(fileToRename.path, finalName);
    setShowRenameModal(false);
    setFileToRename(null);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'html': return <FileText size={16} style={{ color: '#e44d26' }} />;
      case 'css': return <Code2 size={16} style={{ color: '#264de4' }} />;
      case 'js': return <FileCode size={16} style={{ color: '#f7df1e' }} />;
      case 'json': return <FileCode size={16} style={{ color: '#a855f7' }} />;
      case 'image': return <ImageIcon size={16} style={{ color: '#10b981' }} />;
      default: return <FileText size={16} style={{ color: '#9ca3af' }} />;
    }
  };

  return (
    <aside className="studio-sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Sidebar Tabs */}
      <div className="sidebar-tabs" style={{ flex: '0 0 auto' }}>
        <button 
          className={`sidebar-tab-btn ${activeTab === 'files' ? 'active' : ''}`}
          onClick={() => setActiveTab('files')}
        >
          <FolderTree size={16} /> Pages & Files
        </button>
        <button 
          className={`sidebar-tab-btn ${activeTab === 'blocks' ? 'active' : ''}`}
          onClick={() => setActiveTab('blocks')}
        >
          <Box size={16} /> Add Blocks
        </button>
        <button 
          className={`sidebar-tab-btn ${activeTab === 'assets' ? 'active' : ''}`}
          onClick={() => setActiveTab('assets')}
        >
          <Images size={16} /> Media Assets
        </button>
      </div>

      {/* Main Tab Content Container (Scrollable) */}
      <div style={{ flex: '1 1 auto', overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column' }}>
        
        {/* Tab 1: Pages & Files List */}
        {activeTab === 'files' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* HTML Pages Section */}
            <div className="sidebar-section-header">
              <span>HTML Pages ({htmlFiles.length})</span>
              <button 
                className="icon-btn-sm" 
                onClick={() => setShowAddModal(true)}
                title="Add New HTML Page"
              >
                <Plus size={14} />
              </button>
            </div>

            {htmlFiles.map((file) => (
              <div 
                key={file.path} 
                className={`file-item ${activeFile === file.path ? 'active' : ''}`}
                onClick={() => onSelectFile(file.path)}
              >
                <div className="file-info">
                  {getFileIcon(file.type)}
                  <span>{file.name}</span>
                </div>
                <div className="file-actions" onClick={(e) => e.stopPropagation()}>
                  <button 
                    className="icon-btn-sm" 
                    onClick={() => handleOpenRename(file)} 
                    title="Rename Page"
                  >
                    <Edit2 size={12} />
                  </button>
                  <button 
                    className="icon-btn-sm" 
                    onClick={() => onDuplicateFile(file.path)} 
                    title="Duplicate Page"
                  >
                    <Copy size={12} />
                  </button>
                  {htmlFiles.length > 1 && (
                    <button 
                      className="icon-btn-sm" 
                      onClick={() => onDeleteFile(file.path)} 
                      title="Delete Page"
                    >
                      <Trash2 size={12} style={{ color: '#ef4444' }} />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Stylesheets Section */}
            {cssFiles.length > 0 && (
              <>
                <div className="sidebar-section-header" style={{ marginTop: '20px' }}>
                  <span>CSS Stylesheets ({cssFiles.length})</span>
                </div>
                {cssFiles.map((file) => (
                  <div 
                    key={file.path} 
                    className={`file-item ${activeFile === file.path ? 'active' : ''}`}
                    onClick={() => onSelectFile(file.path)}
                  >
                    <div className="file-info">
                      {getFileIcon(file.type)}
                      <span>{file.name}</span>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* JS Scripts Section */}
            {jsFiles.length > 0 && (
              <>
                <div className="sidebar-section-header" style={{ marginTop: '20px' }}>
                  <span>JS Scripts ({jsFiles.length})</span>
                </div>
                {jsFiles.map((file) => (
                  <div 
                    key={file.path} 
                    className={`file-item ${activeFile === file.path ? 'active' : ''}`}
                    onClick={() => onSelectFile(file.path)}
                  >
                    <div className="file-info">
                      {getFileIcon(file.type)}
                      <span>{file.name}</span>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* JSON Data Files Section */}
            {jsonFiles.length > 0 && (
              <>
                <div className="sidebar-section-header" style={{ marginTop: '20px' }}>
                  <span>JSON Data Files ({jsonFiles.length})</span>
                </div>
                {jsonFiles.map((file) => (
                  <div 
                    key={file.path} 
                    className={`file-item ${activeFile === file.path ? 'active' : ''}`}
                    onClick={() => onSelectFile(file.path)}
                  >
                    <div className="file-info">
                      {getFileIcon(file.type)}
                      <span>{file.name}</span>
                    </div>
                    <div className="file-actions" onClick={(e) => e.stopPropagation()}>
                      <button 
                        className="icon-btn-sm" 
                        onClick={() => handleOpenRename(file)} 
                        title="Rename JSON File"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button 
                        className="icon-btn-sm" 
                        onClick={() => onDeleteFile(file.path)} 
                        title="Delete JSON File"
                      >
                        <Trash2 size={12} style={{ color: '#ef4444' }} />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* Tab 2: Component Blocks */}
        {activeTab === 'blocks' && (
          <ComponentDrawer 
            onInsertBlock={onInsertBlock} 
            hasSelectedElement={hasSelectedElement} 
          />
        )}

        {/* Tab 3: Media Assets */}
        {activeTab === 'assets' && (
          <AssetManager 
            files={files} 
            onUploadAsset={onUploadAsset} 
            onInsertImageToHtml={onInsertImageToHtml} 
          />
        )}
      </div>

      {/* Bottom Sticky Page Outline / Rearrange Sections */}
      {pageSections.length > 0 && (activeTab === 'files' || activeTab === 'blocks') && (
        <div style={{ 
          borderTop: '1px solid var(--border-color)', 
          background: 'var(--bg-surface)',
          padding: '14px', 
          display: 'flex', 
          flexDirection: 'column', 
          flex: '0 0 auto', 
          maxHeight: '35vh' 
        }}>
          <div className="sidebar-section-header" style={{ marginBottom: '10px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ListCollapse size={14} style={{ color: 'var(--accent-cyan)' }} /> Page Outline / Rearrange
            </span>
          </div>

          <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', paddingRight: '4px' }}>
            {pageSections.map((sec, idx) => (
              <div 
                key={sec.id}
                style={{
                  background: 'var(--bg-dark)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px'
                }}
              >
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '58%' }}>
                  <span style={{ color: '#fff', fontSize: '0.82rem', fontWeight: 500 }}>{sec.name}</span>
                </div>

                {/* Move & Delete Actions */}
                <div style={{ display: 'flex', gap: '3px' }}>
                  <button 
                    className="icon-btn-sm" 
                    onClick={() => onMoveBlockUp(sec.id)} 
                    disabled={idx === 0}
                    title="Move Up"
                    style={{ opacity: idx === 0 ? 0.3 : 1, width: '22px', height: '22px', padding: 0 }}
                  >
                    <ArrowUp size={11} />
                  </button>
                  <button 
                    className="icon-btn-sm" 
                    onClick={() => onMoveBlockDown(sec.id)} 
                    disabled={idx === pageSections.length - 1}
                    title="Move Down"
                    style={{ opacity: idx === pageSections.length - 1 ? 0.3 : 1, width: '22px', height: '22px', padding: 0 }}
                  >
                    <ArrowDown size={11} />
                  </button>
                  <button 
                    className="icon-btn-sm" 
                    onClick={() => onDeleteElement(sec.id)} 
                    title="Delete Section"
                    style={{ width: '22px', height: '22px', padding: 0 }}
                  >
                    <Trash2 size={11} style={{ color: '#ef4444' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New File Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Create New File</h3>
              <button className="icon-btn-sm" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCreatePage}>
              <div className="form-group">
                <label>File Name (e.g. products.json, services.html, about.html)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. products.json"
                  value={newPageName}
                  onChange={(e) => setNewPageName(e.target.value)}
                  autoFocus
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button 
                  type="button" 
                  className="btn-studio" 
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-studio btn-studio-primary"
                >
                  Create Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rename File Modal */}
      {showRenameModal && fileToRename && (
        <div className="modal-overlay" onClick={() => setShowRenameModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Rename File</h3>
              <button className="icon-btn-sm" onClick={() => setShowRenameModal(false)}>✕</button>
            </div>
            <form onSubmit={handleRenameSubmit}>
              <div className="form-group">
                <label>New File Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. new-page-name.html"
                  value={renamedName}
                  onChange={(e) => setRenamedName(e.target.value)}
                  autoFocus
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button 
                  type="button" 
                  className="btn-studio" 
                  onClick={() => setShowRenameModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-studio btn-studio-primary"
                >
                  Rename File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
};
