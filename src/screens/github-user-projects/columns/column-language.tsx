import { Typography } from "antd";
import { createStyles } from "antd-style";

const { Text } = Typography;

// Language color mapping (GitHub-inspired)
const LANGUAGE_COLORS: Record<string, string> = {
  javascript: "#f1e05a",
  typescript: "#3178c6",
  python: "#3572A5",
  java: "#b07219",
  go: "#00ADD8",
  rust: "#dea584",
  ruby: "#701516",
  php: "#4F5D95",
  "c++": "#f34b7d",
  c: "#555555",
  "c#": "#178600",
  swift: "#F05138",
  kotlin: "#A97BFF",
  scala: "#c22d40",
  html: "#e34c26",
  css: "#563d7c",
  shell: "#89e051",
  vue: "#41b883",
  dart: "#00B4AB",
};

type ColumnLanguageProps = {
  language: string | null;
};

export const ColumnLanguage = ({ language }: ColumnLanguageProps) => {
  const { styles } = useStyles();

  if (!language) {
    return <Text type="secondary">—</Text>;
  }

  const color = LANGUAGE_COLORS[language.toLowerCase()] ?? "#858585";

  return (
    <>
      <span className={styles.languageDot} style={{ backgroundColor: color }} />
      <Text>{language}</Text>
    </>
  );
};

const useStyles = createStyles(() => ({
  languageDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    display: "inline-block",
  },
}));
