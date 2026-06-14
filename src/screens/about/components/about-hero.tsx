import { Typography } from "antd";
import { createStyles } from "antd-style";

import { AppLogo } from "~/components/layout/app-logo";

const { Title, Paragraph } = Typography;

export const AboutHero = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.hero}>
      <Title level={2} className={styles.heroTitle}>
        <span>Web</span>
        <AppLogo className={styles.logo} />
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
  logo: {
    width: 36,
    height: 36,
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
