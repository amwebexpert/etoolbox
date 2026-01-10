import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Select, Space } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import { useNamedColorsStore } from "./named-colors.store";
import { FAMILY_OPTIONS } from "./named-colors.utils";

export const NamedColorsToolbar = () => {
  const { styles } = useStyles();
  const { isDesktop } = useResponsive();

  const { family, filter, setFamily, setFilter, hasFilters, resetFilters } = useNamedColorsStore();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <Row gutter={[16, 12]} align="middle" className={styles.toolbar}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Select
          value={family}
          onChange={setFamily}
          options={FAMILY_OPTIONS}
          className={styles.select}
          placeholder="Select family"
          autoFocus={isDesktop}
        />
      </Col>

      <Col xs={24} sm={12} md={8} lg={6}>
        <Input
          value={filter}
          onChange={handleFilterChange}
          placeholder="Search by name, RGB, or HEX..."
          prefix={<SearchOutlined />}
          allowClear
          className={styles.input}
        />
      </Col>

      <Col xs={24} sm={24} md={8} lg={12}>
        <Space className={styles.actions}>
          <Button icon={<ClearOutlined />} onClick={resetFilters} disabled={!hasFilters()}>
            Clear filters
          </Button>
        </Space>
      </Col>
    </Row>
  );
};

const useStyles = createStyles(() => ({
  toolbar: {
    marginBottom: 16,
  },
  select: {
    width: "100%",
  },
  input: {
    width: "100%",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
}));
