import { message } from "antd";
import type { PropsWithChildren } from "react";

import { ToastMessageContext } from "./toast-message-context";

export const ToastMessageProvider = ({ children }: PropsWithChildren) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <ToastMessageContext.Provider value={messageApi}>
      {contextHolder}
      {children}
    </ToastMessageContext.Provider>
  );
};
