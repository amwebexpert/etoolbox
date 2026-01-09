import { FileTextOutlined } from "@ant-design/icons";
import { Checkbox, Col, Flex, Form, Input, Row } from "antd";
import { createStyles } from "antd-style";
import { useDeferredValue } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useResponsive } from "~/hooks/use-responsive";

import { RegexTesterExtracted } from "./regex-tester-extracted";
import { RegexTesterMatches } from "./regex-tester-matches";
import { RegexTesterToolbar } from "./regex-tester-toolbar";
import { useRegexTesterStore } from "./regex-tester.store";
import { extractMatches, REGEX_FLAG_OPTIONS, testRegex } from "./regex-tester.utils";

const { TextArea } = Input;

export const RegexTester = () => {
  const { styles } = useStyles();
  const { isDesktop, isMobile } = useResponsive();

  const { pattern, inputText, flags, extractFormat, setPattern, setInputText, toggleFlag, setExtractFormat } =
    useRegexTesterStore();

  // Use deferred values to prevent UI blocking on large inputs
  const deferredPattern = useDeferredValue(pattern);
  const deferredInputText = useDeferredValue(inputText);
  const deferredFlags = useDeferredValue(flags);

  // Compute regex results
  const result = testRegex({
    pattern: deferredPattern,
    inputText: deferredInputText,
    flags: deferredFlags,
  });

  // Extract matches for formatted output
  const matches = extractMatches({
    pattern: deferredPattern,
    inputText: deferredInputText,
    flags: deferredFlags,
  });

  return (
    <ScreenContainer>
      <Flex vertical gap="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<FileTextOutlined />}
          title="Regular Expression Tester"
          description="Test and visualize regex patterns with highlighted matches and extraction"
        />

        <Form layout="vertical" className={styles.form}>
          <Form.Item label="Regular Expression" className={styles.formItem}>
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

          <Form.Item label="Flags" className={styles.formItem}>
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

          <Form.Item label="Test Content" className={styles.formItem}>
            <TextArea
              placeholder="Paste or type the content to test the regular expression against"
              rows={isMobile ? 6 : 8}
              autoSize={{ minRows: isMobile ? 4 : 6, maxRows: isDesktop ? 16 : 10 }}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className={styles.textArea}
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
  fullWidth: {
    width: "100%",
  },
  form: {
    width: "100%",
  },
  formItem: {
    marginBottom: 16,
  },
  patternInput: {
    fontFamily: "monospace",
  },
  textArea: {
    fontFamily: "monospace",
  },
}));
