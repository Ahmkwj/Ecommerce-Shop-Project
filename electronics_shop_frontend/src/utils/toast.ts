import toast from "react-hot-toast";

export const showSuccess = (message: string) => {
  toast.success(message, {
    duration: 3000,
    position: "top-right",
    style: {
      background: "#10b981",
      color: "#fff",
      padding: "16px",
      borderRadius: "8px",
    },
  });
};

export const showError = (message: string) => {
  toast.error(message, {
    duration: 4000,
    position: "top-right",
    style: {
      background: "#ef4444",
      color: "#fff",
      padding: "16px",
      borderRadius: "8px",
    },
  });
};

export const showInfo = (message: string) => {
  toast(message, {
    duration: 3000,
    position: "top-right",
    icon: "ℹ️",
    style: {
      background: "#0284c7",
      color: "#fff",
      padding: "16px",
      borderRadius: "8px",
    },
  });
};

export const showLoading = (message: string) => {
  return toast.loading(message, {
    position: "top-right",
    style: {
      background: "#6b7280",
      color: "#fff",
      padding: "16px",
      borderRadius: "8px",
    },
  });
};

export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId);
};
