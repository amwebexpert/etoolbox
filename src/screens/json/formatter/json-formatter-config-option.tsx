import { Switch, Tooltip } from "antd";
import { createStyles } from "antd-style";

interface JsonFormatterConfigOptionProps {
  label: string;
  tooltip: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export const JsonFormatterConfigOption = ({ label, tooltip, checked, onChange }: JsonFormatterConfigOptionProps) => {
  const { styles } = useStyles();

  return (
    <Tooltip title={tooltip}>
      <div className={styles.switchRow}>
        <span>{label}</span>
        <Switch checked={checked} onChange={onChange} />
      </div>
    </Tooltip>
  );
};

const useStyles = createStyles(({ token }) => ({
  switchRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: `1px solid ${token.colorBorderSecondary}`,
    "&:last-child": {
      borderBottom: "none",
    },
  },
}));
