import { PictureOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { createStyles } from "antd-style";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";

export const Base64Image = () => {
  const { styles } = useStyles();

  return (
    <ScreenContainer>
      <Space orientation="vertical" size="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<PictureOutlined />}
          title="Base64 Image URI"
          description="Encode and decode images to/from Base64 data URIs"
        />
        <div>Coming soon</div>
      </Space>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  fullWidth: {
    width: "100%",
  },
}));
