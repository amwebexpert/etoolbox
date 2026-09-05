interface PaginatedFilterDefaults<TCategory> {
  category: TCategory;
  filter: string;
  page: number;
  pageSize: number;
}

interface HandlePageChangeArgs {
  page: number;
  pageSize: number;
}

interface PaginatedFilterState<TCategory> {
  category: TCategory;
  filter: string;
  page: number;
  pageSize: number;
  hasFilters: () => boolean;
  setCategory: (category: TCategory) => void;
  setFilter: (filter: string) => void;
  handlePageChange: ({ page, pageSize }: HandlePageChangeArgs) => void;
  resetFilters: () => void;
}

type PaginatedFilterSet<TCategory> = (partial: Partial<PaginatedFilterState<TCategory>>) => void;
type PaginatedFilterGet<TCategory> = () => PaginatedFilterState<TCategory>;

export const createPaginatedFilterState = <TCategory>(defaults: PaginatedFilterDefaults<TCategory>) => {
  // eslint-disable-next-line coding-guide/max-params-project -- zustand StateCreator signature (set, get) is imposed by the middleware API
  return (set: PaginatedFilterSet<TCategory>, get: PaginatedFilterGet<TCategory>): PaginatedFilterState<TCategory> => ({
    category: defaults.category,
    filter: defaults.filter,
    page: defaults.page,
    pageSize: defaults.pageSize,
    hasFilters: () => get().category !== defaults.category || get().filter !== defaults.filter,
    setCategory: (category) => set({ category, page: defaults.page }),
    setFilter: (filter) => set({ filter, page: defaults.page }),
    handlePageChange: ({ page, pageSize }) => {
      const currentPageSize = get().pageSize;
      if (pageSize !== currentPageSize) {
        set({ page: defaults.page, pageSize });
      } else {
        set({ page });
      }
    },
    resetFilters: () =>
      set({
        category: defaults.category,
        filter: defaults.filter,
        page: defaults.page,
      }),
  });
};
