import type { HttpHeaderCategory, HttpHeaderEntry, HttpHeaderType } from "./http-headers.types";

const MDN_BASE_URL = "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers";

interface CreateEntryArgs {
  name: string;
  description: string;
  type: HttpHeaderType;
  category: HttpHeaderCategory;
}

const createEntry = ({ name, description, type, category }: CreateEntryArgs): HttpHeaderEntry => ({
  name,
  description,
  type,
  category,
  mdnUrl: `${MDN_BASE_URL}/${name}`,
});

export const HTTP_HEADERS: HttpHeaderEntry[] = [
  // Authentication
  createEntry({
    name: "WWW-Authenticate",
    description: "Defines the authentication method that should be used to access a resource.",
    type: "response",
    category: "authentication",
  }),
  createEntry({
    name: "Authorization",
    description: "Contains the credentials to authenticate a user-agent with a server.",
    type: "request",
    category: "authentication",
  }),
  createEntry({
    name: "Proxy-Authenticate",
    description: "Defines the authentication method that should be used to access a resource behind a proxy server.",
    type: "response",
    category: "authentication",
  }),
  createEntry({
    name: "Proxy-Authorization",
    description: "Contains the credentials to authenticate a user agent with a proxy server.",
    type: "request",
    category: "authentication",
  }),

  // Caching
  createEntry({
    name: "Age",
    description: "The time, in seconds, that the object has been in a proxy cache.",
    type: "response",
    category: "caching",
  }),
  createEntry({
    name: "Cache-Control",
    description: "Directives for caching mechanisms in both requests and responses.",
    type: "both",
    category: "caching",
  }),
  createEntry({
    name: "Clear-Site-Data",
    description: "Clears browsing data (cookies, storage, cache) associated with the requesting website.",
    type: "response",
    category: "caching",
  }),
  createEntry({
    name: "Expires",
    description: "The date/time after which the response is considered stale.",
    type: "response",
    category: "caching",
  }),
  createEntry({
    name: "No-Vary-Search",
    description: "Specifies a set of rules that define how a URL's query parameters will affect cache matching.",
    type: "response",
    category: "caching",
  }),

  // Conditionals
  createEntry({
    name: "Last-Modified",
    description: "The last modification date of the resource, used to compare several versions of the same resource.",
    type: "response",
    category: "conditionals",
  }),
  createEntry({
    name: "ETag",
    description:
      "A unique string identifying the version of the resource. Conditional requests using If-Match and If-None-Match use this value.",
    type: "response",
    category: "conditionals",
  }),
  createEntry({
    name: "If-Match",
    description:
      "Makes the request conditional, and applies the method only if the stored resource matches one of the given ETags.",
    type: "request",
    category: "conditionals",
  }),
  createEntry({
    name: "If-None-Match",
    description:
      "Makes the request conditional, and applies the method only if the stored resource doesn't match any of the given ETags.",
    type: "request",
    category: "conditionals",
  }),
  createEntry({
    name: "If-Modified-Since",
    description:
      "Makes the request conditional, and expects the resource to be transmitted only if it has been modified after the given date.",
    type: "request",
    category: "conditionals",
  }),
  createEntry({
    name: "If-Unmodified-Since",
    description:
      "Makes the request conditional, and expects the resource to be transmitted only if it has not been modified after the given date.",
    type: "request",
    category: "conditionals",
  }),
  createEntry({
    name: "Vary",
    description:
      "Determines how to match request headers to decide whether a cached response can be used rather than requesting a fresh one.",
    type: "response",
    category: "conditionals",
  }),

  // Connection management
  createEntry({
    name: "Connection",
    description: "Controls whether the network connection stays open after the current transaction finishes.",
    type: "both",
    category: "connection",
  }),
  createEntry({
    name: "Keep-Alive",
    description: "Controls how long a persistent connection should stay open.",
    type: "both",
    category: "connection",
  }),

  // Content negotiation
  createEntry({
    name: "Accept",
    description: "Informs the server about the types of data that can be sent back.",
    type: "request",
    category: "content-negotiation",
  }),
  createEntry({
    name: "Accept-Encoding",
    description: "The encoding algorithm, usually a compression algorithm, that can be used on the resource sent back.",
    type: "request",
    category: "content-negotiation",
  }),
  createEntry({
    name: "Accept-Language",
    description: "Informs the server about the human language the server is expected to send back.",
    type: "request",
    category: "content-negotiation",
  }),

  // Controls
  createEntry({
    name: "Expect",
    description: "Indicates expectations that need to be fulfilled by the server to properly handle the request.",
    type: "request",
    category: "controls",
  }),
  createEntry({
    name: "Max-Forwards",
    description:
      "When using TRACE, indicates the maximum number of hops the request can do before being reflected to the sender.",
    type: "request",
    category: "controls",
  }),

  // Cookies
  createEntry({
    name: "Cookie",
    description: "Contains stored HTTP cookies previously sent by the server with the Set-Cookie header.",
    type: "request",
    category: "cookies",
  }),
  createEntry({
    name: "Set-Cookie",
    description: "Send cookies from the server to the user agent.",
    type: "response",
    category: "cookies",
  }),

  // CORS
  createEntry({
    name: "Access-Control-Allow-Credentials",
    description: "Indicates whether the response to the request can be exposed when the credentials flag is true.",
    type: "response",
    category: "cors",
  }),
  createEntry({
    name: "Access-Control-Allow-Headers",
    description:
      "Used in response to a preflight request to indicate which HTTP headers can be used when making the actual request.",
    type: "response",
    category: "cors",
  }),
  createEntry({
    name: "Access-Control-Allow-Methods",
    description: "Specifies the methods allowed when accessing the resource in response to a preflight request.",
    type: "response",
    category: "cors",
  }),
  createEntry({
    name: "Access-Control-Allow-Origin",
    description:
      "Indicates whether the response can be shared, via returning the origin from which content was fetched.",
    type: "response",
    category: "cors",
  }),
  createEntry({
    name: "Access-Control-Expose-Headers",
    description: "Indicates which headers can be exposed as part of the response by listing their names.",
    type: "response",
    category: "cors",
  }),
  createEntry({
    name: "Access-Control-Max-Age",
    description: "Indicates how long the results of a preflight request can be cached.",
    type: "response",
    category: "cors",
  }),
  createEntry({
    name: "Access-Control-Request-Headers",
    description:
      "Used when issuing a preflight request to let the server know which HTTP headers will be used when the actual request is made.",
    type: "request",
    category: "cors",
  }),
  createEntry({
    name: "Access-Control-Request-Method",
    description:
      "Used when issuing a preflight request to let the server know which HTTP method will be used when the actual request is made.",
    type: "request",
    category: "cors",
  }),
  createEntry({
    name: "Origin",
    description: "Indicates where a fetch originates from.",
    type: "request",
    category: "cors",
  }),
  createEntry({
    name: "Timing-Allow-Origin",
    description:
      "Specifies origins that are allowed to see values of attributes retrieved via features of the Resource Timing API.",
    type: "response",
    category: "cors",
  }),

  // Downloads
  createEntry({
    name: "Content-Disposition",
    description:
      "Indicates if the resource transmitted should be displayed inline or if it should be handled like a download.",
    type: "response",
    category: "downloads",
  }),

  // Message body information
  createEntry({
    name: "Content-Length",
    description: "The size of the resource, in decimal number of bytes.",
    type: "both",
    category: "message-body",
  }),
  createEntry({
    name: "Content-Type",
    description: "Indicates the media type of the resource.",
    type: "both",
    category: "message-body",
  }),
  createEntry({
    name: "Content-Encoding",
    description: "Used to specify the compression algorithm.",
    type: "both",
    category: "message-body",
  }),
  createEntry({
    name: "Content-Language",
    description: "Describes the human language(s) intended for the audience.",
    type: "both",
    category: "message-body",
  }),
  createEntry({
    name: "Content-Location",
    description: "Indicates an alternate location for the returned data.",
    type: "response",
    category: "message-body",
  }),

  // Proxies
  createEntry({
    name: "Forwarded",
    description:
      "Contains information from the client-facing side of proxy servers that is altered or lost when a proxy is involved in the path of the request.",
    type: "request",
    category: "proxies",
  }),
  createEntry({
    name: "Via",
    description:
      "Added by proxies, both forward and reverse proxies, and can appear in the request headers and the response headers.",
    type: "both",
    category: "proxies",
  }),

  // Redirects
  createEntry({
    name: "Location",
    description: "Indicates the URL to redirect a page to.",
    type: "response",
    category: "redirects",
  }),
  createEntry({
    name: "Refresh",
    description:
      'Directs the browser to reload the page or redirect to another. Same as the meta http-equiv="refresh" element.',
    type: "response",
    category: "redirects",
  }),

  // Request context
  createEntry({
    name: "From",
    description: "Contains an Internet email address for a human user who controls the requesting user agent.",
    type: "request",
    category: "request-context",
  }),
  createEntry({
    name: "Host",
    description: "Specifies the host and port number of the server to which the request is being sent.",
    type: "request",
    category: "request-context",
  }),
  createEntry({
    name: "Referer",
    description: "The address of the previous web page from which a link to the currently requested page was followed.",
    type: "request",
    category: "request-context",
  }),
  createEntry({
    name: "Referrer-Policy",
    description: "Governs which referrer information sent in the Referer header should be included with requests made.",
    type: "response",
    category: "request-context",
  }),
  createEntry({
    name: "User-Agent",
    description:
      "Contains a characteristic string that allows the network protocol peers to identify the application type, OS, software vendor, or version of the requesting software user agent.",
    type: "request",
    category: "request-context",
  }),

  // Response context
  createEntry({
    name: "Allow",
    description: "Lists the set of HTTP request methods supported by a resource.",
    type: "response",
    category: "response-context",
  }),
  createEntry({
    name: "Server",
    description: "Contains information about the software used by the origin server to handle the request.",
    type: "response",
    category: "response-context",
  }),

  // Range requests
  createEntry({
    name: "Accept-Ranges",
    description: "Indicates if the server supports range requests, and if so in which unit the range can be expressed.",
    type: "response",
    category: "range-requests",
  }),
  createEntry({
    name: "Range",
    description: "Indicates the part of a document that the server should return.",
    type: "request",
    category: "range-requests",
  }),
  createEntry({
    name: "If-Range",
    description:
      "Creates a conditional range request that is only fulfilled if the given etag or date matches the remote resource.",
    type: "request",
    category: "range-requests",
  }),
  createEntry({
    name: "Content-Range",
    description: "Indicates where in a full body message a partial message belongs.",
    type: "response",
    category: "range-requests",
  }),

  // Security
  createEntry({
    name: "Cross-Origin-Embedder-Policy",
    description: "Allows a server to declare an embedder policy for a given document.",
    type: "response",
    category: "security",
  }),
  createEntry({
    name: "Cross-Origin-Opener-Policy",
    description: "Prevents other domains from opening/controlling a window.",
    type: "response",
    category: "security",
  }),
  createEntry({
    name: "Cross-Origin-Resource-Policy",
    description: "Prevents other domains from reading the response of the resources to which this header is applied.",
    type: "response",
    category: "security",
  }),
  createEntry({
    name: "Content-Security-Policy",
    description: "Controls resources the user agent is allowed to load for a given page.",
    type: "response",
    category: "security",
  }),
  createEntry({
    name: "Content-Security-Policy-Report-Only",
    description: "Allows web developers to experiment with policies by monitoring, but not enforcing, their effects.",
    type: "response",
    category: "security",
  }),
  createEntry({
    name: "Permissions-Policy",
    description:
      "Provides a mechanism to allow and deny the use of browser features in a website's own frame and in iframes that it embeds.",
    type: "response",
    category: "security",
  }),
  createEntry({
    name: "Strict-Transport-Security",
    description: "Force communication using HTTPS instead of HTTP.",
    type: "response",
    category: "security",
  }),
  createEntry({
    name: "Upgrade-Insecure-Requests",
    description:
      "Sends a signal to the server expressing the client's preference for an encrypted and authenticated response.",
    type: "request",
    category: "security",
  }),
  createEntry({
    name: "X-Content-Type-Options",
    description: "Disables MIME sniffing and forces browser to use the type given in Content-Type.",
    type: "response",
    category: "security",
  }),
  createEntry({
    name: "X-Frame-Options",
    description: "Indicates whether a browser should be allowed to render a page in a frame, iframe, embed, or object.",
    type: "response",
    category: "security",
  }),
  createEntry({
    name: "X-XSS-Protection",
    description: "Enables cross-site scripting filtering. Deprecated in modern browsers.",
    type: "response",
    category: "security",
  }),

  // Transfer coding
  createEntry({
    name: "Transfer-Encoding",
    description: "Specifies the form of encoding used to safely transfer the resource to the user.",
    type: "response",
    category: "transfer-coding",
  }),
  createEntry({
    name: "TE",
    description: "Specifies the transfer encodings the user agent is willing to accept.",
    type: "request",
    category: "transfer-coding",
  }),
  createEntry({
    name: "Trailer",
    description: "Allows the sender to include additional fields at the end of chunked messages.",
    type: "both",
    category: "transfer-coding",
  }),

  // WebSockets
  createEntry({
    name: "Sec-WebSocket-Accept",
    description: "The server's response to a WebSocket handshake.",
    type: "response",
    category: "websockets",
  }),
  createEntry({
    name: "Sec-WebSocket-Extensions",
    description: "Specifies one or more WebSocket extensions to use.",
    type: "both",
    category: "websockets",
  }),
  createEntry({
    name: "Sec-WebSocket-Key",
    description: "A key used by the client to negotiate the WebSocket handshake.",
    type: "request",
    category: "websockets",
  }),
  createEntry({
    name: "Sec-WebSocket-Protocol",
    description: "Specifies one or more WebSocket subprotocols.",
    type: "both",
    category: "websockets",
  }),
  createEntry({
    name: "Sec-WebSocket-Version",
    description: "Specifies the WebSocket protocol version the client wishes to use.",
    type: "request",
    category: "websockets",
  }),

  // Other
  createEntry({
    name: "Alt-Svc",
    description: "Used to list alternate ways to reach this service.",
    type: "response",
    category: "other",
  }),
  createEntry({
    name: "Date",
    description: "Contains the date and time at which the message was originated.",
    type: "both",
    category: "other",
  }),
  createEntry({
    name: "Link",
    description: "This entity-header field provides a means for serializing one or more links in HTTP headers.",
    type: "both",
    category: "other",
  }),
  createEntry({
    name: "Retry-After",
    description: "Indicates how long the user agent should wait before making a follow-up request.",
    type: "response",
    category: "other",
  }),
  createEntry({
    name: "Service-Worker-Allowed",
    description:
      "Used to remove the path restriction of a service worker by including this header in the response of the service worker script.",
    type: "response",
    category: "other",
  }),
  createEntry({
    name: "SourceMap",
    description: "Links generated code to a source map, enabling the browser to reconstruct the original source.",
    type: "response",
    category: "other",
  }),
  createEntry({
    name: "Upgrade",
    description: "The standard mechanism for clients to request the server to use a different protocol.",
    type: "both",
    category: "other",
  }),
  createEntry({
    name: "Priority",
    description: "Provides a hint describing the priority of a particular resource request on a particular connection.",
    type: "request",
    category: "other",
  }),
];

export const CATEGORY_LABELS: Record<HttpHeaderCategory, string> = {
  authentication: "Authentication",
  caching: "Caching",
  conditionals: "Conditionals",
  connection: "Connection",
  "content-negotiation": "Content Negotiation",
  controls: "Controls",
  cookies: "Cookies",
  cors: "CORS",
  downloads: "Downloads",
  "message-body": "Message Body",
  proxies: "Proxies",
  redirects: "Redirects",
  "request-context": "Request Context",
  "response-context": "Response Context",
  "range-requests": "Range Requests",
  security: "Security",
  "transfer-coding": "Transfer Coding",
  websockets: "WebSockets",
  other: "Other",
};

export const TYPE_LABELS: Record<string, string> = {
  request: "Request",
  response: "Response",
  both: "Both",
};
