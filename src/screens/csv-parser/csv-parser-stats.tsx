import { AlertOutlined, ColumnWidthOutlined, FileTextOutlined, OrderedListOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic, Tag, Tooltip, Typography } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import type { CsvParseResult } from "./csv-parser.types";
import { formatLineBreak, getCsvStats } from "./csv-parser.utils";

interface CsvParserStatsProps {
  result: CsvParseResult | null;
}

export const CsvParserStats = ({ result }: CsvParserStatsProps) => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();

  const stats = getCsvStats(result);

  if (!stats) {
    return null;
  }

  const delimiterDisplay = stats.delimiter === "\t" ? "Tab" : stats.delimiter === " " ? "Space" : stats.delimiter;

  const statisticFontSize = isMobile ? 18 : 24;

  return (
    <div className={styles.container}>
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={6}>
          <Card size="small" className={styles.statCard}>
            <Statistic
              title="Rows"
              value={stats.rowCount}
              prefix={<OrderedListOutlined />}
              styles={{ content: { fontSize: statisticFontSize } }}
            />
          </Card>
        </Col>

        <Col xs={12} sm={6}>
          <Card size="small" className={styles.statCard}>
            <Statistic
              title="Columns"
              value={stats.columnCount}
              prefix={<ColumnWidthOutlined />}
              styles={{ content: { fontSize: statisticFontSize } }}
            />
          </Card>
        </Col>

        <Col xs={12} sm={6}>
          <Card size="small" className={styles.statCard}>
            <Statistic
              title="Delimiter"
              value={delimiterDisplay}
              prefix={<FileTextOutlined />}
              styles={{ content: { fontSize: statisticFontSize } }}
            />
          </Card>
        </Col>

        <Col xs={12} sm={6}>
          <Card size="small" className={styles.statCard}>
            <Statistic
              title="Warnings"
              value={stats.errorCount}
              prefix={<AlertOutlined />}
              styles={{
                content: {
                  fontSize: statisticFontSize,
                  color: stats.errorCount > 0 ? "#faad14" : undefined,
                },
              }}
            />
          </Card>
        </Col>
      </Row>

      {stats.columnNames.length > 0 && (
        <div className={styles.columnsSection}>
          <Typography.Text type="secondary" className={styles.columnLabel}>
            Columns detected:
          </Typography.Text>
          <div className={styles.columnTags}>
            {stats.columnNames.map((col, index) => (
              <Tooltip key={index} title={`Column ${index + 1}`}>
                <Tag className={styles.columnTag}>{col}</Tag>
              </Tooltip>
            ))}
          </div>
        </div>
      )}

      <div className={styles.metaInfo}>
        <Typography.Text type="secondary">Line break: {formatLineBreak(stats.lineBreak)}</Typography.Text>
      </div>
    </div>
  );
};

const useStyles = createStyles(({ token }) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  statCard: {
    height: "100%",
  },
  columnsSection: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  columnLabel: {
    fontWeight: 500,
  },
  columnTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: 4,
  },
  columnTag: {
    margin: 0,
    maxWidth: 150,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  metaInfo: {
    padding: "8px 12px",
    backgroundColor: token.colorBgContainer,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
  },
}));
