import React, { useState, useEffect } from "react";
import "../assets/css/toastStyles.css";

export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const addToastListener = (event) => {
      setToasts((prev) => [...prev, event.detail]);
      setTimeout(() => {
        setToasts((prev) => prev.slice(1)); 
      }, 3000);
    };

    window.addEventListener("addToast", addToastListener);

    return () => {
      window.removeEventListener("addToast", addToastListener);
    };
  }, []);

  return (
    <div className="toast-container">
      {toasts.map((toast, index) => (
        <div
          key={index}
          className={`toast toast-${toast.type} `}
          role="alert"
        >
          {toast.type === "success" ? "✓" : "✕"} {toast.message}
        </div>
      ))}
    </div>
  );
};

export const toast = {
  success: (message) => {
    const event = new CustomEvent("addToast", { detail: { type: "success", message } });
    window.dispatchEvent(event);
  },
  error: (message) => {
    const event = new CustomEvent("addToast", { detail: { type: "error", message } });
    window.dispatchEvent(event);
  },
};
