import { afterEach, describe, expect, it, vi } from "vitest";

import { getOpfsRoot, readBlobFromOpfs, removeOpfsEntry, writeTextFileToOpfs } from "./opfs.utils";

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

    // act & assert
    await expect(
      removeOpfsEntry({ root: root as unknown as FileSystemDirectoryHandle, path: "missing.txt" })
    ).resolves.toBeUndefined();
  });
});
