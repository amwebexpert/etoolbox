import { Typography } from "antd";
import { createStyles } from "antd-style";

const { Title, Paragraph } = Typography;

export const AboutHero = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.hero}>
      <Title level={2} className={styles.heroTitle}>
        <span>Web</span>
        <img src="logo192.png" alt="Web Toolbox" width={36} height={36} />
        <span>Toolbox</span>
      </Title>
      <Paragraph className={styles.heroSubtitle}>A Swiss Army knife for web developers</Paragraph>
    </div>
  );
};

const useStyles = createStyles(({ token }) => ({
  hero: {
    paddingBlock: 24,
    paddingInline: 0,
    textAlign: "center",
  },
  heroTitle: {
    display: "flex !important",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginBottom: "8px !important",
    color: `${token.colorPrimary} !important`,
  },
  heroSubtitle: {
    color: `${token.colorTextSecondary} !important`,
  },
}));
