// CodeExecutor.js
import React, { useState } from "react";
import axios from "axios";

const CodeExecutor = ({ code, language }) => {
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const executeCode = async () => {
    setOutput("");
    setError("");

    if (language === "python") {
      try {
        const response = await axios.post("/api/execute/python", { code });
        setOutput(response.data.output);
      } catch (err) {
        setError("Error executing Python code.");
      }
    } else if (language === "html" || language === "js") {
      // Create a new window or use an iframe to execute HTML/JS code
      const newWindow = window.open();
      newWindow.document.open();
      newWindow.document.write(code);
      newWindow.document.close();
    } else {
      setError("Unsupported language");
    }
  };

  return (
    <div>
      <button onClick={executeCode} className="btn btn-primary">
        Start
      </button>
      {error && <div className="text-red-500">{error}</div>}
      {output && <pre className="output">{output}</pre>}
    </div>
  );
};

export default CodeExecutor;
