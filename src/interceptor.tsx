import { AxiosError, AxiosInstance } from "axios";
import { Slide, ToastOptions, toast } from "react-toastify";
import "./App.css";

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  const toastConfig: ToastOptions = {
    type: "error",
    toastId: error.config?.url,
    position: "bottom-right",
    pauseOnHover: true,
    transition: Slide,
    hideProgressBar: false,
  };
  let toastMessage = (
    <span className="toast-message">
      <span>{error.message}</span>
      <small>{error.config?.url}</small>
    </span>
  );

  if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
    toastMessage = (
      <span className="toast-message">
        <span>
          Your request to the server has timed out. This may be due to a slow
          internet connection. Please try again later.
        </span>
        <small>{error.config?.url}</small>
      </span>
    );
  }

  toast(toastMessage, toastConfig);

  return Promise.reject(error);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use((config) => {
    config.timeout = 5000; // Wait for 5 seconds before timing out
    return config;
  });
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => onRequestError(error)
  );
  return axiosInstance;
}
