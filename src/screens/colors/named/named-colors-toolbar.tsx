import { ClearOutlined } from "@ant-design/icons";
import { Button, Col, Row, Select, Space } from "antd";

import { ListFilterSearchInput } from "~/components/ui/list-filter-search-input";
import { useResponsive } from "~/hooks/use-responsive";
import { useListFilterToolbarStyles } from "~/styles/list-filter-toolbar.styles";

import { useNamedColorsStore } from "./named-colors.store";
import { FAMILY_OPTIONS } from "./named-colors.utils";

export const NamedColorsToolbar = () => {
  const { styles } = useListFilterToolbarStyles();
  const { isDesktop } = useResponsive();

  const { family, filter, setFamily, setFilter, hasFilters, resetFilters } = useNamedColorsStore();

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
        <ListFilterSearchInput
          value={filter}
          onValueChange={setFilter}
          placeholder="Search by name, RGB, or HEX..."
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
