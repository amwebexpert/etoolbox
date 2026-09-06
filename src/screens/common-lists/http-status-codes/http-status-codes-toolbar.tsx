import { Row } from "antd";

import { ListFilterSelectAndSearch } from "~/components/ui/list-filter-select-and-search";
import { ListFilterSummaryActions } from "~/components/ui/list-filter-summary-actions";
import { useResponsive } from "~/hooks/use-responsive";
import { useListFilterToolbarStyles } from "~/styles/list-filter-toolbar.styles";

import { HTTP_STATUS_CODES } from "./http-status-codes.constants";
import { useHttpStatusCodesStore } from "./http-status-codes.store";
import { CATEGORY_OPTIONS } from "./http-status-codes.utils";

interface HttpStatusCodesToolbarProps {
  filteredCount: number;
}

export const HttpStatusCodesToolbar = ({ filteredCount }: HttpStatusCodesToolbarProps) => {
  const { styles } = useListFilterToolbarStyles();
  const { isDesktop } = useResponsive();

  const { category, filter, hasFilters, setCategory, setFilter, resetFilters } = useHttpStatusCodesStore();

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
        filterPlaceholder="Search code, name, or description..."
        filterCol={{ xs: 24, sm: 12, md: 8, lg: 7 }}
        selectClassName={styles.select}
        filterClassName={styles.input}
        autoFocusSelect={isDesktop}
        trailing={
          <ListFilterSummaryActions
            filteredCount={filteredCount}
            totalCount={HTTP_STATUS_CODES.length}
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
