import { TBlogQueryModel } from "../@types/blogs";

export const helper = (query: TBlogQueryModel) => {
  const { pageNumber, pageSize, sortBy, sortDirection, searchNameTerm } = query;
  return {
    pageNumber: pageNumber ? +pageNumber : 1,
    pageSize: pageSize !== undefined ? +pageSize : 10,
    sortBy: sortBy ? sortBy : "createdAt",
    sortDirection: sortDirection ? sortDirection : "desc",
    searchNameTerm: searchNameTerm ? searchNameTerm : null,
  };
};
