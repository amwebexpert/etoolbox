import { PictureOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { createStyles } from "antd-style";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useResponsive } from "~/hooks/use-responsive";

import { useBase64ImageStore } from "./base64-image.store";

const { TextArea } = Input;

export const Base64Image = () => {
  const { styles } = useStyles();
  const { isDesktop, isMobile } = useResponsive();

  const { inputText, setInputText } = useBase64ImageStore();

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value ?? "");
  };

  return (
    <ScreenContainer>
      <Space orientation="vertical" size="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<PictureOutlined />}
          title="Base64 Image URI"
          description="Encode and decode images to/from Base64 data URIs"
        />

        <TextArea
          placeholder="Paste a Base64 image data URI here"
          autoFocus={isDesktop}
          rows={isMobile ? 4 : 6}
          autoSize={{ minRows: 4, maxRows: isDesktop ? 20 : 6 }}
          value={inputText}
          onChange={handleInputChange}
          className={styles.textArea}
        />
      </Space>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  fullWidth: {
    width: "100%",
  },
  textArea: {
    fontFamily: "monospace",
  },
}));
