import { message } from "antd";
import type { MessageInstance } from "antd/es/message/interface";
import { createContext, useContext, type ReactNode } from "react";

const ToastMessageContext = createContext<MessageInstance | null>(null);

type ToastMessageProviderProps = {
  children: ReactNode;
};

export const ToastMessageProvider = ({ children }: ToastMessageProviderProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <ToastMessageContext.Provider value={messageApi}>
      {contextHolder}
      {children}
    </ToastMessageContext.Provider>
  );
};

export const useToastMessage = (): MessageInstance => {
  const context = useContext(ToastMessageContext);
  if (!context) {
    throw new Error("useToastMessage must be used within a ToastMessageProvider");
  }
  return context;
};
