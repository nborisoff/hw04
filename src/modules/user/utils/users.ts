import { TUserQueryModel } from "../@types/users";

export const helper = (query: TUserQueryModel) => {
  const {
    pageNumber,
    pageSize,
    sortBy,
    sortDirection,
    searchLoginTerm,
    searchEmailTerm,
  } = query;
  return {
    pageNumber: pageNumber ? +pageNumber : 1,
    pageSize: pageSize !== undefined ? +pageSize : 10,
    sortBy: sortBy ? sortBy : "createdAt",
    sortDirection: sortDirection ? sortDirection : "desc",
    searchLoginTerm: searchLoginTerm ? searchLoginTerm : null,
    searchEmailTerm: searchEmailTerm ? searchEmailTerm : null,
  };
};
