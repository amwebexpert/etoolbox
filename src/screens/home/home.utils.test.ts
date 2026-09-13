import { describe, expect, it } from "vitest";

import type { Tool } from "~/tools/tools-registry";

import { filterTools } from "./home.utils";

const TOOLS: Tool[] = [
  { icon: null, name: "JSON Suite", description: "Format, convert & repair JSON", path: "/json" },
  { icon: null, name: "Base64", description: "Encode & decode text/images", path: "/base64" },
  { icon: null, name: "QR Code", description: "Generate QR codes instantly", path: "/qrcode" },
];

describe("filterTools", () => {
  it.each([
    { scenario: "matches on tool name", query: "json", expectedPaths: ["/json"] },
    { scenario: "matches on description only", query: "encode", expectedPaths: ["/base64"] },
    { scenario: "matches case-insensitively", query: "BASE64", expectedPaths: ["/base64"] },
    { scenario: "returns an empty array when nothing matches", query: "nonexistent", expectedPaths: [] },
  ])("$scenario (query: $query)", ({ query, expectedPaths }) => {
    // act
    const result = filterTools({ tools: TOOLS, query });

    // assert
    expect(result.map((tool) => tool.path)).toEqual(expectedPaths);
  });

  it.each([
    { scenario: "an empty query", query: "" },
    { scenario: "a whitespace-only query", query: "   " },
  ])("returns every tool for $scenario", ({ query }) => {
    // act
    const result = filterTools({ tools: TOOLS, query });

    // assert
    expect(result).toEqual(TOOLS);
  });
});
