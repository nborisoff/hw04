import { PaginationAndSortQuery } from "../../../types/common-types";

export const helper = (query: PaginationAndSortQuery) => {
  const { pageNumber, pageSize, sortBy, sortDirection } = query;
  return {
    pageNumber: pageNumber ? +pageNumber : 1,
    pageSize: pageSize !== undefined ? +pageSize : 10,
    sortBy: sortBy ? sortBy : "createdAt",
    sortDirection: sortDirection ? sortDirection : "desc",
  };
};
