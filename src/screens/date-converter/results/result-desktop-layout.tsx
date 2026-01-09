import { CopyOutlined, CodeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Table, Tooltip, Typography } from "antd";
import { createStyles } from "antd-style";
import SyntaxHighlighter from "react-syntax-highlighter";

import { useResponsive } from "~/hooks/use-responsive";
import { useSyntaxHighlightTheme } from "~/hooks/use-syntax-highlight-theme";

import { CODE_EXAMPLES, DATE_FORMATS } from "../date-converter.utils";

interface ResultDesktopLayoutProps {
  date: Date;
  epochValue: number;
  showCodeExamples: boolean;
  onCopy: (value: string, label: string) => void;
}

export const ResultDesktopLayout = ({ date, epochValue, showCodeExamples, onCopy }: ResultDesktopLayoutProps) => {
  const { styles } = useStyles();
  const { isDesktop } = useResponsive();
  const syntaxTheme = useSyntaxHighlightTheme();

  const tableData = DATE_FORMATS.map((format) => ({
    key: format.id,
    label: format.label,
    description: format.description,
    value: format.getValue(date, epochValue),
    format,
  }));

  const columns = [
    {
      title: "Format",
      dataIndex: "label",
      key: "label",
      width: isDesktop ? 200 : 150,
      render: (label: string, record: (typeof tableData)[0]) => (
        <Tooltip title={record.description}>
          <span className={styles.formatLabel}>{label}</span>
        </Tooltip>
      ),
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value: string, record: (typeof tableData)[0]) => {
        if (record.format.showCode && record.format.getCode) {
          return <code className={styles.codeValue}>{record.format.getCode(date, epochValue)}</code>;
        }
        return <span className={styles.valueText}>{value}</span>;
      },
    },
    {
      title: "",
      key: "action",
      width: 60,
      render: (_: unknown, record: (typeof tableData)[0]) => (
        <Tooltip title="Copy to clipboard">
          <Button
            type="text"
            size="small"
            icon={<CopyOutlined />}
            onClick={() => {
              const copyValue = record.format.getCode?.(date, epochValue) ?? record.value;
              onCopy(copyValue, record.label);
            }}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <div className={styles.resultContainer}>
      <Table
        dataSource={tableData}
        columns={columns}
        pagination={false}
        size={isDesktop ? "middle" : "small"}
        className={styles.table}
      />

      {showCodeExamples && (
        <div className={styles.codeExamplesSection}>
          <Typography.Title level={5} className={styles.codeExamplesTitle}>
            <CodeOutlined /> Code Examples
          </Typography.Title>

          <Row gutter={[16, 16]}>
            {CODE_EXAMPLES.map((example) => (
              <Col xs={24} lg={12} key={example.id}>
                <Card
                  size="small"
                  title={example.label}
                  className={styles.codeCard}
                  extra={
                    <Button
                      type="text"
                      size="small"
                      icon={<CopyOutlined />}
                      onClick={() => onCopy(example.getCode(date), example.label)}
                    />
                  }
                >
                  <SyntaxHighlighter
                    language="javascript"
                    style={syntaxTheme}
                    customStyle={{
                      margin: 0,
                      padding: 12,
                      fontSize: 12,
                      borderRadius: 4,
                    }}
                    wrapLongLines
                  >
                    {example.getCode(date)}
                  </SyntaxHighlighter>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

const useStyles = createStyles(({ token }) => ({
  resultContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  table: {
    "& .ant-table-cell": {
      verticalAlign: "middle",
    },
  },
  formatLabel: {
    fontWeight: 500,
    cursor: "help",
  },
  valueText: {
    fontFamily: "monospace",
    wordBreak: "break-all",
  },
  codeValue: {
    fontFamily: "monospace",
    fontSize: 13,
    backgroundColor: token.colorBgTextHover,
    padding: "2px 6px",
    borderRadius: 4,
    wordBreak: "break-all",
  },
  codeExamplesSection: {
    marginTop: 8,
  },
  codeExamplesTitle: {
    marginBottom: 16,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  codeCard: {
    height: "100%",
  },
}));
