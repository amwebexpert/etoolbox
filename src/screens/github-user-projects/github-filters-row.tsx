import {
  ClearOutlined,
  ForkOutlined,
  InboxOutlined,
  SearchOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Row, Select, Space, Switch, Tooltip } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import {
  DEFAULT_FILTER,
  DEFAULT_LANGUAGE,
  DEFAULT_SHOW_ARCHIVED,
  DEFAULT_SHOW_FORKS,
  SORT_FIELD_OPTIONS,
} from "./github-user-projects.constants";
import { useGithubUserProjectsStore } from "./github-user-projects.store";
import type { GithubUserProject } from "./github-user-projects.types";
import { buildLanguageOptions } from "./github-user-projects.utils";

interface GithubFiltersRowProps {
  projects: GithubUserProject[];
}

export const GithubFiltersRow = ({ projects }: GithubFiltersRowProps) => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();

  const {
    filter,
    language,
    showForks,
    showArchived,
    sortField,
    sortOrder,
    setFilter,
    setLanguage,
    setShowForks,
    setShowArchived,
    setSortField,
    toggleSortOrder,
    resetFilters,
  } = useGithubUserProjectsStore();

  const languageOptions = buildLanguageOptions(projects);

  const hasFilters =
    filter !== DEFAULT_FILTER ||
    language !== DEFAULT_LANGUAGE ||
    showForks !== DEFAULT_SHOW_FORKS ||
    showArchived !== DEFAULT_SHOW_ARCHIVED;

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <Row gutter={[12, 12]} align="middle" className={styles.filtersRow}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Input
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filter by name, description..."
          prefix={<SearchOutlined />}
          allowClear
          className={styles.filterInput}
        />
      </Col>

      <Col xs={12} sm={6} md={4} lg={3}>
        <Select
          value={language}
          onChange={setLanguage}
          options={languageOptions}
          className={styles.select}
          placeholder="Language"
        />
      </Col>

      <Col xs={12} sm={6} md={4} lg={3}>
        <Select value={sortField} onChange={setSortField} options={SORT_FIELD_OPTIONS} className={styles.select} />
      </Col>

      <Col xs={6} sm={4} md={2} lg={2}>
        <Tooltip title={sortOrder === "asc" ? "Ascending" : "Descending"}>
          <Button
            icon={sortOrder === "asc" ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
            onClick={toggleSortOrder}
            className={styles.sortButton}
          />
        </Tooltip>
      </Col>

      {!isMobile && (
        <>
          <Col xs={6} sm={4} md={3} lg={2}>
            <Tooltip title="Show forked repositories">
              <Space size={4} className={styles.switchItem}>
                <Switch size="small" checked={showForks} onChange={setShowForks} />
                <ForkOutlined />
              </Space>
            </Tooltip>
          </Col>

          <Col xs={6} sm={4} md={3} lg={2}>
            <Tooltip title="Show archived repositories">
              <Space size={4} className={styles.switchItem}>
                <Switch size="small" checked={showArchived} onChange={setShowArchived} />
                <InboxOutlined />
              </Space>
            </Tooltip>
          </Col>
        </>
      )}

      {hasFilters && (
        <Col xs={6} sm={4} md={3} lg={2}>
          <Tooltip title="Clear all filters">
            <Button icon={<ClearOutlined />} onClick={resetFilters} size="small">
              {!isMobile && "Clear"}
            </Button>
          </Tooltip>
        </Col>
      )}
    </Row>
  );
};

const useStyles = createStyles(({ token }) => ({
  filtersRow: {
    paddingTop: 8,
    borderTop: `1px solid ${token.colorBorderSecondary}`,
  },
  filterInput: {
    width: "100%",
  },
  select: {
    width: "100%",
  },
  sortButton: {
    width: "100%",
  },
  switchItem: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
}));
