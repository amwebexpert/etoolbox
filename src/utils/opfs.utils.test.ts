import { afterEach, describe, expect, it, vi } from "vitest";

import { createFakeOpfsDirectory } from "./fake-opfs-directory.utils";
import {
  collectOpfsFilesRecursive,
  countOpfsDirectoryContents,
  createOpfsDirectory,
  getOpfsRoot,
  listOpfsDirectoryEntries,
  opfsEntryExists,
  readBlobFromOpfs,
  removeOpfsEntry,
  renameOpfsEntry,
  writeFileToOpfs,
  writeTextFileToOpfs,
} from "./opfs.utils";

interface FakeFileHandle {
  createWritable?: ReturnType<typeof vi.fn>;
  getFile?: ReturnType<typeof vi.fn>;
}

interface CreateFakeRootArgs {
  fileContent: string;
}

const createFakeRoot = ({ fileContent }: CreateFakeRootArgs) => {
  const writable = { write: vi.fn(), close: vi.fn() };
  const writeFileHandle: FakeFileHandle = { createWritable: vi.fn().mockResolvedValue(writable) };
  const file = { arrayBuffer: vi.fn().mockResolvedValue(new TextEncoder().encode(fileContent).buffer) };
  const readFileHandle: FakeFileHandle = { getFile: vi.fn().mockResolvedValue(file) };

  const getFileHandle = vi.fn((path: string) => (path === "write.txt" ? writeFileHandle : readFileHandle));
  const removeEntry = vi.fn().mockResolvedValue(undefined);

  return { getFileHandle, removeEntry, writable };
};

describe("getOpfsRoot", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("throws when the browser has no Origin Private File System support", async () => {
    // arrange
    vi.stubGlobal("navigator", {});

    // act & assert
    await expect(getOpfsRoot()).rejects.toThrow(/Origin Private File System/);
  });

  it("resolves the root directory handle when supported", async () => {
    // arrange
    const root = { fake: "root" };
    vi.stubGlobal("navigator", { storage: { getDirectory: vi.fn().mockResolvedValue(root) } });

    // act
    const result = await getOpfsRoot();

    // assert
    expect(result).toBe(root);
  });
});

describe("writeTextFileToOpfs", () => {
  it("writes content to the given path and closes the writable", async () => {
    // arrange
    const root = createFakeRoot({ fileContent: "" });

    // act
    await writeTextFileToOpfs({
      root: root as unknown as FileSystemDirectoryHandle,
      path: "write.txt",
      text: "hello",
    });

    // assert
    expect(root.getFileHandle).toHaveBeenCalledWith("write.txt", { create: true });
    expect(root.writable.write).toHaveBeenCalledWith("hello");
    expect(root.writable.close).toHaveBeenCalledTimes(1);
  });

  it("creates intermediate folders and writes into a nested path", async () => {
    // arrange
    const root = createFakeOpfsDirectory();

    // act
    await writeTextFileToOpfs({ root, path: "docs/notes/todo.txt", text: "buy milk" });

    // assert
    const entries = await listOpfsDirectoryEntries({ root, path: "docs/notes" });
    expect(entries).toEqual([{ name: "todo.txt", kind: "file", size: 8, lastModified: expect.any(Number) }]);
  });
});

describe("writeFileToOpfs", () => {
  it("writes a File's content to the given path", async () => {
    // arrange
    const root = createFakeOpfsDirectory();
    const file = new File(["binary-ish content"], "upload.bin");

    // act
    await writeFileToOpfs({ root, path: "uploads/upload.bin", file });

    // assert
    const blob = await readBlobFromOpfs({ root, path: "uploads/upload.bin", mimeType: "application/octet-stream" });
    expect(await blob.text()).toBe("binary-ish content");
  });
});

describe("readBlobFromOpfs", () => {
  it("returns a blob with the given mime type and file content", async () => {
    // arrange
    const root = createFakeRoot({ fileContent: "hello" });

    // act
    const blob = await readBlobFromOpfs({
      root: root as unknown as FileSystemDirectoryHandle,
      path: "read.txt",
      mimeType: "text/plain",
    });

    // assert
    expect(blob.type).toBe("text/plain");
    expect(await blob.text()).toBe("hello");
  });
});

describe("removeOpfsEntry", () => {
  it("removes the entry at the given path", async () => {
    // arrange
    const root = createFakeRoot({ fileContent: "" });

    // act
    await removeOpfsEntry({ root: root as unknown as FileSystemDirectoryHandle, path: "write.txt" });

    // assert
    expect(root.removeEntry).toHaveBeenCalledWith("write.txt");
  });

  it("swallows errors from removeEntry", async () => {
    // arrange
    const root = { removeEntry: vi.fn().mockRejectedValue(new Error("nope")) };

    // act
    const result = await removeOpfsEntry({ root: root as unknown as FileSystemDirectoryHandle, path: "missing.txt" });

    // assert
    expect(result).toBeUndefined();
  });

  it("removes a non-empty directory recursively when recursive is true", async () => {
    // arrange
    const root = createFakeOpfsDirectory();
    await writeTextFileToOpfs({ root, path: "folder/file.txt", text: "x" });

    // act
    await removeOpfsEntry({ root, path: "folder", recursive: true });

    // assert
    expect(await listOpfsDirectoryEntries({ root, path: "" })).toEqual([]);
  });
});

