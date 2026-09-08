import React, { useState } from 'react';
import { COMPONENT_BLOCKS } from '../utils/componentLibrary';
import { 
  Plus, 
  LayoutTemplate, 
  Grid, 
  DollarSign, 
  Zap, 
  Mail, 
  PanelBottom,
  Menu,
  TrendingUp,
  Layers,
  Users,
  HelpCircle,
  Eye,
  X
} from 'lucide-react';

export const ComponentDrawer = ({ 
  onInsertBlock, 
  hasSelectedElement
}) => {
  const [previewBlock, setPreviewBlock] = useState(null);
  const [insertPos, setInsertPos] = useState('end'); // 'end' | 'before' | 'after'

  const getBlockIcon = (iconName) => {
    switch (iconName) {
      case 'LayoutTemplate': return <LayoutTemplate size={20} style={{ color: '#6366f1' }} />;
      case 'Grid': return <Grid size={20} style={{ color: '#06b6d4' }} />;
      case 'DollarSign': return <DollarSign size={20} style={{ color: '#10b981' }} />;
      case 'Zap': return <Zap size={20} style={{ color: '#f59e0b' }} />;
      case 'Mail': return <Mail size={20} style={{ color: '#ec4899' }} />;
      case 'PanelBottom': return <PanelBottom size={20} style={{ color: '#8b5cf6' }} />;
      case 'Menu': return <Menu size={20} style={{ color: '#ec4899' }} />;
      case 'TrendingUp': return <TrendingUp size={20} style={{ color: '#a855f7' }} />;
      case 'Layers': return <Layers size={20} style={{ color: '#06b6d4' }} />;
      case 'Users': return <Users size={20} style={{ color: '#fbbf24' }} />;
      case 'HelpCircle': return <HelpCircle size={20} style={{ color: '#10b981' }} />;
      default: return <LayoutTemplate size={20} />;
    }
  };

  // Group blocks by their category metadata
  const groupedBlocks = COMPONENT_BLOCKS.reduce((acc, block) => {
    if (!acc[block.category]) {
      acc[block.category] = [];
    }
    acc[block.category].push(block);
    return acc;
  }, {});

  return (
    <div className="sidebar-content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top Section: Component Blocks Title */}
      <div>
        <div className="sidebar-section-header">
          <span>Component Blocks</span>
        </div>

        <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '16px' }}>
          Browse by category. <strong>Drag & drop blocks</strong> onto the canvas, click the eye icon to preview, or insert directly.
        </p>

        {/* Insertion Location Control */}
        {hasSelectedElement && (
          <div style={{ 
            background: 'rgba(99, 102, 241, 0.08)', 
            border: '1px solid rgba(99, 102, 241, 0.2)', 
            borderRadius: '8px', 
            padding: '10px', 
            marginBottom: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>INSERTION POSITION</label>
            <select 
              className="form-control" 
              value={insertPos} 
              onChange={(e) => setInsertPos(e.target.value)}
              style={{ fontSize: '0.8rem', padding: '4px 8px' }}
            >
              <option value="end">At bottom of page (Default)</option>
              <option value="before">Before selected element section</option>
              <option value="after">After selected element section</option>
            </select>
          </div>
        )}
      </div>

      {/* Middle Section: Categorized Grouped Blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {Object.entries(groupedBlocks).map(([category, blocks]) => (
          <div key={category} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Category Section Header */}
            <div style={{ 
              fontSize: '0.72rem', 
              fontWeight: 800, 
              color: 'var(--accent-cyan)', 
              letterSpacing: '0.08em', 
              textTransform: 'uppercase', 
              borderBottom: '1px dashed rgba(255, 255, 255, 0.15)', 
              paddingBottom: '4px', 
              marginTop: '6px' 
            }}>
              {category}
            </div>

            {/* Block items in category */}
            {blocks.map((block) => (
              <div 
                key={block.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', block.html);
                  e.dataTransfer.effectAllowed = 'copy';
                  if (window.parent) {
                    window.parent.draggedBlockHtml = block.html;
                  }
                  window.draggedBlockHtml = block.html;
                  e.currentTarget.style.opacity = '0.5';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onDragEnd={(e) => {
                  if (window.parent) {
                    window.parent.draggedBlockHtml = null;
                  }
                  window.draggedBlockHtml = null;
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.boxShadow = '0 0 10px rgba(99, 102, 241, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  transition: 'all 0.15s ease',
                  cursor: 'grab'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '85%' }}>
                    {getBlockIcon(block.icon)}
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <h4 style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>{block.name}</h4>
                    </div>
                  </div>
                  
                  <button 
                    className="icon-btn-sm" 
                    onClick={() => setPreviewBlock(block)}
                    title="Preview Layout"
                    style={{ background: 'var(--bg-dark)' }}
                  >
                    <Eye size={13} style={{ color: 'var(--accent-cyan)' }} />
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    className="btn-studio btn-studio-primary" 
                    style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem', padding: '6px' }}
                    onClick={() => onInsertBlock(block.html, insertPos)}
                  >
                    <Plus size={12} /> Insert Block
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Block Preview Modal */}
      {previewBlock && (
        <div className="modal-overlay" onClick={() => setPreviewBlock(null)}>
          <div 
            className="modal-card" 
            style={{ maxWidth: '850px', width: '90%', display: 'flex', flexDirection: 'column', maxHeight: '85vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header" style={{ paddingBottom: '14px', borderBottom: '1px solid var(--border-color)' }}>
              <div>
                <h3 className="modal-title" style={{ fontSize: '1.15rem' }}>{previewBlock.name}</h3>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>Category: {previewBlock.category}</span>
              </div>
              <button className="icon-btn-sm" onClick={() => setPreviewBlock(null)}>
                <X size={16} />
              </button>
            </div>

            {/* Clean Canvas Rendering */}
            <div style={{ 
              flex: 1, 
              overflowY: 'auto', 
              padding: '24px', 
              background: '#f8fafc', 
              borderRadius: '8px', 
              margin: '20px 0',
              border: '1px solid var(--border-color)',
              minHeight: '260px'
            }}>
              <div dangerouslySetInnerHTML={{ __html: previewBlock.html }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn-studio" onClick={() => setPreviewBlock(null)}>
                Close Preview
              </button>
              <button 
                className="btn-studio btn-studio-primary"
                onClick={() => {
                  onInsertBlock(previewBlock.html, insertPos);
                  setPreviewBlock(null);
                }}
              >
                <Plus size={16} /> Insert Into Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
