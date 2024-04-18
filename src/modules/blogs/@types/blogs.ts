import { PaginationAndSortQuery } from "../../../types/common-types";

export type TBlogQueryModel = PaginationAndSortQuery & {
  searchNameTerm: string;
};

export type TBlogPostsQueryModel = PaginationAndSortQuery & {
  blogId: string;
}
