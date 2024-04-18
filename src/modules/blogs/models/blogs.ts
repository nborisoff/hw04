export type BlogDBType = {
  name: string;
  description: string;
  websiteUrl: string;
  createdAt?: string;
  isMembership?: boolean;
};

export type BlogIdModel = {
  blogId: string;
};

export type BlogInputType = Pick<
  BlogDBType,
  "name" | "description" | "websiteUrl"
>;
