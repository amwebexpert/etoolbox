import { downloadBlob } from "@lichens-innovation/ts-common/web";
import { downloadZip } from "client-zip";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createFakeOpfsDirectory } from "~/utils/fake-opfs-directory.utils";

import { useFileSystemStore } from "./file-system.store";
import { ROOT_KEY, ROOT_PATH } from "./file-system.utils";

vi.mock("@lichens-innovation/ts-common/web", () => ({
  downloadBlob: vi.fn(),
}));

vi.mock("client-zip", () => ({
  downloadZip: vi.fn(() => ({ blob: async () => new Blob(["zipped"], { type: "application/zip" }) })),
}));

const stubFakeOpfsRoot = (): FileSystemDirectoryHandle => {
  const root = createFakeOpfsDirectory();
  vi.stubGlobal("navigator", { storage: { getDirectory: vi.fn().mockResolvedValue(root) } });
  return root;
};

const resetStore = () => {
  useFileSystemStore.setState({
    unsupportedError: null,
    currentPath: ROOT_PATH,
    entries: [],
    loading: false,
    selectedNames: [],
    treeData: [{ key: ROOT_KEY, path: ROOT_PATH, title: "OPFS Root", isLeaf: false }],
    modal: { mode: "create-folder", open: false, targetName: "", targetKind: undefined },
  });
};

