import { describe, expect, it } from "vitest";

import type { Tool } from "~/tools/tools-registry";

import { filterTools } from "./home.utils";

const TOOLS: Tool[] = [
  { icon: null, name: "JSON Suite", description: "Format, convert & repair JSON", path: "/json" },
  { icon: null, name: "Base64", description: "Encode & decode text/images", path: "/base64" },
  { icon: null, name: "QR Code", description: "Generate QR codes instantly", path: "/qrcode" },
];

interface FilterToolsCase {
  scenario: string;
  query: string;
  expectedPaths: string[];
}

interface EmptyQueryCase {
  scenario: string;
  query: string;
}

describe("filterTools", () => {
  it.each`
    scenario                                         | query            | expectedPaths
    ${"matches on tool name"}                        | ${"json"}        | ${["/json"]}
    ${"matches on description only"}                 | ${"encode"}      | ${["/base64"]}
    ${"matches case-insensitively"}                  | ${"BASE64"}      | ${["/base64"]}
    ${"returns an empty array when nothing matches"} | ${"nonexistent"} | ${[]}
  `("$scenario (query: $query)", ({ query, expectedPaths }: FilterToolsCase) => {
    // act
    const result = filterTools({ tools: TOOLS, query });

    // assert
    expect(result.map((tool) => tool.path)).toEqual(expectedPaths);
  });

  it.each`
    scenario                     | query
    ${"an empty query"}          | ${""}
    ${"a whitespace-only query"} | ${"   "}
  `("returns every tool for $scenario", ({ query }: EmptyQueryCase) => {
    // act
    const result = filterTools({ tools: TOOLS, query });

    // assert
    expect(result).toEqual(TOOLS);
  });
});
