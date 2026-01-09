import { getErrorMessage } from "@lichens-innovation/ts-common";
import parseCurl from "parse-curl";
import { HTTPSnippet, type HarRequest } from "httpsnippet";

// HTTPSnippet target IDs - must match httpsnippet's internal types
type TargetId =
  | "c"
  | "clojure"
  | "csharp"
  | "go"
  | "http"
  | "java"
  | "javascript"
  | "kotlin"
  | "node"
  | "objc"
  | "ocaml"
  | "php"
  | "powershell"
  | "python"
  | "r"
  | "ruby"
  | "shell"
  | "swift";

interface CurlConverterType {
  syntaxLanguage: string;
  target: TargetId;
  client: string;
}

// Map display names to HTTPSnippet target/client pairs
// See: https://github.com/Kong/httpsnippet#targets
export const CONVERTERS: Map<string, CurlConverterType> = new Map([
  ["C (libcurl)", { syntaxLanguage: "c", target: "c", client: "libcurl" }],
  ["Clojure", { syntaxLanguage: "clojure", target: "clojure", client: "clj_http" }],
  ["C#", { syntaxLanguage: "csharp", target: "csharp", client: "httpclient" }],
  ["C# (RestSharp)", { syntaxLanguage: "csharp", target: "csharp", client: "restsharp" }],
  ["Go", { syntaxLanguage: "go", target: "go", client: "native" }],
  ["HTTP", { syntaxLanguage: "http", target: "http", client: "http1.1" }],
  ["Java (OkHttp)", { syntaxLanguage: "java", target: "java", client: "okhttp" }],
  ["Java (Unirest)", { syntaxLanguage: "java", target: "java", client: "unirest" }],
  ["Java (AsyncHttp)", { syntaxLanguage: "java", target: "java", client: "asynchttp" }],
  ["Java (NetHttp)", { syntaxLanguage: "java", target: "java", client: "nethttp" }],
  ["JavaScript (Fetch)", { syntaxLanguage: "javascript", target: "javascript", client: "fetch" }],
  ["JavaScript (Axios)", { syntaxLanguage: "javascript", target: "javascript", client: "axios" }],
  ["JavaScript (jQuery)", { syntaxLanguage: "javascript", target: "javascript", client: "jquery" }],
  ["JavaScript (XHR)", { syntaxLanguage: "javascript", target: "javascript", client: "xhr" }],
  ["Kotlin (OkHttp)", { syntaxLanguage: "kotlin", target: "kotlin", client: "okhttp" }],
  ["Node.js (Fetch)", { syntaxLanguage: "javascript", target: "node", client: "fetch" }],
  ["Node.js (Axios)", { syntaxLanguage: "javascript", target: "node", client: "axios" }],
  ["Node.js (Native)", { syntaxLanguage: "javascript", target: "node", client: "native" }],
  ["Node.js (Request)", { syntaxLanguage: "javascript", target: "node", client: "request" }],
  ["Node.js (Unirest)", { syntaxLanguage: "javascript", target: "node", client: "unirest" }],
  ["Objective-C", { syntaxLanguage: "objectivec", target: "objc", client: "nsurlsession" }],
  ["OCaml", { syntaxLanguage: "ocaml", target: "ocaml", client: "cohttp" }],
  ["PHP (cURL)", { syntaxLanguage: "php", target: "php", client: "curl" }],
  ["PHP (Guzzle)", { syntaxLanguage: "php", target: "php", client: "guzzle" }],
  ["PHP (HTTP v1)", { syntaxLanguage: "php", target: "php", client: "http1" }],
  ["PHP (HTTP v2)", { syntaxLanguage: "php", target: "php", client: "http2" }],
  ["PowerShell (RestMethod)", { syntaxLanguage: "powershell", target: "powershell", client: "restmethod" }],
  ["PowerShell (WebRequest)", { syntaxLanguage: "powershell", target: "powershell", client: "webrequest" }],
  ["Python (Requests)", { syntaxLanguage: "python", target: "python", client: "requests" }],
  ["Python (http.client)", { syntaxLanguage: "python", target: "python", client: "python3" }],
  ["R (httr)", { syntaxLanguage: "r", target: "r", client: "httr" }],
  ["Ruby", { syntaxLanguage: "ruby", target: "ruby", client: "native" }],
  ["Shell (cURL)", { syntaxLanguage: "bash", target: "shell", client: "curl" }],
  ["Shell (HTTPie)", { syntaxLanguage: "bash", target: "shell", client: "httpie" }],
  ["Shell (Wget)", { syntaxLanguage: "bash", target: "shell", client: "wget" }],
  ["Swift (URLSession)", { syntaxLanguage: "swift", target: "swift", client: "urlsession" }],
]);

export const CONVERTERS_LIST = [...CONVERTERS.keys()];

/**
 * Converts a parsed cURL command to HAR (HTTP Archive) format
 * required by HTTPSnippet
 */
const curlToHar = (curlCommand: string): HarRequest => {
  const parsed = parseCurl(curlCommand);

  // Build headers array from parsed headers object
  const headers: Array<{ name: string; value: string }> = [];
  if (parsed.header) {
    Object.entries(parsed.header).forEach(([name, value]) => {
      headers.push({ name, value: String(value) });
    });
  }

  // Parse URL to extract query string
  const queryString: Array<{ name: string; value: string }> = [];
  try {
    const urlObj = new URL(parsed.url);
    urlObj.searchParams.forEach((value, name) => {
      queryString.push({ name, value });
    });
  } catch {
    // URL parsing failed, continue without query params
  }

  // Build postData if body is present
  let postData: HarRequest["postData"] = undefined;
  if (parsed.body) {
    // Try to find content-type from headers
    const contentType = parsed.header?.["Content-Type"] || parsed.header?.["content-type"] || "application/json";

    postData = {
      mimeType: String(contentType),
      text: parsed.body,
    };
  }

  // Build the HAR request object
  const harRequest: HarRequest = {
    method: parsed.method || "GET",
    url: parsed.url,
    httpVersion: "HTTP/1.1",
    cookies: [],
    headers,
    queryString,
    postData,
    headersSize: -1,
    bodySize: -1,
  };

  return harRequest;
};

export const transformCurl = (value?: string, targetLanguage = "JavaScript (Fetch)"): string => {
  if (!value) {
    return "";
  }

  try {
    // Normalize the cURL command (remove line breaks but keep backslash continuations)
    const curlCommand = value
      .replaceAll(/\\\s*[\r\n]+/g, " ") // Remove backslash + newline continuations
      .replaceAll(/[\r\n]+/g, " ") // Remove remaining newlines
      .trim();

    // Get converter configuration
    const converter = CONVERTERS.get(targetLanguage);
    if (!converter) {
      return `Warning: no converter found matching "${targetLanguage}"`;
    }

    // Parse cURL to HAR format
    const harRequest = curlToHar(curlCommand);

    // Create HTTPSnippet and generate code
    const snippet = new HTTPSnippet(harRequest);
    const result = snippet.convert(converter.target, converter.client);

    if (result === false) {
      return `Error: Failed to convert to ${targetLanguage}`;
    }

    // HTTPSnippet returns an array of strings for some targets
    return Array.isArray(result) ? result.join("\n") : String(result);
  } catch (e: unknown) {
    return `Error converting cURL command: ${getErrorMessage(e)}`;
  }
};

export const getSyntaxLanguage = (targetLanguage: string): string => {
  return CONVERTERS.get(targetLanguage)?.syntaxLanguage ?? "text";
};
