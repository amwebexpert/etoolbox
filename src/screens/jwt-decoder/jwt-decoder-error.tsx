import { Alert } from "antd";

interface JwtDecoderErrorProps {
  error?: string;
}

export const JwtDecoderError = ({ error }: JwtDecoderErrorProps) => {
  return (
    <Alert
      title="Invalid JWT Token"
      description={error || "The provided token is not a valid JWT"}
      type="error"
      showIcon
    />
  );
};
