import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface PinStarButtonProps {
  toolName: string;
  toolPath: string;
  pinned: boolean;
  onToggle: (path: string) => void;
  className?: string;
}

export const PinStarButton = ({ toolName, toolPath, pinned, onToggle, className }: PinStarButtonProps) => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    onToggle(toolPath);
  };

  return (
    <Button
      type="text"
      size="small"
      aria-label={`${pinned ? "Unpin" : "Pin"} ${toolName}`}
      icon={pinned ? <StarFilled /> : <StarOutlined />}
      onClick={handleClick}
      className={className}
    />
  );
};
