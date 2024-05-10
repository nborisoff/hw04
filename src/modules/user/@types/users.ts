import { PaginationAndSortQuery } from "../../../types/common-types";

export type TUserQueryModel = PaginationAndSortQuery & {
  searchLoginTerm: string;
  searchEmailTerm: string;
};
