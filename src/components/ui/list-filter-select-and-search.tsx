import { Col, Select } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import type { ReactNode } from "react";

import { ListFilterSearchInput } from "~/components/ui/list-filter-search-input";
import type { ListFilterColSpan } from "~/styles/list-filter-toolbar.styles";

interface ListFilterSelectAndSearchArgs<T extends string> {
  selectValue: T;
  onSelectChange: (value: T) => void;
  selectOptions: DefaultOptionType[];
  selectPlaceholder: string;
  selectCol: ListFilterColSpan;
  filterValue: string;
  onFilterChange: (value: string) => void;
  filterPlaceholder: string;
  filterCol: ListFilterColSpan;
  selectClassName?: string;
  filterClassName?: string;
  autoFocusSelect?: boolean;
  trailing?: ReactNode;
}

export const ListFilterSelectAndSearch = <T extends string>({
  selectValue,
  onSelectChange,
  selectOptions,
  selectPlaceholder,
  selectCol,
  filterValue,
  onFilterChange,
  filterPlaceholder,
  filterCol,
  selectClassName,
  filterClassName,
  autoFocusSelect = false,
  trailing,
}: ListFilterSelectAndSearchArgs<T>) => {
  return (
    <>
      <Col xs={selectCol.xs} sm={selectCol.sm} md={selectCol.md} lg={selectCol.lg}>
        <Select
          value={selectValue}
          onChange={onSelectChange}
          options={selectOptions}
          className={selectClassName}
          placeholder={selectPlaceholder}
          autoFocus={autoFocusSelect}
        />
      </Col>

      <Col xs={filterCol.xs} sm={filterCol.sm} md={filterCol.md} lg={filterCol.lg}>
        <ListFilterSearchInput
          value={filterValue}
          onValueChange={onFilterChange}
          placeholder={filterPlaceholder}
          className={filterClassName}
        />
      </Col>

      {trailing}
    </>
  );
};
