import { useState } from "react";

export const usePagination = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+evt.target.value);
    setPage(0);
  };

  return {
    page,
    setPage,
    rowsPerPage,
    handleChangeRowsPerPage,
  }
}