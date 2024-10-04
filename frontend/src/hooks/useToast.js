import React, { useState } from "react";
import Toast from "../components/Toast";

export const useToast = () => {
  const [toast, setToast] = useState(null);

  const success = (message) => {
    setToast({ type: "success", message });
    setTimeout(() => setToast(null), 3000);
  };

  const error = (message) => {
    setToast({ type: "error", message });
    setTimeout(() => setToast(null), 3000);
  };

  const ToastContainer = () => toast && <Toast type={toast.type} message={toast.message} />;

  return {
    toast: {
      success,
      error,
    },
    ToastContainer,
  };
};
