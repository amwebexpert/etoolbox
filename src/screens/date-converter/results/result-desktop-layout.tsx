import { CodeOutlined, CopyOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Table, Tooltip, Typography } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";

import { useResponsive } from "~/hooks/use-responsive";
import { useSyntaxHighlightTheme } from "~/hooks/use-syntax-highlight-theme";

import type { CopyHandlerArgs } from "../date-converter.constants";
import { CODE_EXAMPLES, DATE_FORMATS } from "../date-converter.utils";
import { useStyles } from "./result-desktop-layout.styles";

interface ResultDesktopLayoutProps {
  date: Date;
  epochValue: number;
  showCodeExamples: boolean;
  onCopy: (args: CopyHandlerArgs) => void;
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
      // eslint-disable-next-line coding-guide/max-params-project -- antd ColumnType.render(value, record, index) signature
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
      // eslint-disable-next-line coding-guide/max-params-project -- antd ColumnType.render(value, record, index) signature
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
      // eslint-disable-next-line coding-guide/max-params-project -- antd ColumnType.render(value, record, index) signature
      render: (_: unknown, record: (typeof tableData)[0]) => (
        <Tooltip title="Copy to clipboard">
          <Button
            type="text"
            size="small"
            icon={<CopyOutlined />}
            onClick={() => {
              const copyValue = record.format.getCode?.(date, epochValue) ?? record.value;
              onCopy({ value: copyValue, label: record.label });
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

      {showCodeExamples ? (
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
                      onClick={() => onCopy({ value: example.getCode(date), label: example.label })}
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
      ) : null}
    </div>
  );
};
