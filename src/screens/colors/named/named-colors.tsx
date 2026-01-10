import { BgColorsOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { createStyles } from "antd-style";
import { useDeferredValue } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";

import { useNamedColorsStore } from "./named-colors.store";
import { NamedColorsTable } from "./named-colors-table";
import { NamedColorsToolbar } from "./named-colors-toolbar";
import { applyFiltering } from "./named-colors.utils";

export const NamedColors = () => {
  const { styles } = useStyles();

  const { family, filter } = useNamedColorsStore();

  const deferredFamily = useDeferredValue(family);
  const deferredFilter = useDeferredValue(filter);

  const filteredColors = applyFiltering({ family: deferredFamily, filter: deferredFilter });

  return (
    <ScreenContainer>
      <Flex vertical gap="small" className={styles.container}>
        <ScreenHeader
          icon={<BgColorsOutlined />}
          title="Named Colors"
          description="Browse and copy HTML/CSS named colors with their RGB and HEX values"
        />

        <NamedColorsToolbar />
        <NamedColorsTable filteredColors={filteredColors} />
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  container: {
    width: "100%",
  },
}));
