import React, { useEffect, useRef } from 'react';
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

  // Tag HTML with editor helper script & styles
  const processedHtml = tagHtmlElements(htmlContent, filesMap, activeFilePath);

  // Sync selection outline class inside iframe when selectedElementId changes
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) return;

    // Remove previous selection styling
    iframeDoc.querySelectorAll('.sitecraft-selected').forEach((el) => {
      el.classList.remove('sitecraft-selected');
    });

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

    const handleIframeLoad = () => {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) return;

      // Handle element selection inside iframe
      const handleClick = (e) => {
        // If clicking inside an editable element, allow native browser caret placement
        if (e.target.closest('[contenteditable="true"]')) {
          return;
        }

        // Prevent navigating links while editing
        e.preventDefault();
        e.stopPropagation();

        const target = e.target.closest('[data-sitecraft-id]');
        if (!target) {
          onSelectElement(null);
          return;
        }

        // Remove previous selection styling
        iframeDoc.querySelectorAll('.sitecraft-selected').forEach((el) => {
          el.classList.remove('sitecraft-selected');
        });

        // Add selected class
        target.classList.add('sitecraft-selected');

        const sitecraftId = target.getAttribute('data-sitecraft-id');
        const computedStyle = iframe.contentWindow.getComputedStyle(target);

        // Gather attribute dictionary
        const attrs = {};
        for (let i = 0; i < target.attributes.length; i++) {
          const attr = target.attributes[i];
          if (!attr.name.startsWith('data-sitecraft')) {
            attrs[attr.name] = attr.value;
          }
        }

        onSelectElement({
          id: sitecraftId,
          tagName: target.tagName.toLowerCase(),
          textContent: target.innerText,
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
        const target = e.target.closest('[data-sitecraft-id]');
        if (target && !['IMG', 'INPUT', 'SELECT'].includes(target.tagName)) {
          target.setAttribute('contenteditable', 'true');
          target.focus();

          // Place caret at the end of the text contents
          try {
            const range = iframeDoc.createRange();
            const sel = iframe.contentWindow?.getSelection();
            if (sel) {
              range.selectNodeContents(target);
              range.collapse(false); // Collapse to end
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

        // Get direct children of body, excluding scripts, styles, and the indicator itself
        const children = Array.from(body.children).filter(child => {
          return !['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME'].includes(child.tagName) && 
                 !child.classList.contains('sitecraft-drop-indicator');
        });

        // Find or create the indicator
        let indicator = iframeDoc.getElementById('sitecraft-drop-indicator');
        if (!indicator) {
          indicator = iframeDoc.createElement('div');
          indicator.id = 'sitecraft-drop-indicator';
          indicator.className = 'sitecraft-drop-indicator';
        }

        const mouseY = e.clientY;

        // Find the best insertion spot based on visual layout position
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
        // Remove if we actually leave the body/window bounds
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
      if (selectedElementId) {
        const selectedEl = iframeDoc.querySelector(`[data-sitecraft-id="${selectedElementId}"]`);
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
    };

    // If iframe is already loaded/ready, initialize handlers immediately
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (iframeDoc && (iframeDoc.readyState === 'complete' || iframeDoc.readyState === 'interactive')) {
      handleIframeLoad();
    }

    iframe.addEventListener('load', handleIframeLoad);
    return () => iframe.removeEventListener('load', handleIframeLoad);
  }, [
    processedHtml, 
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
    selectedElementId,
    onSelectParent
  ]);

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
