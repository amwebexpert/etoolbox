import { describe, expect, it } from "vitest";

import type { Tool } from "~/tools/tools-registry";

import { filterTools } from "./home.utils";

const TOOLS: Tool[] = [
  { icon: null, name: "JSON Suite", description: "Format, convert & repair JSON", path: "/json" },
  { icon: null, name: "Base64", description: "Encode & decode text/images", path: "/base64" },
  { icon: null, name: "QR Code", description: "Generate QR codes instantly", path: "/qrcode" },
];

describe("filterTools", () => {
  it("matches on tool name (case-insensitive)", () => {
    // act
    const result = filterTools({ tools: TOOLS, query: "json" });

    // assert
    expect(result.map((tool) => tool.path)).toEqual(["/json"]);
  });

  it("matches on description only", () => {
    // act
    const result = filterTools({ tools: TOOLS, query: "encode" });

    // assert
    expect(result.map((tool) => tool.path)).toEqual(["/base64"]);
  });

  it("returns an empty array when nothing matches", () => {
    // act
    const result = filterTools({ tools: TOOLS, query: "nonexistent" });

    // assert
    expect(result).toEqual([]);
  });

  it("returns every tool for an empty query", () => {
    // act
    const result = filterTools({ tools: TOOLS, query: "" });

    // assert
    expect(result).toEqual(TOOLS);
  });

  it("returns every tool for a whitespace-only query", () => {
    // act
    const result = filterTools({ tools: TOOLS, query: "   " });

    // assert
    expect(result).toEqual(TOOLS);
  });

  it("is case-insensitive", () => {
    // act
    const result = filterTools({ tools: TOOLS, query: "BASE64" });

    // assert
    expect(result.map((tool) => tool.path)).toEqual(["/base64"]);
  });
});
