import { Typography } from "antd";
import { createStyles } from "antd-style";
import type { ReactNode } from "react";

const { Title, Paragraph } = Typography;

interface ScreenHeaderProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const ScreenHeader = ({ icon, title, description }: ScreenHeaderProps) => {
  const { styles } = useStyles();

  return (
    <>
      <div className={styles.header}>
        <span className={styles.icon}>{icon}</span>
        <Title level={4} className={styles.title}>
          {title}
        </Title>
      </div>

      <Paragraph type="secondary">{description}</Paragraph>
    </>
  );
};

const useStyles = createStyles(({ token }) => ({
  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  icon: {
    fontSize: 24,
    color: token.colorPrimary,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: "1.2em",
  },
  title: {
    margin: "0 !important",
    lineHeight: "1.2 !important",
  },
}));
