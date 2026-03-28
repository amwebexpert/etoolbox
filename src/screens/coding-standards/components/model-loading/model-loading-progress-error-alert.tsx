import { Alert } from "antd";

interface ModelLoadingProgressErrorAlertProps {
  globalErrorMessage?: string;
}

export const ModelLoadingProgressErrorAlert = ({ globalErrorMessage }: ModelLoadingProgressErrorAlertProps) => (
  <Alert title="Failed to load model" description={globalErrorMessage ?? "Unknown error"} type="error" showIcon />
);
