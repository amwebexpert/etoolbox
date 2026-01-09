import { UnlockOutlined } from "@ant-design/icons";
import { isNotBlank } from "@lichens-innovation/ts-common";
import { Flex, Form, Input } from "antd";
import { createStyles } from "antd-style";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useResponsive } from "~/hooks/use-responsive";

import { JwtDecoderResult } from "./jwt-decoder-result";
import { JwtDecoderToolbar } from "./jwt-decoder-toolbar";
import { useJwtDecoderStore } from "./jwt-decoder.store";
import { decodeJwt } from "./jwt-decoder.utils";

const { TextArea } = Input;

export const JwtDecoder = () => {
  const { styles } = useStyles();
  const { isDesktop, isMobile } = useResponsive();

  const { token, setToken, clearToken } = useJwtDecoderStore();

  const decoded = decodeJwt(token);
  const hasToken = isNotBlank(token);

  const handleTokenChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setToken(e.target.value ?? "");
  };

  return (
    <ScreenContainer>
      <Flex vertical gap="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<UnlockOutlined />}
          title="JWT Decoder"
          description="Decode and inspect JSON Web Tokens (JWT). View header, payload, and signature information with expiration status."
        />

        <Form layout="vertical" className={styles.form}>
          <Form.Item
            label="JSON Web Token"
            help={hasToken && !decoded.isValid ? decoded.error : "Paste your JWT token to decode it"}
            validateStatus={hasToken && !decoded.isValid ? "error" : undefined}
            className={styles.formItem}
          >
            <TextArea
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
              autoFocus={isDesktop}
              rows={isMobile ? 4 : 6}
              autoSize={{ minRows: isMobile ? 3 : 4, maxRows: isDesktop ? 12 : 8 }}
              value={token}
              onChange={handleTokenChange}
              className={styles.textArea}
              spellCheck={false}
            />
          </Form.Item>
        </Form>

        <JwtDecoderToolbar hasToken={hasToken} decoded={decoded} onLoadSample={setToken} onClear={clearToken} />

        <JwtDecoderResult decoded={decoded} hasToken={hasToken} />
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  fullWidth: {
    width: "100%",
  },
  form: {
    width: "100%",
  },
  formItem: {
    marginBottom: 16,
  },
  textArea: {
    fontFamily: "monospace",
  },
}));
