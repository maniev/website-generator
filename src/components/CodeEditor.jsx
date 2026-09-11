import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';

export const CodeEditor = ({ fileObj, onContentChange }) => {
  const editorRef = useRef(null);
  const recentValuesRef = useRef([]);
  const lastPathRef = useRef(fileObj?.path);

  // Clear recent values and track path changes
  useEffect(() => {
    if (fileObj?.path) {
      if (fileObj.path !== lastPathRef.current) {
        recentValuesRef.current = [];
        lastPathRef.current = fileObj.path;
      }
    }
  }, [fileObj?.path]);

  // Sync content updates from external changes (e.g. Undo/Redo)
  useEffect(() => {
    if (!fileObj) return;

    if (editorRef.current) {
      const editorVal = editorRef.current.getValue();
      if (fileObj.content !== editorVal) {
        const index = recentValuesRef.current.indexOf(fileObj.content);
        if (index !== -1) {
          // This is a local change catching up in React state
          recentValuesRef.current.splice(0, index + 1);
        } else {
          // External change: set editor value and clear history
          editorRef.current.setValue(fileObj.content || '');
          recentValuesRef.current = [];
        }
      }
    }
  }, [fileObj?.content]);

  if (!fileObj) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)' }}>
        No file selected
      </div>
    );
  }

  const getLanguage = (type) => {
    switch (type) {
      case 'html': return 'html';
      case 'css': return 'css';
      case 'js': return 'javascript';
      case 'json': return 'json';
      default: return 'plaintext';
    }
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (val) => {
    const value = val || '';
    recentValuesRef.current.push(value);
    if (recentValuesRef.current.length > 100) {
      recentValuesRef.current.shift();
    }
    onContentChange(fileObj.path, value);
  };

  return (
    <div style={{ flex: 1, width: '100%', height: '100%', overflow: 'hidden' }}>
      <Editor
        key={fileObj.path}
        height="100%"
        language={getLanguage(fileObj.type)}
        defaultValue={fileObj.content || ''}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        loading={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--accent-cyan)', background: '#090d16', fontSize: '0.9rem', fontWeight: 600, gap: '8px' }}>
            <span>Initializing Editor...</span>
          </div>
        }
        theme="vs-dark"
        options={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          automaticLayout: true,
          padding: { top: 16 }
        }}
      />
    </div>
  );
};
