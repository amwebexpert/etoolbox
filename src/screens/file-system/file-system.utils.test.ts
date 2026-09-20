import { describe, expect, it } from "vitest";

import type { OpfsEntryMeta } from "~/utils/opfs.utils";

import type { FileSystemTreeNode } from "./file-system.types";
import {
  buildTreeNode,
  compareEntriesFoldersFirst,
  findTreeNodeByKey,
  formatEntryModified,
  formatEntrySize,
  joinOpfsPath,
  resolveOpfsMimeType,
  ROOT_KEY,
  ROOT_PATH,
} from "./file-system.utils";

describe("joinOpfsPath", () => {
  it("returns the name alone when the parent path is the root", () => {
    // act & assert
    expect(joinOpfsPath({ parentPath: ROOT_PATH, name: "notes.txt" })).toBe("notes.txt");
  });

  it("joins the parent path and name with a slash", () => {
    // act & assert
    expect(joinOpfsPath({ parentPath: "docs", name: "notes.txt" })).toBe("docs/notes.txt");
  });
});

describe("compareEntriesFoldersFirst", () => {
  const file = (name: string): OpfsEntryMeta => ({ name, kind: "file" });
  const dir = (name: string): OpfsEntryMeta => ({ name, kind: "directory" });

  it("sorts directories before files regardless of name", () => {
    // act
    const result = compareEntriesFoldersFirst(file("a.txt"), dir("z-folder"));

    // assert
    expect(result).toBeGreaterThan(0);
  });

  it("sorts alphabetically by name within the same kind", () => {
    // act & assert
    expect(compareEntriesFoldersFirst(file("b.txt"), file("a.txt"))).toBeGreaterThan(0);
    expect(compareEntriesFoldersFirst(dir("a"), dir("b"))).toBeLessThan(0);
  });
});

describe("formatEntrySize", () => {
  it("formats a file's size in human-readable bytes", () => {
    // act & assert
    expect(formatEntrySize({ name: "a.txt", kind: "file", size: 1024 })).toContain("1");
  });

  it("returns an em dash for directories", () => {
    // act & assert
    expect(formatEntrySize({ name: "docs", kind: "directory" })).toBe("—");
  });
});

describe("formatEntryModified", () => {
  it("formats a file's lastModified timestamp", () => {
    // arrange
    const timestamp = new Date("2024-01-01T00:00:00Z").getTime();

    // act
    const result = formatEntryModified({ name: "a.txt", kind: "file", lastModified: timestamp });

    // assert
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
  });

  it("returns an em dash when there is no lastModified", () => {
    // act & assert
    expect(formatEntryModified({ name: "docs", kind: "directory" })).toBe("—");
  });
});

describe("resolveOpfsMimeType", () => {
  it("resolves a known extension to its MIME type", () => {
    // act & assert
    expect(resolveOpfsMimeType("notes.txt")).toBe("text/plain");
    expect(resolveOpfsMimeType("data.json")).toBe("application/json");
  });

  it("falls back to application/octet-stream for an unknown extension", () => {
    // act & assert
    expect(resolveOpfsMimeType("noext")).toBe("application/octet-stream");
  });
});

describe("buildTreeNode", () => {
  it("builds a non-leaf tree node for the given path and name", () => {
    // act
    const node = buildTreeNode({ path: "docs/nested", name: "nested" });

    // assert
    expect(node).toEqual({ key: "docs/nested", path: "docs/nested", title: "nested", isLeaf: false });
  });
});

describe("findTreeNodeByKey", () => {
  const tree: FileSystemTreeNode[] = [
    {
      key: ROOT_KEY,
      path: ROOT_PATH,
      title: "OPFS Root",
      isLeaf: false,
      children: [
        {
          key: "docs",
          path: "docs",
          title: "docs",
          isLeaf: false,
          children: [{ ...buildTreeNode({ path: "docs/nested", name: "nested" }) }],
        },
      ],
    },
  ];

  it("finds a top-level node by key", () => {
    // act & assert
    expect(findTreeNodeByKey({ nodes: tree, key: ROOT_KEY })?.title).toBe("OPFS Root");
  });

  it("finds a deeply nested node by key", () => {
    // act & assert
    expect(findTreeNodeByKey({ nodes: tree, key: "docs/nested" })?.title).toBe("nested");
  });

  it("returns undefined when no node matches", () => {
    // act & assert
    expect(findTreeNodeByKey({ nodes: tree, key: "missing" })).toBeUndefined();
  });
});
