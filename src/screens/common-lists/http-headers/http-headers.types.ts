export interface HttpHeaderEntry {
  name: string;
  description: string;
  type: HttpHeaderType;
  category: HttpHeaderCategory;
  mdnUrl: string;
}

export type HttpHeaderType = "request" | "response" | "both";

export type HttpHeaderCategory =
  | "authentication"
  | "caching"
  | "conditionals"
  | "connection"
  | "content-negotiation"
  | "controls"
  | "cookies"
  | "cors"
  | "downloads"
  | "message-body"
  | "proxies"
  | "redirects"
  | "request-context"
  | "response-context"
  | "range-requests"
  | "security"
  | "transfer-coding"
  | "websockets"
  | "other";

export type HttpHeaderCategoryFilter = "all" | HttpHeaderCategory;

export type HttpHeaderTypeFilter = "all" | HttpHeaderType;
