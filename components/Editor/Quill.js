// components/Editor.js
import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Quill from 'quill';

const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    }, [onTextChange, onSelectionChange]);

    useEffect(() => {
      ref.current?.enable(!readOnly);
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div')
      );
      const quill = new Quill(editorContainer, {
        theme: 'snow',
      });

      ref.current = quill;

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        ref.current = null;
        container.innerHTML = '';
      };
    }, [ref]);

    return <div ref={containerRef}></div>;
  }
);

Editor.displayName = 'Editor';

Editor.propTypes = {
  readOnly: PropTypes.bool,
  defaultValue: PropTypes.object,
  onTextChange: PropTypes.func,
  onSelectionChange: PropTypes.func,
};

Editor.defaultProps = {
  readOnly: false,
  defaultValue: null,
  onTextChange: null,
  onSelectionChange: null,
};

export default Editor;