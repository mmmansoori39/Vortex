// CodeSandbox.js
import React, { useEffect, useRef } from 'react';

const CodeSandbox = ({ code }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    const document = iframe.contentDocument || iframe.contentWindow.document;

    // Clear any existing content in the iframe
    document.open();
    document.write(code);
    document.close();
  }, [code]);

  return (
    <iframe
      ref={iframeRef}
      title="Code Sandbox"
      className="rounded-md min-h-screen"
      style={{ width: '100%',  border: '1px solid #ccc' }}
    />
  );
};

export default CodeSandbox;
