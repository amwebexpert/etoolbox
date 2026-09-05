import { FileTextOutlined } from "@ant-design/icons";
import { Checkbox, Col, Flex, Form, Input, Row } from "antd";
import { createStyles } from "antd-style";
import { useDeferredValue } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useResponsive } from "~/hooks/use-responsive";
import { useScreenFormStyles } from "~/styles/screen-form.styles";

import { useRegexTesterStore } from "./regex-tester.store";
import { extractMatches, REGEX_FLAG_OPTIONS, testRegex } from "./regex-tester.utils";
import { RegexTesterExtracted } from "./regex-tester-extracted";
import { RegexTesterMatches } from "./regex-tester-matches";
import { RegexTesterToolbar } from "./regex-tester-toolbar";

const { TextArea } = Input;

export const RegexTester = () => {
  const { styles: formStyles } = useScreenFormStyles();
  const { styles } = useStyles();
  const { isDesktop, isMobile } = useResponsive();

  const { pattern, inputText, flags, extractFormat, setPattern, setInputText, toggleFlag, setExtractFormat } =
    useRegexTesterStore();

  // Use deferred values to prevent UI blocking on large inputs habit-hooks-disable non-essential-comment
  const deferredPattern = useDeferredValue(pattern);
  const deferredInputText = useDeferredValue(inputText);
  const deferredFlags = useDeferredValue(flags);

  const result = testRegex({
    pattern: deferredPattern,
    inputText: deferredInputText,
    flags: deferredFlags,
  });

  const matches = extractMatches({
    pattern: deferredPattern,
    inputText: deferredInputText,
    flags: deferredFlags,
  });

  return (
    <ScreenContainer>
      <Flex vertical gap="middle" className={formStyles.fullWidth}>
        <ScreenHeader
          icon={<FileTextOutlined />}
          title="Regular Expression Tester"
          description="Test and visualize regex patterns with highlighted matches and extraction"
        />

        <Form layout="vertical" className={formStyles.form}>
          <Form.Item label="Regular Expression" className={formStyles.formItem}>
            <Input
              placeholder="Type the pattern. Examples: /example/g or just example"
              autoFocus={isDesktop}
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className={styles.patternInput}
              spellCheck={false}
              allowClear
            />
          </Form.Item>

          <Form.Item label="Flags" className={formStyles.formItem}>
            <Row gutter={[16, 8]}>
              {REGEX_FLAG_OPTIONS.map((option) => (
                <Col key={option.value} xs={12} sm={8} md={6} lg={4}>
                  <Checkbox checked={flags.includes(option.value)} onChange={() => toggleFlag(option.value)}>
                    {option.label}
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Form.Item>

          <Form.Item label="Test Content" className={formStyles.formItem}>
            <TextArea
              placeholder="Paste or type the content to test the regular expression against"
              rows={isMobile ? 6 : 8}
              autoSize={{ minRows: isMobile ? 4 : 6, maxRows: isDesktop ? 16 : 10 }}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className={formStyles.textArea}
              spellCheck={false}
            />
          </Form.Item>
        </Form>

        <RegexTesterToolbar />

        <RegexTesterMatches
          highlightedHtml={result.highlightedHtml}
          matchCount={result.matchCount}
          error={result.error}
        />

        <RegexTesterExtracted
          matches={matches}
          uniqueCount={result.uniqueCount}
          extractFormat={extractFormat}
          onFormatChange={setExtractFormat}
        />
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  patternInput: {
    fontFamily: "monospace",
  },
}));
