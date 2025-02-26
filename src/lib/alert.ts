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

export const alertSuccess = (message: string) => {
  alert("Berhasil", message, "success");
};

export const alertError = (message: string) => {
  alert("Ooops", message, "error");
};

export const alertWarning = (message: string) => {
  alert("Maaf", message, "warning");
};

export const alertInfo = (message: string) => {
  alert("Info", message, "info");
};
