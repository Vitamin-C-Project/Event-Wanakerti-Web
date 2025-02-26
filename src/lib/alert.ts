import { API_CODE_CONSTANT } from "@/constants/api_constant";
import Swal from "sweetalert2";

export const alert = (
  title: string,
  message: string,
  icon: string,
  config: any = {}
) => {
  if (!title) {
    throw new Error("Title is required");
  }
  if (!message) {
    throw new Error("Message is required");
  }
  if (!icon) {
    throw new Error("Icon is required");
  }

  return Swal.fire({
    title,
    text: message,
    icon,
    ...config,
  });
};

export const alertRender = (code: number, message: string) => {
  if (code >= 400 && code < 500) {
    alertWarning(message);
    return;
  }

  if (code >= 500) {
    alertError(message);
    return;
  }

  alertSuccess(message);
  return;
};

export const alertSuccess = (message: string) => {
  alert("Success", message, "success");
};

export const alertError = (message: string) => {
  alert("Ooops", message, "error");
};

export const alertWarning = (message: string) => {
  alert("Ooops", message, "warning");
};

export const alertInfo = (message: string) => {
  alert("Info", message, "info");
};

export const toastRender = (code: number, message: string) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  if (code >= 400 && code < 500) {
    Toast.fire({
      icon: "warning",
      title: message,
    });
    return;
  }

  if (code >= 500) {
    Toast.fire({
      icon: "error",
      title: message,
    });
    return;
  }

  Toast.fire({
    icon: "success",
    title: message,
  });
  return;
};