describe("useFileSystemStore", () => {
  beforeEach(() => {
    resetStore();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  describe("init", () => {
    it("sets unsupportedError when OPFS isn't available", async () => {
      // arrange
      vi.stubGlobal("navigator", {});

      // act
      await useFileSystemStore.getState().init();

      // assert
      expect(useFileSystemStore.getState().unsupportedError).toMatch(/Origin Private File System/);
    });

    it("loads the root tree and entries when OPFS is available", async () => {
      // arrange
      stubFakeOpfsRoot();
      await useFileSystemStore.getState().createFolder("docs");
      resetStore();

      // act
      await useFileSystemStore.getState().init();

      // assert
      expect(useFileSystemStore.getState().unsupportedError).toBeNull();
      expect(useFileSystemStore.getState().entries).toEqual([{ name: "docs", kind: "directory" }]);
      expect(useFileSystemStore.getState().treeData[0].children).toEqual([
        { key: "docs", path: "docs", title: "docs", isLeaf: false },
      ]);
    });
  });

  describe("navigateTo", () => {
    it("updates currentPath, loads entries, and clears selection", async () => {
      // arrange
      stubFakeOpfsRoot();
      await useFileSystemStore.getState().createFolder("docs");
      useFileSystemStore.setState({ selectedNames: ["docs"] });

      // act
      await useFileSystemStore.getState().navigateTo("docs");

      // assert
      expect(useFileSystemStore.getState().currentPath).toBe("docs");
      expect(useFileSystemStore.getState().entries).toEqual([]);
      expect(useFileSystemStore.getState().selectedNames).toEqual([]);
    });
  });

  describe("createFolder", () => {
    it("creates a folder and refreshes the current listing", async () => {
      // arrange
      stubFakeOpfsRoot();

      // act
      await useFileSystemStore.getState().createFolder("docs");

      // assert
      expect(useFileSystemStore.getState().entries).toEqual([{ name: "docs", kind: "directory" }]);
    });

    it("throws when an entry with that name already exists", async () => {
      // arrange
      stubFakeOpfsRoot();
      await useFileSystemStore.getState().createFolder("docs");

      // act & assert
      await expect(useFileSystemStore.getState().createFolder("docs")).rejects.toThrow(/already exists/);
    });
  });

  describe("createFile", () => {
    it("writes the file with the given content and refreshes the listing", async () => {
      // arrange
      stubFakeOpfsRoot();

      // act
      await useFileSystemStore.getState().createFile({ name: "note.txt", content: "hello" });

      // assert
      const entries = useFileSystemStore.getState().entries;
      expect(entries).toEqual([{ name: "note.txt", kind: "file", size: 5, lastModified: expect.any(Number) }]);
    });

    it("throws when an entry with that name already exists", async () => {
      // arrange
      stubFakeOpfsRoot();
      await useFileSystemStore.getState().createFile({ name: "note.txt", content: "hello" });

      // act & assert
      await expect(useFileSystemStore.getState().createFile({ name: "note.txt", content: "again" })).rejects.toThrow(
        /already exists/
      );
    });
  });

  describe("renameEntry", () => {
    it("renames the target file and refreshes the listing", async () => {
      // arrange
      stubFakeOpfsRoot();
      await useFileSystemStore.getState().createFile({ name: "old.txt", content: "hello" });
      useFileSystemStore.getState().openRenameModal({ name: "old.txt", kind: "file" });

      // act
      await useFileSystemStore.getState().renameEntry("new.txt");

      // assert
      expect(useFileSystemStore.getState().entries.map((entry) => entry.name)).toEqual(["new.txt"]);
    });

    it("throws when the new name already exists in the folder", async () => {
      // arrange
      stubFakeOpfsRoot();
      await useFileSystemStore.getState().createFile({ name: "old.txt", content: "hello" });
      await useFileSystemStore.getState().createFile({ name: "taken.txt", content: "hi" });
      useFileSystemStore.getState().openRenameModal({ name: "old.txt", kind: "file" });

      // act & assert
      await expect(useFileSystemStore.getState().renameEntry("taken.txt")).rejects.toThrow(/already exists/);
    });
  });

  describe("deleteEntry / deleteSelected", () => {
    it("deletes a single file", async () => {
      // arrange
      stubFakeOpfsRoot();
      await useFileSystemStore.getState().createFile({ name: "note.txt", content: "hello" });

      // act
      await useFileSystemStore.getState().deleteEntry({ name: "note.txt", kind: "file" });

      // assert
      expect(useFileSystemStore.getState().entries).toEqual([]);
    });

    it("deletes a non-empty folder recursively", async () => {
      // arrange
      stubFakeOpfsRoot();
      await useFileSystemStore.getState().createFolder("docs");
      await useFileSystemStore.getState().navigateTo("docs");
      await useFileSystemStore.getState().createFile({ name: "a.txt", content: "A" });
      await useFileSystemStore.getState().navigateTo("");

      // act
      await useFileSystemStore.getState().deleteEntry({ name: "docs", kind: "directory" });

      // assert
      expect(useFileSystemStore.getState().entries).toEqual([]);
    });

    it("deletes multiple selected entries", async () => {
      // arrange
      stubFakeOpfsRoot();
      await useFileSystemStore.getState().createFile({ name: "a.txt", content: "A" });
      await useFileSystemStore.getState().createFile({ name: "b.txt", content: "B" });
      useFileSystemStore.setState({ selectedNames: ["a.txt", "b.txt"] });

      // act
      await useFileSystemStore.getState().deleteSelected();

      // assert
      expect(useFileSystemStore.getState().entries).toEqual([]);
      expect(useFileSystemStore.getState().selectedNames).toEqual([]);
    });
  });

  describe("uploadFiles", () => {
    it("uploads files and skips any name collisions", async () => {
      // arrange
      stubFakeOpfsRoot();
      await useFileSystemStore.getState().createFile({ name: "existing.txt", content: "old" });
      const newFile = new File(["fresh"], "new.txt");
      const collidingFile = new File(["fresh"], "existing.txt");

      // act
      const result = await useFileSystemStore.getState().uploadFiles([newFile, collidingFile]);

      // assert
      expect(result).toEqual({ uploaded: ["new.txt"], skipped: ["existing.txt"] });
      expect(
        useFileSystemStore
          .getState()
          .entries.map((entry) => entry.name)
          .sort()
      ).toEqual(["existing.txt", "new.txt"]);
    });
  });

  describe("countEntryContents / countManyEntriesContents", () => {
    it("counts nested items in a folder", async () => {
      // arrange
      stubFakeOpfsRoot();
      await useFileSystemStore.getState().createFolder("docs");
      await useFileSystemStore.getState().navigateTo("docs");
      await useFileSystemStore.getState().createFile({ name: "a.txt", content: "A" });
      await useFileSystemStore.getState().navigateTo("");

      // act
      const directoryCount = await useFileSystemStore
        .getState()
        .countEntryContents({ name: "docs", kind: "directory" });
      const fileCount = await useFileSystemStore.getState().countEntryContents({ name: "docs", kind: "file" });

      // assert
      expect(directoryCount).toBe(1);
      expect(fileCount).toBe(0);
    });

    it("sums nested items across multiple selected folders", async () => {
      // arrange
      stubFakeOpfsRoot();
      await useFileSystemStore.getState().createFolder("a");
      await useFileSystemStore.getState().createFolder("b");
      await useFileSystemStore.getState().navigateTo("a");
      await useFileSystemStore.getState().createFile({ name: "x.txt", content: "X" });
      await useFileSystemStore.getState().navigateTo("");

      // act
      const total = await useFileSystemStore.getState().countManyEntriesContents(["a", "b"]);

      // assert
      expect(total).toBe(1);
    });
  });

  describe("downloadEntry / downloadSelected", () => {
    it("downloads a single file directly as a blob", async () => {
      // arrange
      stubFakeOpfsRoot();
      await useFileSystemStore.getState().createFile({ name: "note.txt", content: "hello" });

      // act
      await useFileSystemStore.getState().downloadEntry({ name: "note.txt", kind: "file" });

      // assert
      expect(downloadZip).not.toHaveBeenCalled();
      expect(downloadBlob).toHaveBeenCalledTimes(1);
      expect(vi.mocked(downloadBlob).mock.calls[0][0].fileName).toBe("note.txt");
    });

    it("downloads a folder as a zip archive", async () => {
      // arrange
      stubFakeOpfsRoot();
      await useFileSystemStore.getState().createFolder("docs");

      // act
      await useFileSystemStore.getState().downloadEntry({ name: "docs", kind: "directory" });

      // assert
      expect(downloadZip).toHaveBeenCalledTimes(1);
      expect(downloadBlob).toHaveBeenCalledTimes(1);
      expect(vi.mocked(downloadBlob).mock.calls[0][0].fileName).toBe("docs.zip");
    });

    it("downloads multiple selected items as a single zip archive", async () => {
      // arrange
      stubFakeOpfsRoot();
      await useFileSystemStore.getState().createFile({ name: "a.txt", content: "A" });
      await useFileSystemStore.getState().createFile({ name: "b.txt", content: "B" });
      useFileSystemStore.setState({ selectedNames: ["a.txt", "b.txt"] });

      // act
      await useFileSystemStore.getState().downloadSelected();

      // assert
      expect(downloadZip).toHaveBeenCalledTimes(1);
      expect(downloadBlob).toHaveBeenCalledTimes(1);
      expect(vi.mocked(downloadBlob).mock.calls[0][0].fileName).toBe("download.zip");
    });
  });

  describe("modal actions", () => {
    it("opens the create-folder modal", () => {
      // act
      useFileSystemStore.getState().openCreateFolderModal();

      // assert
      expect(useFileSystemStore.getState().modal).toEqual({
        mode: "create-folder",
        open: true,
        targetName: "",
        targetKind: undefined,
      });
    });

    it("opens the rename modal prefilled with the target", () => {
      // act
      useFileSystemStore.getState().openRenameModal({ name: "note.txt", kind: "file" });

      // assert
      expect(useFileSystemStore.getState().modal).toEqual({
        mode: "rename",
        open: true,
        targetName: "note.txt",
        targetKind: "file",
      });
    });

    it("closes the modal", () => {
      // arrange
      useFileSystemStore.getState().openCreateFolderModal();

      // act
      useFileSystemStore.getState().closeModal();

      // assert
      expect(useFileSystemStore.getState().modal.open).toBe(false);
    });
  });

  describe("selection actions", () => {
    it("toggles a name in and out of the selection", () => {
      // act
      useFileSystemStore.getState().toggleSelected("a.txt");

      // assert
      expect(useFileSystemStore.getState().selectedNames).toEqual(["a.txt"]);

      // act
      useFileSystemStore.getState().toggleSelected("a.txt");

      // assert
      expect(useFileSystemStore.getState().selectedNames).toEqual([]);
    });

    it("clears the selection", () => {
      // arrange
      useFileSystemStore.setState({ selectedNames: ["a.txt", "b.txt"] });

      // act
      useFileSystemStore.getState().clearSelection();

      // assert
      expect(useFileSystemStore.getState().selectedNames).toEqual([]);
    });
  });

  describe("loadTreeNodeChildren", () => {
    it("caches children and does not refetch unless forced", async () => {
      // arrange
      const root = stubFakeOpfsRoot();
      await useFileSystemStore.getState().createFolder("docs");
      const listSpy = vi.spyOn(root, "entries");

      // act
      await useFileSystemStore.getState().loadTreeNodeChildren({ path: ROOT_PATH });
      const callsAfterFirstLoad = listSpy.mock.calls.length;
      await useFileSystemStore.getState().loadTreeNodeChildren({ path: ROOT_PATH });

      // assert
      expect(listSpy.mock.calls.length).toBe(callsAfterFirstLoad);
    });

    it("refetches when force is true", async () => {
      // arrange
      stubFakeOpfsRoot();
      await useFileSystemStore.getState().loadTreeNodeChildren({ path: ROOT_PATH });
      await useFileSystemStore.getState().createFolder("docs");

      // act
      await useFileSystemStore.getState().loadTreeNodeChildren({ path: ROOT_PATH, force: true });

      // assert
      expect(useFileSystemStore.getState().treeData[0].children).toEqual([
        { key: "docs", path: "docs", title: "docs", isLeaf: false },
      ]);
    });
  });
});
