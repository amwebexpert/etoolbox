import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { isNotBlank } from "@lichens-innovation/ts-common";
import { Button, Col, Input, Row, Space, Tooltip, Typography } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import { useGithubUserProjectsStore } from "./github-user-projects.store";

const { Text } = Typography;

interface GithubSearchRowProps {
  totalCount: number;
  filteredCount: number;
  isLoading: boolean;
  isFetching: boolean;
  onSearch: () => void;
  onRefresh: () => void;
}

export const GithubSearchRow = ({
  totalCount,
  filteredCount,
  isLoading,
  isFetching,
  onSearch,
  onRefresh,
}: GithubSearchRowProps) => {
  const { styles } = useStyles();
  const { isDesktop, isMobile } = useResponsive();

  const { username, setUsername } = useGithubUserProjectsStore();

  const hasProjects = totalCount > 0;

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isNotBlank(username)) {
      onSearch();
    }
  };

  return (
    <Row gutter={[12, 12]} align="middle">
      <Col xs={24} sm={16} md={12} lg={10}>
        <Input
          value={username}
          onChange={handleUsernameChange}
          onKeyDown={handleKeyPress}
          placeholder="Enter GitHub username..."
          prefix={<SearchOutlined />}
          autoFocus={isDesktop}
          allowClear
          className={styles.usernameInput}
        />
      </Col>

      <Col xs={24} sm={8} md={6} lg={4}>
        <Space size="small" className={styles.searchActions}>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={onSearch}
            loading={isLoading}
            disabled={!isNotBlank(username)}
          >
            {isMobile ? "" : "Search"}
          </Button>

          {hasProjects && (
            <Tooltip title="Refresh data">
              <Button
                icon={<ReloadOutlined spin={isFetching && !isLoading} />}
                onClick={onRefresh}
                disabled={isFetching}
              />
            </Tooltip>
          )}
        </Space>
      </Col>

      {hasProjects && (
        <Col xs={12} sm={8} md={6} lg={4}>
          <Text type="secondary" className={styles.count}>
            {filteredCount} / {totalCount} repos
          </Text>
        </Col>
      )}
    </Row>
  );
};

const useStyles = createStyles(() => ({
  usernameInput: {
    width: "100%",
  },
  searchActions: {
    display: "flex",
  },
  count: {
    fontFamily: "monospace",
    fontSize: 13,
  },
}));
