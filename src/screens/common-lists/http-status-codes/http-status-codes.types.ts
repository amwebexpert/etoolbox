export interface HttpStatusCodeEntry {
  code: number;
  name: string;
  description: string;
  category: HttpStatusCategory;
  mdnUrl: string;
}

export type HttpStatusCategory = "1xx" | "2xx" | "3xx" | "4xx" | "5xx";

export type HttpStatusCategoryFilter = "all" | HttpStatusCategory;
