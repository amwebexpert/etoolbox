import type { MessageInstance } from "antd/es/message/interface";
import { useContext } from "react";
import { ToastMessageContext } from "~/providers/toast-message-context";

export const useToastMessage = (): MessageInstance => {
  const context = useContext(ToastMessageContext);
  if (!context) {
    throw new Error("useToastMessage must be used within a ToastMessageProvider");
  }
  return context;
};
