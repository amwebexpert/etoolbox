import { BgColorsOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { createStyles } from "antd-style";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";

import { NamedColorsTable } from "./named-colors-table";
import { NamedColorsToolbar } from "./named-colors-toolbar";

export const NamedColors = () => {
  const { styles } = useStyles();

  return (
    <ScreenContainer>
      <Flex vertical gap="small" className={styles.container}>
        <ScreenHeader
          icon={<BgColorsOutlined />}
          title="Named Colors"
          description="Browse and copy HTML/CSS named colors with their RGB and HEX values"
        />

        <NamedColorsToolbar />
        <NamedColorsTable />
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  container: {
    width: "100%",
  },
}));
