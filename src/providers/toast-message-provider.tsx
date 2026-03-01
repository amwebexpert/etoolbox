import { message } from "antd";
import type { ReactNode } from "react";
import { ToastMessageContext } from "./toast-message-context";

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
