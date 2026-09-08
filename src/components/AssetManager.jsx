import React, { useRef } from 'react';
import { Upload, Image as ImageIcon, Copy, Plus } from 'lucide-react';

export const AssetManager = ({ files, onUploadAsset, onInsertImageToHtml }) => {
  const assetInputRef = useRef(null);
  
  const assetFiles = Object.values(files).filter(f => f.type === 'image' || f.type === 'other');

  const handleAssetSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        const assetPath = `images/${file.name}`;
        onUploadAsset(assetPath, file.name, dataUrl);
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    }
  };

  return (
    <div className="sidebar-content">
      <div className="sidebar-section-header">
        <span>Media Assets ({assetFiles.length})</span>
        <button 
          className="icon-btn-sm" 
          onClick={() => assetInputRef.current?.click()}
          title="Upload New Image Asset"
        >
          <Plus size={14} />
        </button>
      </div>

      <input 
        type="file" 
        ref={assetInputRef} 
        accept="image/*" 
        style={{ display: 'none' }} 
        onChange={handleAssetSelect}
      />

      <button 
        className="btn-studio" 
        style={{ width: '100%', justifyContent: 'center', marginBottom: '16px' }}
        onClick={() => assetInputRef.current?.click()}
      >
        <Upload size={14} /> Upload New Image
      </button>

      {assetFiles.length === 0 ? (
        <div style={{ padding: '20px 10px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
          No images uploaded in template yet. Click above to add assets.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {assetFiles.map((asset) => (
            <div 
              key={asset.path}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '8px',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <div style={{ 
                height: '80px', 
                background: '#090d16', 
                borderRadius: '6px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                overflow: 'hidden',
                marginBottom: '6px'
              }}>
                {asset.blobUrl ? (
                  <img src={asset.blobUrl} alt={asset.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                ) : (
                  <ImageIcon size={24} style={{ color: 'var(--text-dim)' }} />
                )}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {asset.name}
              </div>
              <button 
                className="btn-studio" 
                style={{ width: '100%', marginTop: '6px', fontSize: '0.7rem', padding: '4px' }}
                onClick={() => onInsertImageToHtml(asset.path)}
                title="Insert Image tag into HTML"
              >
                Insert Tag
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
