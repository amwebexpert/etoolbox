import { LinkOutlined } from "@ant-design/icons";
import { Card, Input, Space, Table, Typography } from "antd";
import { createStyles } from "antd-style";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useResponsive } from "~/hooks/use-responsive";
import { parseUrl, parseUrlParams } from "../url.utils";
import { useUrlParserStore } from "./url-parser.store";
import { FRAGMENT_COLUMNS, PARAM_COLUMNS } from "./url-parser.utils";

const { Link } = Typography;
const { TextArea } = Input;

export const UrlParser = () => {
  const { styles } = useStyles();
  const { isDesktop, isMobile } = useResponsive();

  const { inputUrl, setInputUrl } = useUrlParserStore();

  const urlFragments = parseUrl(inputUrl);
  const urlParams = parseUrlParams(inputUrl);

  const fragmentsData = [...urlFragments.keys()].sort().map((key) => ({
    key,
    fragment: key,
    value: urlFragments.get(key) ?? "",
  }));

  const paramsData = [...urlParams.keys()].sort().map((key) => ({
    key,
    parameter: key,
    value: urlParams.get(key) ?? "",
  }));

  return (
    <ScreenContainer>
      <Space orientation="vertical" size="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<LinkOutlined />}
          title="URL Parser"
          description="Parse and decompose URLs into their components"
        />

        <TextArea
          placeholder="Paste or type the URL here"
          autoFocus={isDesktop}
          rows={isMobile ? 4 : 6}
          autoSize={{ minRows: 4, maxRows: isDesktop ? 20 : 6 }}
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className={styles.textArea}
        />

        {inputUrl && (
          <Link href={inputUrl} target="_blank" rel="noreferrer">
            Click the link to open the URL in a new tab
          </Link>
        )}

        <Card title="URL Fragments" size={isMobile ? "small" : "default"} className={styles.tableCard}>
          <Table
            columns={FRAGMENT_COLUMNS}
            dataSource={fragmentsData}
            pagination={false}
            size={isMobile ? "small" : "middle"}
            scroll={{ x: true }}
            locale={{ emptyText: "Enter a valid URL to see fragments" }}
          />
        </Card>

        {paramsData.length > 0 && (
          <Card title="Query Parameters" size={isMobile ? "small" : "default"} className={styles.tableCard}>
            <Table
              columns={PARAM_COLUMNS}
              dataSource={paramsData}
              pagination={false}
              size={isMobile ? "small" : "middle"}
              scroll={{ x: true }}
              locale={{ emptyText: "No query parameters found" }}
            />
          </Card>
        )}
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
  tableCard: {
    ".ant-card-body": {
      padding: 0,
      overflow: "hidden",
    },
  },
}));