describe("createOpfsDirectory", () => {
  it("creates a nested directory structure", async () => {
    // arrange
    const root = createFakeOpfsDirectory();

    // act
    await createOpfsDirectory({ root, path: "a/b/c" });

    // assert
    expect(await listOpfsDirectoryEntries({ root, path: "a" })).toEqual([{ name: "b", kind: "directory" }]);
    expect(await listOpfsDirectoryEntries({ root, path: "a/b" })).toEqual([{ name: "c", kind: "directory" }]);
  });
});

describe("listOpfsDirectoryEntries", () => {
  it("lists files and directories with file metadata", async () => {
    // arrange
    const root = createFakeOpfsDirectory();
    await createOpfsDirectory({ root, path: "sub" });
    await writeTextFileToOpfs({ root, path: "note.txt", text: "hello" });

    // act
    const entries = await listOpfsDirectoryEntries({ root, path: "" });

    // assert
    expect(entries).toHaveLength(2);
    expect(entries).toContainEqual({ name: "sub", kind: "directory" });
    expect(entries).toContainEqual({ name: "note.txt", kind: "file", size: 5, lastModified: expect.any(Number) });
  });
});

describe("opfsEntryExists", () => {
  it("returns true when an entry with that name exists in the parent folder", async () => {
    // arrange
    const root = createFakeOpfsDirectory();
    await writeTextFileToOpfs({ root, path: "note.txt", text: "hello" });

    // act
    const exists = await opfsEntryExists({ root, path: "note.txt" });

    // assert
    expect(exists).toBe(true);
  });

  it("returns false when no entry with that name exists", async () => {
    // arrange
    const root = createFakeOpfsDirectory();

    // act
    const exists = await opfsEntryExists({ root, path: "missing.txt" });

    // assert
    expect(exists).toBe(false);
  });
});

describe("renameOpfsEntry", () => {
  it("renames a file, preserving its content", async () => {
    // arrange
    const root = createFakeOpfsDirectory();
    await writeTextFileToOpfs({ root, path: "old.txt", text: "hello" });

    // act
    await renameOpfsEntry({ root, path: "old.txt", kind: "file", newName: "new.txt" });

    // assert
    expect(await listOpfsDirectoryEntries({ root, path: "" })).toEqual([
      { name: "new.txt", kind: "file", size: 5, lastModified: expect.any(Number) },
    ]);
    const blob = await readBlobFromOpfs({ root, path: "new.txt", mimeType: "text/plain" });
    expect(await blob.text()).toBe("hello");
  });

  it("renames a directory, preserving nested contents", async () => {
    // arrange
    const root = createFakeOpfsDirectory();
    await writeTextFileToOpfs({ root, path: "old-folder/nested/deep.txt", text: "deep content" });

    // act
    await renameOpfsEntry({ root, path: "old-folder", kind: "directory", newName: "new-folder" });

    // assert
    expect(await listOpfsDirectoryEntries({ root, path: "" })).toEqual([{ name: "new-folder", kind: "directory" }]);
    const blob = await readBlobFromOpfs({ root, path: "new-folder/nested/deep.txt", mimeType: "text/plain" });
    expect(await blob.text()).toBe("deep content");
  });
});

describe("collectOpfsFilesRecursive", () => {
  it("collects all files under a folder with paths relative to that folder", async () => {
    // arrange
    const root = createFakeOpfsDirectory();
    await writeTextFileToOpfs({ root, path: "docs/a.txt", text: "A" });
    await writeTextFileToOpfs({ root, path: "docs/nested/b.txt", text: "B" });

    // act
    const files = await collectOpfsFilesRecursive({ root, path: "docs" });

    // assert
    const paths = files.map((entry) => entry.path).sort();
    expect(paths).toEqual(["a.txt", "nested/b.txt"]);
  });
});

describe("countOpfsDirectoryContents", () => {
  it("counts all files and folders nested under a folder", async () => {
    // arrange
    const root = createFakeOpfsDirectory();
    await writeTextFileToOpfs({ root, path: "docs/a.txt", text: "A" });
    await writeTextFileToOpfs({ root, path: "docs/nested/b.txt", text: "B" });

    // act
    const count = await countOpfsDirectoryContents({ root, path: "docs" });

    // assert
    expect(count).toBe(3);
  });

  it("returns 0 for an empty folder", async () => {
    // arrange
    const root = createFakeOpfsDirectory();
    await createOpfsDirectory({ root, path: "empty" });

    // act
    const count = await countOpfsDirectoryContents({ root, path: "empty" });

    // assert
    expect(count).toBe(0);
  });
});
