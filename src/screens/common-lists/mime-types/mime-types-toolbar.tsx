import { Row } from "antd";

import { ListFilterSelectAndSearch } from "~/components/ui/list-filter-select-and-search";
import { ListFilterSummaryActions } from "~/components/ui/list-filter-summary-actions";
import { useResponsive } from "~/hooks/use-responsive";
import { useListFilterToolbarStyles } from "~/styles/list-filter-toolbar.styles";

import { useMimeTypesStore } from "./mime-types.store";
import { CATEGORY_OPTIONS, MIME_TYPES } from "./mime-types.utils";

interface MimeTypesToolbarProps {
  filteredCount: number;
}

export const MimeTypesToolbar = ({ filteredCount }: MimeTypesToolbarProps) => {
  const { styles } = useListFilterToolbarStyles();
  const { isDesktop } = useResponsive();

  const { category, filter, setCategory, setFilter, hasFilters, resetFilters } = useMimeTypesStore();

  return (
    <Row gutter={[16, 12]} align="middle" className={styles.toolbar}>
      <ListFilterSelectAndSearch
        selectValue={category}
        onSelectChange={setCategory}
        selectOptions={CATEGORY_OPTIONS}
        selectPlaceholder="Select category"
        selectCol={{ xs: 24, sm: 12, md: 6, lg: 5 }}
        filterValue={filter}
        onFilterChange={setFilter}
        filterPlaceholder="Search MIME type or extension..."
        filterCol={{ xs: 24, sm: 12, md: 8, lg: 7 }}
        selectClassName={styles.select}
        filterClassName={styles.input}
        autoFocusSelect={isDesktop}
        trailing={
          <ListFilterSummaryActions
            filteredCount={filteredCount}
            totalCount={MIME_TYPES.length}
            hasFilters={hasFilters()}
            onResetFilters={resetFilters}
            countCol={{ xs: 12, sm: 12, md: 4, lg: 4 }}
            actionsCol={{ xs: 12, sm: 12, md: 6, lg: 8 }}
            countClassName={styles.count}
            actionsClassName={styles.actions}
          />
        }
      />
    </Row>
  );
};
