import React, { useEffect, useRef, useMemo } from 'react';
import { tagHtmlElements } from '../utils/htmlParser';

export const VisualCanvas = ({ 
  htmlContent, 
  filesMap, 
  activeFilePath,
  viewportMode, 
  selectedElementId, 
  onSelectElement,
  onUpdateElementText,
  onInsertBlock,
  onCopyElement,
  onPasteElement,
  onDuplicateElement,
  onDeleteElement,
  copiedElementHtml,
  onUndo,
  onRedo,
  onSelectParent
}) => {
  const iframeRef = useRef(null);

  // Store latest callbacks in ref to keep event listeners stable and avoid re-attaching on every render
  const callbacksRef = useRef({});
  callbacksRef.current = {
    selectedElementId,
    onSelectElement,
    onUpdateElementText,
    onInsertBlock,
    onCopyElement,
    onPasteElement,
    onDuplicateElement,
    onDeleteElement,
    copiedElementHtml,
    onUndo,
    onRedo,
    onSelectParent
  };

  // Tag HTML with editor helper script & styles (memoized to avoid re-parsing and iframe reload loops)
  const processedHtml = useMemo(() => {
    return tagHtmlElements(htmlContent, filesMap, activeFilePath);
  }, [htmlContent, filesMap, activeFilePath]);

  // Sync selection outline class inside iframe when selectedElementId changes
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) return;

    // Remove previous selection styling using fast HTMLCollection
    const selectedElems = Array.from(iframeDoc.getElementsByClassName('sitecraft-selected'));
    selectedElems.forEach((el) => el.classList.remove('sitecraft-selected'));

    // Add selected class
    if (selectedElementId) {
      const selectedEl = iframeDoc.querySelector(`[data-sitecraft-id="${selectedElementId}"]`);
      if (selectedEl) {
        selectedEl.classList.add('sitecraft-selected');
      }
    }
  }, [selectedElementId, processedHtml]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let cleanupIframeListeners = null;

    const attachListeners = () => {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc || !iframeDoc.body) return;

      // Avoid re-attaching multiple event listeners to the same iframe document instance
      if (iframeDoc._sitecraftListenersAttached) return;
      iframeDoc._sitecraftListenersAttached = true;

      // Handle element selection inside iframe
      const handleClick = (e) => {
        const { onSelectElement, onInsertBlock } = callbacksRef.current;

        // If clicking inside an editable element, allow native browser caret placement
        if (e.target.closest('[contenteditable="true"]')) {
          return;
        }

        // Prevent navigating links while editing
        e.preventDefault();
        e.stopPropagation();

        // If clicking + Add Image Card placeholder in visual editor, insert a new photo card before it
        const addCardTarget = e.target.closest('.sitecraft-add-card, [data-sitecraft-editor-only="true"]');
        if (addCardTarget) {
          const addCardId = addCardTarget.getAttribute('data-sitecraft-id');
          if (addCardId) {
            let newPhotoCardHtml = '';
            if (addCardTarget.closest('.editorial-grid')) {
              newPhotoCardHtml = `
<div class="sitecraft-gallery-item editorial-item">
  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80" alt="NEW EDITORIAL PHOTO" />
  <div class="editorial-content gallery-preview-trigger" data-caption="NEW EDITORIAL PHOTO • Urban Photography">
    <h4 class="editorial-title">NEW EDITORIAL PHOTO</h4>
    <p class="editorial-subtitle">Editorial • Urban</p>
  </div>
</div>`;
            } else if (addCardTarget.closest('.mosaic-columns')) {
              newPhotoCardHtml = `
<div class="sitecraft-gallery-item mosaic-item">
  <div class="mosaic-img-box">
    <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80" alt="New Mosaic Photo" />
    <div class="mosaic-overlay gallery-preview-trigger" data-caption="New Mosaic Photo">
      <span class="mosaic-preview-btn">🔍 Preview Photo</span>
    </div>
  </div>
</div>`;
            } else {
              newPhotoCardHtml = `
<div class="sitecraft-gallery-item" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.02); transition: transform 0.2s;">
  <div class="gallery-img-box" style="width: 100%; height: 240px; position: relative; overflow: hidden; border-radius: 12px; background: #0f172a;">
    <img src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80" alt="New Gallery Photo" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
    <div class="gallery-hover-overlay gallery-preview-trigger" data-caption="New Gallery Photo" style="position: absolute; inset: 0; background: rgba(15, 23, 42, 0.78); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; cursor: pointer;">
      <span class="preview-pill-btn" style="background: #6366f1; color: white; padding: 8px 18px; border-radius: 20px; font-size: 0.82rem; font-weight: 700;">🔍 Preview Full Photo</span>
    </div>
  </div>
  <div style="padding: 12px 4px 4px;">
    <h4 style="font-size: 1rem; font-weight: 700; color: #0f172a; margin: 0;">New Gallery Photo</h4>
  </div>
</div>`;
            }
            onInsertBlock(newPhotoCardHtml, 'before', addCardId);
            return;
          }
        }

        let target = e.target.closest('[data-sitecraft-id]');
        if (!target) {
          onSelectElement(null);
          return;
        }

        // If clicking on an overlay container or preview trigger background (and not text), select the underlying img tag if present
        if (target.classList.contains('editorial-content') || 
            target.classList.contains('mosaic-overlay') || 
            target.classList.contains('gallery-hover-overlay') || 
            target.classList.contains('gallery-preview-trigger')) {
          const isTextClick = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'button', 'a'].includes(e.target.tagName.toLowerCase());
          if (!isTextClick) {
            const cardItem = target.closest('.editorial-item, .mosaic-item, .sitecraft-gallery-item');
            const cardImg = cardItem ? cardItem.querySelector('img[data-sitecraft-id]') : null;
            if (cardImg) {
              target = cardImg;
            }
          } else {
            const textTarget = e.target.closest('[data-sitecraft-id]');
            if (textTarget) target = textTarget;
          }
        }

        // Remove previous selection styling using fast HTMLCollection
        const selectedElems = Array.from(iframeDoc.getElementsByClassName('sitecraft-selected'));
        selectedElems.forEach((el) => el.classList.remove('sitecraft-selected'));

        // Add selected class
        target.classList.add('sitecraft-selected');

        const sitecraftId = target.getAttribute('data-sitecraft-id');
        const computedStyle = iframe.contentWindow ? iframe.contentWindow.getComputedStyle(target) : {};

        // Gather attribute dictionary
        const attrs = {};
        for (let i = 0; i < target.attributes.length; i++) {
          const attr = target.attributes[i];
          if (!attr.name.startsWith('data-sitecraft')) {
            attrs[attr.name] = attr.value;
          }
        }

        // Avoid layout reflow by only extracting textContent for leaf text elements
        const textVal = target.children.length === 0 ? target.innerText : '';

        onSelectElement({
          id: sitecraftId,
          tagName: target.tagName.toLowerCase(),
          textContent: textVal,
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
      };

      // Enable inline double-click editing
      const handleDblClick = (e) => {
        const { onUpdateElementText } = callbacksRef.current;
        const target = e.target.closest('[data-sitecraft-id]');
        if (target && !['IMG', 'INPUT', 'SELECT'].includes(target.tagName)) {
          target.setAttribute('contenteditable', 'true');
          target.focus();

          try {
            const range = iframeDoc.createRange();
            const sel = iframe.contentWindow?.getSelection();
            if (sel) {
              range.selectNodeContents(target);
              range.collapse(false);
              sel.removeAllRanges();
              sel.addRange(range);
            }
          } catch (err) {
            console.error('Failed to set caret position:', err);
          }

          const handleBlur = () => {
            target.removeAttribute('contenteditable');
            const sitecraftId = target.getAttribute('data-sitecraft-id');
            onUpdateElementText(sitecraftId, target.innerText);
            target.removeEventListener('blur', handleBlur);
          };

          target.addEventListener('blur', handleBlur);
        }
      };

      // Handle drag over page sections inside iframe
      const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';

        const body = iframeDoc.body;
        if (!body) return;

        const children = Array.from(body.children).filter(child => {
          return !['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME'].includes(child.tagName) && 
                 !child.classList.contains('sitecraft-drop-indicator');
        });

        let indicator = iframeDoc.getElementById('sitecraft-drop-indicator');
        if (!indicator) {
          indicator = iframeDoc.createElement('div');
          indicator.id = 'sitecraft-drop-indicator';
          indicator.className = 'sitecraft-drop-indicator';
        }

        const mouseY = e.clientY;
        let insertBeforeEl = null;
        let found = false;

        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          const rect = child.getBoundingClientRect();
          
          if (mouseY < rect.bottom) {
            const middle = rect.top + rect.height / 2;
            if (mouseY < middle) {
              insertBeforeEl = child;
            } else {
              insertBeforeEl = children[i + 1] || null;
            }
            found = true;
            break;
          }
        }

        if (!found) {
          const scripts = Array.from(body.children).filter(el => el.tagName === 'SCRIPT');
          insertBeforeEl = scripts.length > 0 ? scripts[0] : null;
        }

        if (insertBeforeEl) {
          body.insertBefore(indicator, insertBeforeEl);
        } else {
          body.appendChild(indicator);
        }
      };

      const handleDragLeave = (e) => {
        const rect = iframeDoc.documentElement.getBoundingClientRect();
        if (
          e.clientX < rect.left || 
          e.clientX >= rect.right || 
          e.clientY < rect.top || 
          e.clientY >= rect.bottom
        ) {
          const indicator = iframeDoc.getElementById('sitecraft-drop-indicator');
          if (indicator) {
            indicator.remove();
          }
        }
      };

      const handleDrop = (e) => {
        e.preventDefault();
        const { onInsertBlock } = callbacksRef.current;

        const blockHtml = e.dataTransfer.getData('text/plain') || 
                           window.parent?.draggedBlockHtml || 
                           window.draggedBlockHtml;
                           
        const indicator = iframeDoc.getElementById('sitecraft-drop-indicator');
        
        if (blockHtml && indicator) {
          let nextEl = indicator.nextElementSibling;
          while (nextEl && ['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME'].includes(nextEl.tagName)) {
            nextEl = nextEl.nextElementSibling;
          }
          
          const nextId = nextEl ? nextEl.getAttribute('data-sitecraft-id') : null;
          
          if (nextId) {
            onInsertBlock(blockHtml, 'before', nextId);
          } else {
            onInsertBlock(blockHtml, 'end');
          }
        }
        
        if (indicator) {
          indicator.remove();
        }
      };

      const handleKeyDown = (e) => {
        const { 
          selectedElementId, 
          copiedElementHtml, 
          onCopyElement, 
          onPasteElement, 
          onDuplicateElement, 
          onDeleteElement, 
          onUndo, 
          onRedo, 
          onSelectParent 
        } = callbacksRef.current;

        const activeEl = iframeDoc.activeElement;
        const isEditable = activeEl && (
          activeEl.hasAttribute('contenteditable') || 
          activeEl.tagName === 'INPUT' || 
          activeEl.tagName === 'TEXTAREA'
        );

        const isCtrl = e.ctrlKey || e.metaKey;
        const key = e.key.toLowerCase();

        if (key === 'escape') {
          if (isEditable) {
            activeEl.blur();
          } else {
            e.preventDefault();
            onSelectParent();
          }
          return;
        }

        if (isEditable) return;

        if (isCtrl && key === 'c') {
          if (selectedElementId) {
            e.preventDefault();
            onCopyElement(selectedElementId);
          }
        } else if (isCtrl && key === 'v') {
          if (copiedElementHtml) {
            e.preventDefault();
            onPasteElement(selectedElementId);
          }
        } else if (isCtrl && key === 'd') {
          if (selectedElementId) {
            e.preventDefault();
            onDuplicateElement(selectedElementId);
          }
        } else if (isCtrl && key === 'z') {
          e.preventDefault();
          onUndo();
        } else if (isCtrl && key === 'y') {
          e.preventDefault();
          onRedo();
        } else if (key === 'delete' || key === 'backspace') {
          if (selectedElementId) {
            e.preventDefault();
            onDeleteElement(selectedElementId);
          }
        }
      };

      // Add selected class to current selected element on load
      if (callbacksRef.current.selectedElementId) {
        const selectedEl = iframeDoc.querySelector(`[data-sitecraft-id="${callbacksRef.current.selectedElementId}"]`);
        if (selectedEl) {
          selectedEl.classList.add('sitecraft-selected');
        }
      }

      iframeDoc.body?.addEventListener('click', handleClick);
      iframeDoc.body?.addEventListener('dblclick', handleDblClick);
      iframeDoc.body?.addEventListener('dragover', handleDragOver);
      iframeDoc.body?.addEventListener('dragleave', handleDragLeave);
      iframeDoc.body?.addEventListener('drop', handleDrop);
      iframeDoc.addEventListener('keydown', handleKeyDown);

      cleanupIframeListeners = () => {
        iframeDoc._sitecraftListenersAttached = false;
        iframeDoc.body?.removeEventListener('click', handleClick);
        iframeDoc.body?.removeEventListener('blur', handleDblClick);
        iframeDoc.body?.removeEventListener('dragover', handleDragOver);
        iframeDoc.body?.removeEventListener('dragleave', handleDragLeave);
        iframeDoc.body?.removeEventListener('drop', handleDrop);
        iframeDoc.removeEventListener('keydown', handleKeyDown);
      };
    };

    const handleLoad = () => {
      attachListeners();
    };

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (iframeDoc && (iframeDoc.readyState === 'complete' || iframeDoc.readyState === 'interactive')) {
      attachListeners();
    }

    iframe.addEventListener('load', handleLoad);
    return () => {
      iframe.removeEventListener('load', handleLoad);
      if (cleanupIframeListeners) cleanupIframeListeners();
    };
  }, [processedHtml]);

  return (
    <div className="studio-canvas-container">
      <div className={`canvas-viewport-wrapper viewport-${viewportMode}`}>
        <iframe 
          ref={iframeRef} 
          srcDoc={processedHtml} 
          className="preview-iframe"
          title="Visual Web Editor Canvas"
        />
      </div>
    </div>
  );
};

