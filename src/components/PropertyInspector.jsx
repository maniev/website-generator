import React, { useState, useEffect } from 'react';
import { 
  Type, 
  Palette, 
  Trash2, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Layout, 
  Sliders, 
  Copy,
  MousePointer,
  ArrowUp,
  ArrowDown,
  ClipboardPaste,
  CopyPlus,
  Move,
  Unlink
} from 'lucide-react';

export const PropertyInspector = ({ 
  selectedElement, 
  onUpdateElement, 
  onDeleteElement,
  onMoveBlockUp,
  onMoveBlockDown,
  availableAssets = [],
  onTransformToImage,
  onCopyElement,
  onPasteElement,
  onDuplicateElement,
  copiedElementHtml,
  onSelectParent
}) => {
  const [typedUrl, setTypedUrl] = useState('');
  const [linkPadding, setLinkPadding] = useState(true);
  const [linkMargin, setLinkMargin] = useState(true);

  // Sync link states when selected element changes
  useEffect(() => {
    if (selectedElement) {
      const { styles = {} } = selectedElement;
      const pt = styles.paddingTop || '';
      const pr = styles.paddingRight || '';
      const pb = styles.paddingBottom || '';
      const pl = styles.paddingLeft || '';
      
      const mt = styles.marginTop || '';
      const mr = styles.marginRight || '';
      const mb = styles.marginBottom || '';
      const ml = styles.marginLeft || '';

      // If they are all equal (or empty), default to linked. Otherwise individual.
      const padEqual = (pt === pr && pr === pb && pb === pl);
      setLinkPadding(padEqual);

      const marEqual = (mt === mr && mr === mb && mb === ml);
      setLinkMargin(marEqual);
    }
  }, [selectedElement?.id]);

  if (!selectedElement) {
    return (
      <aside className="studio-inspector">
        <div className="inspector-header">
          <span>Inspector</span>
          <Sliders size={16} />
        </div>
        <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-dim)' }}>
          <MousePointer size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
          <p style={{ fontWeight: 600, color: 'var(--text-muted)' }}>No element selected</p>
          <p style={{ fontSize: '0.8rem', marginTop: '6px' }}>
            Click on any text, heading, button, card, or image inside the visual editor to inspect and edit properties.
          </p>
        </div>
      </aside>
    );
  }

  const { id, tagName, textContent, attributes = {}, styles = {} } = selectedElement;

  const handleTextChange = (e) => {
    onUpdateElement(id, { textContent: e.target.value });
  };

  const handleAttrChange = (attrName, value) => {
    onUpdateElement(id, {
      attributes: {
        ...attributes,
        [attrName]: value
      }
    });
  };

  const handleStyleChange = (styleKey, value) => {
    onUpdateElement(id, {
      styles: {
        [styleKey]: value
      }
    });
  };

  const handleMultipleStylesChange = (newStyles) => {
    onUpdateElement(id, {
      styles: newStyles
    });
  };

  const handleAllPaddingChange = (val) => {
    handleMultipleStylesChange({
      paddingTop: val,
      paddingRight: val,
      paddingBottom: val,
      paddingLeft: val,
      padding: val
    });
  };

  const handleAllMarginChange = (val) => {
    handleMultipleStylesChange({
      marginTop: val,
      marginRight: val,
      marginBottom: val,
      marginLeft: val,
      margin: val
    });
  };

  return (
    <aside className="studio-inspector">
      <div className="inspector-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ 
            background: 'var(--primary)', 
            color: '#fff', 
            padding: '2px 8px', 
            borderRadius: '4px', 
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase'
          }}>
            &lt;{tagName}&gt;
          </span>
          <button 
            onClick={onSelectParent} 
            title="Select Parent Container (Esc)"
            style={{
              background: 'transparent',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
              fontSize: '0.7rem',
              padding: '2px 6px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              fontWeight: 600
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
          >
            ↑ Parent
          </button>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{id}</span>
        </div>

        <div style={{ display: 'flex', gap: '4px' }}>
          <button 
            className="icon-btn-sm" 
            onClick={() => onMoveBlockUp(id)}
            title="Move Section Up"
            style={{ background: 'var(--bg-dark)' }}
          >
            <ArrowUp size={13} />
          </button>
          <button 
            className="icon-btn-sm" 
            onClick={() => onMoveBlockDown(id)}
            title="Move Section Down"
            style={{ background: 'var(--bg-dark)' }}
          >
            <ArrowDown size={13} />
          </button>
          <button 
            className="icon-btn-sm" 
            onClick={() => onCopyElement(id)}
            title="Copy Element (Ctrl+C)"
            style={{ background: 'var(--bg-dark)' }}
          >
            <Copy size={13} />
          </button>
          {copiedElementHtml && (
            <button 
              className="icon-btn-sm" 
              onClick={() => onPasteElement(id)}
              title="Paste Element After (Ctrl+V)"
              style={{ background: 'var(--bg-dark)' }}
            >
              <ClipboardPaste size={13} style={{ color: 'var(--accent-emerald)' }} />
            </button>
          )}
          <button 
            className="icon-btn-sm" 
            onClick={() => onDuplicateElement(id)}
            title="Duplicate Element (Ctrl+D)"
            style={{ background: 'var(--bg-dark)' }}
          >
            <CopyPlus size={13} />
          </button>
          <button 
            className="icon-btn-sm" 
            onClick={() => onDeleteElement(id)}
            title="Delete selected element"
            style={{ background: 'var(--bg-dark)' }}
          >
            <Trash2 size={13} style={{ color: '#ef4444' }} />
          </button>
        </div>
      </div>

      {/* Text Content Editor */}
      {!['img', 'input', 'br', 'hr'].includes(tagName) && (
        <div className="inspector-group">
          <div className="inspector-group-title">
            <Type size={12} style={{ display: 'inline', marginRight: '6px' }} /> Text Content
          </div>
          <textarea 
            className="form-control"
            rows={3}
            value={textContent || ''}
            onChange={handleTextChange}
            placeholder="Type element text..."
          />
        </div>
      )}

      {/* Visual Image Conversion Tool */}
      {tagName !== 'img' && !['input', 'br', 'hr'].includes(tagName) && (
        <div className="inspector-group" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
          <div className="inspector-group-title" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-emerald)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <ImageIcon size={12} /> Convert / Add Image
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '12px', marginTop: '6px', lineHeight: '1.4' }}>
            Replace this placeholder's content (e.g. icon/text) with an image.
          </p>
          
          {availableAssets.length > 0 ? (
            <div className="form-group">
              <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Choose Image Asset</label>
              <select 
                className="form-control"
                onChange={(e) => {
                  const assetPath = e.target.value;
                  if (assetPath) {
                    onTransformToImage(id, assetPath);
                    e.target.value = ''; // Reset select
                  }
                }}
                value=""
              >
                <option value="" disabled>-- Select Image --</option>
                {availableAssets.map((asset) => (
                  <option key={asset.path} value={asset.path}>
                    {asset.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '10px', borderRadius: '8px', border: '1px dashed var(--border-color)', fontSize: '0.78rem', color: 'var(--text-dim)', textAlign: 'center' }}>
              Upload pictures in the <strong>Media Assets</strong> tab to select them here.
            </div>
          )}

          <div className="form-group" style={{ marginTop: '12px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Or Paste Image URL</label>
            <div style={{ display: 'flex', gap: '6px' }}>
              <input 
                type="text" 
                className="form-control" 
                placeholder="https://example.com/pic.png" 
                value={typedUrl}
                onChange={(e) => setTypedUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (typedUrl.trim()) {
                      onTransformToImage(id, typedUrl.trim());
                      setTypedUrl('');
                    }
                  }
                }}
              />
              <button 
                className="btn-studio btn-studio-primary" 
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                onClick={() => {
                  if (typedUrl.trim()) {
                    onTransformToImage(id, typedUrl.trim());
                    setTypedUrl('');
                  }
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Source Editor (for <img> elements) */}
      {tagName === 'img' && (
        <div className="inspector-group">
          <div className="inspector-group-title">
            <ImageIcon size={12} style={{ display: 'inline', marginRight: '6px' }} /> Image Settings
          </div>
          
          <div className="form-group">
            <label>Image Source URL (src)</label>
            <input 
              type="text"
              className="form-control"
              value={attributes.src || ''}
              onChange={(e) => handleAttrChange('src', e.target.value)}
              placeholder="e.g. assets/hero.png"
            />
          </div>

          {availableAssets.length > 0 && (
            <div className="form-group">
              <label>Select Project Asset</label>
              <select 
                className="form-control"
                onChange={(e) => handleAttrChange('src', e.target.value)}
                value={attributes.src || ''}
              >
                <option value="">-- Choose Asset --</option>
                {availableAssets.map((asset) => (
                  <option key={asset.path} value={asset.path}>
                    {asset.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label>Alt Description</label>
            <input 
              type="text"
              className="form-control"
              value={attributes.alt || ''}
              onChange={(e) => handleAttrChange('alt', e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Link Href Editor (for <a> elements) */}
      {tagName === 'a' && (
        <div className="inspector-group">
          <div className="inspector-group-title">
            <LinkIcon size={12} style={{ display: 'inline', marginRight: '6px' }} /> Link Destination
          </div>
          <div className="form-group">
            <label>Target Page / URL (href)</label>
            <input 
              type="text"
              className="form-control"
              value={attributes.href || ''}
              onChange={(e) => handleAttrChange('href', e.target.value)}
              placeholder="e.g. index.html or https://..."
            />
          </div>
        </div>
      )}

      {/* Styles & Typography Inspector */}
      <div className="inspector-group">
        <div className="inspector-group-title">
          <Palette size={12} style={{ display: 'inline', marginRight: '6px' }} /> Visual Style & Color
        </div>

        <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <label>Text Color</label>
            <input 
              type="color"
              className="form-control"
              style={{ height: '36px', padding: '2px', cursor: 'pointer' }}
              onChange={(e) => handleStyleChange('color', e.target.value)}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label>Background</label>
            <input 
              type="color"
              className="form-control"
              style={{ height: '36px', padding: '2px', cursor: 'pointer' }}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Font Size</label>
          <input 
            type="text"
            className="form-control"
            value={styles.fontSize || ''}
            onChange={(e) => handleStyleChange('fontSize', e.target.value)}
            placeholder="e.g. 18px or 1.5rem"
          />
        </div>

        <div className="form-group">
          <label>Text Align</label>
          <select 
            className="form-control"
            value={styles.textAlign || 'left'}
            onChange={(e) => handleStyleChange('textAlign', e.target.value)}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>
        </div>
      </div>

      {/* Spacing (Margin & Padding) */}
      <div className="inspector-group">
        <div className="inspector-group-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Move size={12} /> Spacing (Margin & Padding)
        </div>

        {/* Padding Section */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>Padding</span>
            <button
              onClick={() => setLinkPadding(!linkPadding)}
              style={{
                background: 'transparent',
                border: 'none',
                color: linkPadding ? 'var(--primary)' : 'var(--text-dim)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 4px',
                borderRadius: '4px'
              }}
              title={linkPadding ? "Set sides individually" : "Link all sides"}
            >
              {linkPadding ? <LinkIcon size={11} /> : <Unlink size={11} />}
              <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>
                {linkPadding ? 'Linked' : 'Individual'}
              </span>
            </button>
          </div>

          {linkPadding ? (
            <div className="form-group" style={{ marginBottom: 0 }}>
              <input 
                type="text"
                className="form-control"
                value={styles.paddingTop || styles.padding || ''}
                onChange={(e) => handleAllPaddingChange(e.target.value)}
                placeholder="e.g. 16px or 1.5rem"
              />
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              <div>
                <label style={{ fontSize: '0.65rem', display: 'block', textAlign: 'center', color: 'var(--text-dim)', marginBottom: '3px', fontWeight: 600 }}>TOP</label>
                <input 
                  type="text"
                  className="form-control"
                  style={{ padding: '6px 4px', fontSize: '0.78rem', textAlign: 'center' }}
                  value={styles.paddingTop || ''}
                  onChange={(e) => handleStyleChange('paddingTop', e.target.value)}
                  placeholder="0px"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.65rem', display: 'block', textAlign: 'center', color: 'var(--text-dim)', marginBottom: '3px', fontWeight: 600 }}>RIGHT</label>
                <input 
                  type="text"
                  className="form-control"
                  style={{ padding: '6px 4px', fontSize: '0.78rem', textAlign: 'center' }}
                  value={styles.paddingRight || ''}
                  onChange={(e) => handleStyleChange('paddingRight', e.target.value)}
                  placeholder="0px"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.65rem', display: 'block', textAlign: 'center', color: 'var(--text-dim)', marginBottom: '3px', fontWeight: 600 }}>BOTTOM</label>
                <input 
                  type="text"
                  className="form-control"
                  style={{ padding: '6px 4px', fontSize: '0.78rem', textAlign: 'center' }}
                  value={styles.paddingBottom || ''}
                  onChange={(e) => handleStyleChange('paddingBottom', e.target.value)}
                  placeholder="0px"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.65rem', display: 'block', textAlign: 'center', color: 'var(--text-dim)', marginBottom: '3px', fontWeight: 600 }}>LEFT</label>
                <input 
                  type="text"
                  className="form-control"
                  style={{ padding: '6px 4px', fontSize: '0.78rem', textAlign: 'center' }}
                  value={styles.paddingLeft || ''}
                  onChange={(e) => handleStyleChange('paddingLeft', e.target.value)}
                  placeholder="0px"
                />
              </div>
            </div>
          )}
        </div>

        {/* Margin Section */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>Margin</span>
            <button
              onClick={() => setLinkMargin(!linkMargin)}
              style={{
                background: 'transparent',
                border: 'none',
                color: linkMargin ? 'var(--primary)' : 'var(--text-dim)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 4px',
                borderRadius: '4px'
              }}
              title={linkMargin ? "Set sides individually" : "Link all sides"}
            >
              {linkMargin ? <LinkIcon size={11} /> : <Unlink size={11} />}
              <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>
                {linkMargin ? 'Linked' : 'Individual'}
              </span>
            </button>
          </div>

          {linkMargin ? (
            <div className="form-group" style={{ marginBottom: 0 }}>
              <input 
                type="text"
                className="form-control"
                value={styles.marginTop || styles.margin || ''}
                onChange={(e) => handleAllMarginChange(e.target.value)}
                placeholder="e.g. 24px or auto"
              />
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              <div>
                <label style={{ fontSize: '0.65rem', display: 'block', textAlign: 'center', color: 'var(--text-dim)', marginBottom: '3px', fontWeight: 600 }}>TOP</label>
                <input 
                  type="text"
                  className="form-control"
                  style={{ padding: '6px 4px', fontSize: '0.78rem', textAlign: 'center' }}
                  value={styles.marginTop || ''}
                  onChange={(e) => handleStyleChange('marginTop', e.target.value)}
                  placeholder="0px"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.65rem', display: 'block', textAlign: 'center', color: 'var(--text-dim)', marginBottom: '3px', fontWeight: 600 }}>RIGHT</label>
                <input 
                  type="text"
                  className="form-control"
                  style={{ padding: '6px 4px', fontSize: '0.78rem', textAlign: 'center' }}
                  value={styles.marginRight || ''}
                  onChange={(e) => handleStyleChange('marginRight', e.target.value)}
                  placeholder="0px"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.65rem', display: 'block', textAlign: 'center', color: 'var(--text-dim)', marginBottom: '3px', fontWeight: 600 }}>BOTTOM</label>
                <input 
                  type="text"
                  className="form-control"
                  style={{ padding: '6px 4px', fontSize: '0.78rem', textAlign: 'center' }}
                  value={styles.marginBottom || ''}
                  onChange={(e) => handleStyleChange('marginBottom', e.target.value)}
                  placeholder="0px"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.65rem', display: 'block', textAlign: 'center', color: 'var(--text-dim)', marginBottom: '3px', fontWeight: 600 }}>LEFT</label>
                <input 
                  type="text"
                  className="form-control"
                  style={{ padding: '6px 4px', fontSize: '0.78rem', textAlign: 'center' }}
                  value={styles.marginLeft || ''}
                  onChange={(e) => handleStyleChange('marginLeft', e.target.value)}
                  placeholder="0px"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Class & ID attributes */}
      <div className="inspector-group">
        <div className="inspector-group-title">
          <Layout size={12} style={{ display: 'inline', marginRight: '6px' }} /> CSS Classes & Attributes
        </div>
        
        <div className="form-group">
          <label>CSS Class List</label>
          <input 
            type="text"
            className="form-control"
            value={attributes.class || ''}
            onChange={(e) => handleAttrChange('class', e.target.value)}
            placeholder="e.g. btn btn-primary"
          />
        </div>

        <div className="form-group">
          <label>Element ID</label>
          <input 
            type="text"
            className="form-control"
            value={attributes.id || ''}
            onChange={(e) => handleAttrChange('id', e.target.value)}
            placeholder="e.g. main-header"
          />
        </div>
      </div>
    </aside>
  );
};
