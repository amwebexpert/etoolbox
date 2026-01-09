declare module "parse-curl" {
  interface ParsedCurl {
    method: string;
    url: string;
    header?: Record<string, string>;
    body?: string;
  }

  function parseCurl(curlCommand: string): ParsedCurl;

  export = parseCurl;
}
