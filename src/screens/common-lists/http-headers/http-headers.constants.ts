import type { HttpHeaderEntry, HttpHeaderCategory, HttpHeaderType } from "./http-headers.types";

const MDN_BASE_URL = "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers";

const createEntry = (
  name: string,
  description: string,
  type: HttpHeaderType,
  category: HttpHeaderCategory
): HttpHeaderEntry => ({
  name,
  description,
  type,
  category,
  mdnUrl: `${MDN_BASE_URL}/${name}`,
});

export const HTTP_HEADERS: HttpHeaderEntry[] = [
  // Authentication
  createEntry(
    "WWW-Authenticate",
    "Defines the authentication method that should be used to access a resource.",
    "response",
    "authentication"
  ),
  createEntry(
    "Authorization",
    "Contains the credentials to authenticate a user-agent with a server.",
    "request",
    "authentication"
  ),
  createEntry(
    "Proxy-Authenticate",
    "Defines the authentication method that should be used to access a resource behind a proxy server.",
    "response",
    "authentication"
  ),
  createEntry(
    "Proxy-Authorization",
    "Contains the credentials to authenticate a user agent with a proxy server.",
    "request",
    "authentication"
  ),

  // Caching
  createEntry("Age", "The time, in seconds, that the object has been in a proxy cache.", "response", "caching"),
  createEntry("Cache-Control", "Directives for caching mechanisms in both requests and responses.", "both", "caching"),
  createEntry(
    "Clear-Site-Data",
    "Clears browsing data (cookies, storage, cache) associated with the requesting website.",
    "response",
    "caching"
  ),
  createEntry("Expires", "The date/time after which the response is considered stale.", "response", "caching"),
  createEntry(
    "No-Vary-Search",
    "Specifies a set of rules that define how a URL's query parameters will affect cache matching.",
    "response",
    "caching"
  ),

  // Conditionals
  createEntry(
    "Last-Modified",
    "The last modification date of the resource, used to compare several versions of the same resource.",
    "response",
    "conditionals"
  ),
  createEntry(
    "ETag",
    "A unique string identifying the version of the resource. Conditional requests using If-Match and If-None-Match use this value.",
    "response",
    "conditionals"
  ),
  createEntry(
    "If-Match",
    "Makes the request conditional, and applies the method only if the stored resource matches one of the given ETags.",
    "request",
    "conditionals"
  ),
  createEntry(
    "If-None-Match",
    "Makes the request conditional, and applies the method only if the stored resource doesn't match any of the given ETags.",
    "request",
    "conditionals"
  ),
  createEntry(
    "If-Modified-Since",
    "Makes the request conditional, and expects the resource to be transmitted only if it has been modified after the given date.",
    "request",
    "conditionals"
  ),
  createEntry(
    "If-Unmodified-Since",
    "Makes the request conditional, and expects the resource to be transmitted only if it has not been modified after the given date.",
    "request",
    "conditionals"
  ),
  createEntry(
    "Vary",
    "Determines how to match request headers to decide whether a cached response can be used rather than requesting a fresh one.",
    "response",
    "conditionals"
  ),

  // Connection management
  createEntry(
    "Connection",
    "Controls whether the network connection stays open after the current transaction finishes.",
    "both",
    "connection"
  ),
  createEntry("Keep-Alive", "Controls how long a persistent connection should stay open.", "both", "connection"),

  // Content negotiation
  createEntry(
    "Accept",
    "Informs the server about the types of data that can be sent back.",
    "request",
    "content-negotiation"
  ),
  createEntry(
    "Accept-Encoding",
    "The encoding algorithm, usually a compression algorithm, that can be used on the resource sent back.",
    "request",
    "content-negotiation"
  ),
  createEntry(
    "Accept-Language",
    "Informs the server about the human language the server is expected to send back.",
    "request",
    "content-negotiation"
  ),

  // Controls
  createEntry(
    "Expect",
    "Indicates expectations that need to be fulfilled by the server to properly handle the request.",
    "request",
    "controls"
  ),
  createEntry(
    "Max-Forwards",
    "When using TRACE, indicates the maximum number of hops the request can do before being reflected to the sender.",
    "request",
    "controls"
  ),

  // Cookies
  createEntry(
    "Cookie",
    "Contains stored HTTP cookies previously sent by the server with the Set-Cookie header.",
    "request",
    "cookies"
  ),
  createEntry("Set-Cookie", "Send cookies from the server to the user agent.", "response", "cookies"),

  // CORS
  createEntry(
    "Access-Control-Allow-Credentials",
    "Indicates whether the response to the request can be exposed when the credentials flag is true.",
    "response",
    "cors"
  ),
  createEntry(
    "Access-Control-Allow-Headers",
    "Used in response to a preflight request to indicate which HTTP headers can be used when making the actual request.",
    "response",
    "cors"
  ),
  createEntry(
    "Access-Control-Allow-Methods",
    "Specifies the methods allowed when accessing the resource in response to a preflight request.",
    "response",
    "cors"
  ),
  createEntry(
    "Access-Control-Allow-Origin",
    "Indicates whether the response can be shared, via returning the origin from which content was fetched.",
    "response",
    "cors"
  ),
  createEntry(
    "Access-Control-Expose-Headers",
    "Indicates which headers can be exposed as part of the response by listing their names.",
    "response",
    "cors"
  ),
  createEntry(
    "Access-Control-Max-Age",
    "Indicates how long the results of a preflight request can be cached.",
    "response",
    "cors"
  ),
  createEntry(
    "Access-Control-Request-Headers",
    "Used when issuing a preflight request to let the server know which HTTP headers will be used when the actual request is made.",
    "request",
    "cors"
  ),
  createEntry(
    "Access-Control-Request-Method",
    "Used when issuing a preflight request to let the server know which HTTP method will be used when the actual request is made.",
    "request",
    "cors"
  ),
  createEntry("Origin", "Indicates where a fetch originates from.", "request", "cors"),
  createEntry(
    "Timing-Allow-Origin",
    "Specifies origins that are allowed to see values of attributes retrieved via features of the Resource Timing API.",
    "response",
    "cors"
  ),

  // Downloads
  createEntry(
    "Content-Disposition",
    "Indicates if the resource transmitted should be displayed inline or if it should be handled like a download.",
    "response",
    "downloads"
  ),

  // Message body information
  createEntry("Content-Length", "The size of the resource, in decimal number of bytes.", "both", "message-body"),
  createEntry("Content-Type", "Indicates the media type of the resource.", "both", "message-body"),
  createEntry("Content-Encoding", "Used to specify the compression algorithm.", "both", "message-body"),
  createEntry("Content-Language", "Describes the human language(s) intended for the audience.", "both", "message-body"),
  createEntry("Content-Location", "Indicates an alternate location for the returned data.", "response", "message-body"),

  // Proxies
  createEntry(
    "Forwarded",
    "Contains information from the client-facing side of proxy servers that is altered or lost when a proxy is involved in the path of the request.",
    "request",
    "proxies"
  ),
  createEntry(
    "Via",
    "Added by proxies, both forward and reverse proxies, and can appear in the request headers and the response headers.",
    "both",
    "proxies"
  ),

  // Redirects
  createEntry("Location", "Indicates the URL to redirect a page to.", "response", "redirects"),
  createEntry(
    "Refresh",
    'Directs the browser to reload the page or redirect to another. Same as the meta http-equiv="refresh" element.',
    "response",
    "redirects"
  ),

  // Request context
  createEntry(
    "From",
    "Contains an Internet email address for a human user who controls the requesting user agent.",
    "request",
    "request-context"
  ),
  createEntry(
    "Host",
    "Specifies the host and port number of the server to which the request is being sent.",
    "request",
    "request-context"
  ),
  createEntry(
    "Referer",
    "The address of the previous web page from which a link to the currently requested page was followed.",
    "request",
    "request-context"
  ),
  createEntry(
    "Referrer-Policy",
    "Governs which referrer information sent in the Referer header should be included with requests made.",
    "response",
    "request-context"
  ),
  createEntry(
    "User-Agent",
    "Contains a characteristic string that allows the network protocol peers to identify the application type, OS, software vendor, or version of the requesting software user agent.",
    "request",
    "request-context"
  ),

  // Response context
  createEntry(
    "Allow",
    "Lists the set of HTTP request methods supported by a resource.",
    "response",
    "response-context"
  ),
  createEntry(
    "Server",
    "Contains information about the software used by the origin server to handle the request.",
    "response",
    "response-context"
  ),

  // Range requests
  createEntry(
    "Accept-Ranges",
    "Indicates if the server supports range requests, and if so in which unit the range can be expressed.",
    "response",
    "range-requests"
  ),
  createEntry("Range", "Indicates the part of a document that the server should return.", "request", "range-requests"),
  createEntry(
    "If-Range",
    "Creates a conditional range request that is only fulfilled if the given etag or date matches the remote resource.",
    "request",
    "range-requests"
  ),
  createEntry(
    "Content-Range",
    "Indicates where in a full body message a partial message belongs.",
    "response",
    "range-requests"
  ),

  // Security
  createEntry(
    "Cross-Origin-Embedder-Policy",
    "Allows a server to declare an embedder policy for a given document.",
    "response",
    "security"
  ),
  createEntry(
    "Cross-Origin-Opener-Policy",
    "Prevents other domains from opening/controlling a window.",
    "response",
    "security"
  ),
  createEntry(
    "Cross-Origin-Resource-Policy",
    "Prevents other domains from reading the response of the resources to which this header is applied.",
    "response",
    "security"
  ),
  createEntry(
    "Content-Security-Policy",
    "Controls resources the user agent is allowed to load for a given page.",
    "response",
    "security"
  ),
  createEntry(
    "Content-Security-Policy-Report-Only",
    "Allows web developers to experiment with policies by monitoring, but not enforcing, their effects.",
    "response",
    "security"
  ),
  createEntry(
    "Permissions-Policy",
    "Provides a mechanism to allow and deny the use of browser features in a website's own frame and in iframes that it embeds.",
    "response",
    "security"
  ),
  createEntry("Strict-Transport-Security", "Force communication using HTTPS instead of HTTP.", "response", "security"),
  createEntry(
    "Upgrade-Insecure-Requests",
    "Sends a signal to the server expressing the client's preference for an encrypted and authenticated response.",
    "request",
    "security"
  ),
  createEntry(
    "X-Content-Type-Options",
    "Disables MIME sniffing and forces browser to use the type given in Content-Type.",
    "response",
    "security"
  ),
  createEntry(
    "X-Frame-Options",
    "Indicates whether a browser should be allowed to render a page in a frame, iframe, embed, or object.",
    "response",
    "security"
  ),
  createEntry(
    "X-XSS-Protection",
    "Enables cross-site scripting filtering. Deprecated in modern browsers.",
    "response",
    "security"
  ),

  // Transfer coding
  createEntry(
    "Transfer-Encoding",
    "Specifies the form of encoding used to safely transfer the resource to the user.",
    "response",
    "transfer-coding"
  ),
  createEntry(
    "TE",
    "Specifies the transfer encodings the user agent is willing to accept.",
    "request",
    "transfer-coding"
  ),
  createEntry(
    "Trailer",
    "Allows the sender to include additional fields at the end of chunked messages.",
    "both",
    "transfer-coding"
  ),

  // WebSockets
  createEntry("Sec-WebSocket-Accept", "The server's response to a WebSocket handshake.", "response", "websockets"),
  createEntry("Sec-WebSocket-Extensions", "Specifies one or more WebSocket extensions to use.", "both", "websockets"),
  createEntry(
    "Sec-WebSocket-Key",
    "A key used by the client to negotiate the WebSocket handshake.",
    "request",
    "websockets"
  ),
  createEntry("Sec-WebSocket-Protocol", "Specifies one or more WebSocket subprotocols.", "both", "websockets"),
  createEntry(
    "Sec-WebSocket-Version",
    "Specifies the WebSocket protocol version the client wishes to use.",
    "request",
    "websockets"
  ),

  // Other
  createEntry("Alt-Svc", "Used to list alternate ways to reach this service.", "response", "other"),
  createEntry("Date", "Contains the date and time at which the message was originated.", "both", "other"),
  createEntry(
    "Link",
    "This entity-header field provides a means for serializing one or more links in HTTP headers.",
    "both",
    "other"
  ),
  createEntry(
    "Retry-After",
    "Indicates how long the user agent should wait before making a follow-up request.",
    "response",
    "other"
  ),
  createEntry(
    "Service-Worker-Allowed",
    "Used to remove the path restriction of a service worker by including this header in the response of the service worker script.",
    "response",
    "other"
  ),
  createEntry(
    "SourceMap",
    "Links generated code to a source map, enabling the browser to reconstruct the original source.",
    "response",
    "other"
  ),
  createEntry(
    "Upgrade",
    "The standard mechanism for clients to request the server to use a different protocol.",
    "both",
    "other"
  ),
  createEntry(
    "Priority",
    "Provides a hint describing the priority of a particular resource request on a particular connection.",
    "request",
    "other"
  ),
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
