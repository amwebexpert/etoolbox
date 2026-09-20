import { downloadBlob } from "@lichens-innovation/ts-common/web";
import { createDevToolsStore } from "@sucoza/zustand-devtools-plugin";
import { downloadZip } from "client-zip";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import {
  collectOpfsFilesRecursive,
  countOpfsDirectoryContents,
  createOpfsDirectory,
  getOpfsRoot,
  listOpfsDirectoryEntries,
  opfsEntryExists,
  type OpfsEntryKind,
  type OpfsEntryMeta,
  readBlobFromOpfs,
  removeOpfsEntry,
  renameOpfsEntry,
  writeFileToOpfs,
  writeTextFileToOpfs,
} from "~/utils/opfs.utils";

import type { FileSystemModalState, FileSystemTreeNode } from "./file-system.types";
import {
  buildTreeNode,
  compareEntriesFoldersFirst,
  findTreeNodeByKey,
  joinOpfsPath,
  resolveOpfsMimeType,
  ROOT_KEY,
  ROOT_PATH,
} from "./file-system.utils";

interface FileSystemEntryTarget {
  name: string;
  kind: OpfsEntryKind;
}

interface ZipEntry {
  input: File | Blob;
  name: string;
}

interface BuildZipEntriesForTargetArgs {
  root: FileSystemDirectoryHandle;
  basePath: string;
  target: FileSystemEntryTarget;
}

const buildZipEntriesForTarget = async ({
  root,
  basePath,
  target,
}: BuildZipEntriesForTargetArgs): Promise<ZipEntry[]> => {
  const path = joinOpfsPath({ parentPath: basePath, name: target.name });

  if (target.kind === "file") {
    const mimeType = resolveOpfsMimeType(target.name);
    const blob = await readBlobFromOpfs({ root, path, mimeType });
    return [{ input: blob, name: target.name }];
  }

  const files = await collectOpfsFilesRecursive({ root, path });
  return files.map((entry) => ({ input: entry.file, name: `${target.name}/${entry.path}` }));
};

interface UploadFilesResult {
  uploaded: string[];
  skipped: string[];
}

interface LoadTreeNodeChildrenArgs {
  path: string;
  force?: boolean;
}

interface CreateFileArgs {
  name: string;
  content: string;
}

interface FileSystemState {
  unsupportedError: string | null;
  currentPath: string;
  entries: OpfsEntryMeta[];
  loading: boolean;
  selectedNames: string[];
  treeData: FileSystemTreeNode[];
  modal: FileSystemModalState;

  init: () => Promise<void>;
  navigateTo: (path: string) => Promise<void>;
  refresh: () => Promise<void>;
  loadTreeNodeChildren: (args: LoadTreeNodeChildrenArgs) => Promise<void>;

  toggleSelected: (name: string) => void;
  setSelectedNames: (names: string[]) => void;
  clearSelection: () => void;

  openCreateFolderModal: () => void;
  openCreateFileModal: () => void;
  openRenameModal: (target: FileSystemEntryTarget) => void;
  closeModal: () => void;

  createFolder: (name: string) => Promise<void>;
  createFile: (args: CreateFileArgs) => Promise<void>;
  renameEntry: (newName: string) => Promise<void>;

  countEntryContents: (target: FileSystemEntryTarget) => Promise<number>;
  countManyEntriesContents: (names: string[]) => Promise<number>;
  deleteEntry: (target: FileSystemEntryTarget) => Promise<void>;
  deleteSelected: () => Promise<void>;

  uploadFiles: (files: File[]) => Promise<UploadFilesResult>;

  downloadEntry: (target: FileSystemEntryTarget) => Promise<void>;
  downloadSelected: () => Promise<void>;
}

const INITIAL_MODAL_STATE: FileSystemModalState = {
  mode: "create-folder",
  open: false,
  targetName: "",
  targetKind: undefined,
};

const INITIAL_TREE_DATA: FileSystemTreeNode[] = [{ key: ROOT_KEY, path: ROOT_PATH, title: "OPFS Root", isLeaf: false }];

type SetFileSystemState = (fn: (state: FileSystemState) => void) => void;
type GetFileSystemState = () => FileSystemState;

interface FileSystemSliceArgs {
  set: SetFileSystemState;
  get: GetFileSystemState;
}

const createNavigationSlice = ({
  set,
  get,
}: FileSystemSliceArgs): Pick<
  FileSystemState,
  | "currentPath"
  | "entries"
  | "init"
  | "loadTreeNodeChildren"
  | "loading"
  | "navigateTo"
  | "refresh"
  | "treeData"
  | "unsupportedError"
> => ({
  unsupportedError: null,
  currentPath: ROOT_PATH,
  entries: [],
  loading: false,
  treeData: INITIAL_TREE_DATA,

  init: async () => {
    try {
      await getOpfsRoot();
    } catch (error) {
      set((state) => {
        state.unsupportedError = error instanceof Error ? error.message : String(error);
      });
      return;
    }

    await get().loadTreeNodeChildren({ path: ROOT_PATH, force: true });
    await get().navigateTo(ROOT_PATH);
  },

  navigateTo: async (path) => {
    set((state) => {
      state.currentPath = path;
      state.selectedNames = [];
      state.loading = true;
    });

    try {
      const root = await getOpfsRoot();
      const rawEntries = await listOpfsDirectoryEntries({ root, path });
      const entries = rawEntries.sort(compareEntriesFoldersFirst);
      set((state) => {
        state.entries = entries;
      });
    } finally {
      set((state) => {
        state.loading = false;
      });
    }
  },

  refresh: async () => {
    const { currentPath } = get();
    await get().navigateTo(currentPath);
    await get().loadTreeNodeChildren({ path: currentPath, force: true });
  },

  loadTreeNodeChildren: async ({ path, force }) => {
    const key = path === ROOT_PATH ? ROOT_KEY : path;
    const existing = findTreeNodeByKey({ nodes: get().treeData, key });
    if (!force && existing?.children) return;

    const root = await getOpfsRoot();
    const entries = await listOpfsDirectoryEntries({ root, path });
    const children = entries
      .filter((entry) => entry.kind === "directory")
      .map((entry) => buildTreeNode({ path: joinOpfsPath({ parentPath: path, name: entry.name }), name: entry.name }))
      .sort((a, b) => a.title.localeCompare(b.title));

    set((state) => {
      const node = findTreeNodeByKey({ nodes: state.treeData, key });
      if (node) node.children = children;
    });
  },
});

const createSelectionSlice = ({
  set,
}: FileSystemSliceArgs): Pick<
  FileSystemState,
  "clearSelection" | "selectedNames" | "setSelectedNames" | "toggleSelected"
> => ({
  selectedNames: [],

  toggleSelected: (name) =>
    set((state) => {
      state.selectedNames = state.selectedNames.includes(name)
        ? state.selectedNames.filter((selected) => selected !== name)
        : [...state.selectedNames, name];
    }),

  setSelectedNames: (names) =>
    set((state) => {
      state.selectedNames = names;
    }),

  clearSelection: () =>
    set((state) => {
      state.selectedNames = [];
    }),
});

const createModalSlice = ({
  set,
}: FileSystemSliceArgs): Pick<
  FileSystemState,
  "closeModal" | "modal" | "openCreateFileModal" | "openCreateFolderModal" | "openRenameModal"
> => ({
  modal: INITIAL_MODAL_STATE,

  openCreateFolderModal: () =>
    set((state) => {
      state.modal = { mode: "create-folder", open: true, targetName: "", targetKind: undefined };
    }),

  openCreateFileModal: () =>
    set((state) => {
      state.modal = { mode: "create-file", open: true, targetName: "", targetKind: undefined };
    }),

  openRenameModal: (target) =>
    set((state) => {
      state.modal = { mode: "rename", open: true, targetName: target.name, targetKind: target.kind };
    }),

  closeModal: () =>
    set((state) => {
      state.modal.open = false;
    }),
});

const createEntryWriteSlice = ({
  set,
  get,
}: FileSystemSliceArgs): Pick<FileSystemState, "createFile" | "createFolder" | "renameEntry" | "uploadFiles"> => ({
  createFolder: async (name) => {
    const root = await getOpfsRoot();
    const path = joinOpfsPath({ parentPath: get().currentPath, name });

    if (await opfsEntryExists({ root, path })) {
      throw new Error(`"${name}" already exists in this folder.`);
    }

    await createOpfsDirectory({ root, path });
    set((state) => {
      state.modal.open = false;
    });
    await get().refresh();
  },

  createFile: async ({ name, content }) => {
    const root = await getOpfsRoot();
    const path = joinOpfsPath({ parentPath: get().currentPath, name });

    if (await opfsEntryExists({ root, path })) {
      throw new Error(`"${name}" already exists in this folder.`);
    }

    await writeTextFileToOpfs({ root, path, text: content });
    set((state) => {
      state.modal.open = false;
    });
    await get().refresh();
  },

  renameEntry: async (newName) => {
    const { modal, currentPath } = get();
    if (modal.mode !== "rename" || !modal.targetKind) {
      throw new Error("No rename target selected.");
    }

    const root = await getOpfsRoot();
    const hasNameChanged = newName !== modal.targetName;
    const newPath = joinOpfsPath({ parentPath: currentPath, name: newName });

    if (hasNameChanged && (await opfsEntryExists({ root, path: newPath }))) {
      throw new Error(`"${newName}" already exists in this folder.`);
    }

    await renameOpfsEntry({
      root,
      path: joinOpfsPath({ parentPath: currentPath, name: modal.targetName }),
      kind: modal.targetKind,
      newName,
    });
    set((state) => {
      state.modal.open = false;
    });
    await get().refresh();
  },

  uploadFiles: async (files) => {
    const root = await getOpfsRoot();
    const { currentPath } = get();
    const uploaded: string[] = [];
    const skipped: string[] = [];

    for (const file of files) {
      const path = joinOpfsPath({ parentPath: currentPath, name: file.name });
      if (await opfsEntryExists({ root, path })) {
        skipped.push(file.name);
        continue;
      }

      await writeFileToOpfs({ root, path, file });
      uploaded.push(file.name);
    }

    await get().refresh();
    return { uploaded, skipped };
  },
});

const createEntryDeleteSlice = ({
  set,
  get,
}: FileSystemSliceArgs): Pick<
  FileSystemState,
  "countEntryContents" | "countManyEntriesContents" | "deleteEntry" | "deleteSelected"
> => ({
  countEntryContents: async (target) => {
    if (target.kind === "file") return 0;
    const root = await getOpfsRoot();
    return countOpfsDirectoryContents({
      root,
      path: joinOpfsPath({ parentPath: get().currentPath, name: target.name }),
    });
  },

  countManyEntriesContents: async (names) => {
    const root = await getOpfsRoot();
    const { currentPath, entries } = get();

    let total = 0;
    for (const name of names) {
      const entry = entries.find((candidate) => candidate.name === name);
      if (entry?.kind === "directory") {
        total += await countOpfsDirectoryContents({ root, path: joinOpfsPath({ parentPath: currentPath, name }) });
      }
    }
    return total;
  },

  deleteEntry: async (target) => {
    const root = await getOpfsRoot();
    const path = joinOpfsPath({ parentPath: get().currentPath, name: target.name });
    await removeOpfsEntry({ root, path, recursive: target.kind === "directory" });

    set((state) => {
      state.selectedNames = state.selectedNames.filter((selected) => selected !== target.name);
    });
    await get().refresh();
  },

  deleteSelected: async () => {
    const root = await getOpfsRoot();
    const { currentPath, selectedNames, entries } = get();
    const targets = entries.filter((entry) => selectedNames.includes(entry.name));

    for (const target of targets) {
      await removeOpfsEntry({
        root,
        path: joinOpfsPath({ parentPath: currentPath, name: target.name }),
        recursive: target.kind === "directory",
      });
    }

    set((state) => {
      state.selectedNames = [];
    });
    await get().refresh();
  },
});

const createDownloadSlice = ({
  get,
}: FileSystemSliceArgs): Pick<FileSystemState, "downloadEntry" | "downloadSelected"> => ({
  downloadEntry: async (target) => {
    const root = await getOpfsRoot();
    const { currentPath, entries } = get();

    if (target.kind === "file") {
      const mimeType = resolveOpfsMimeType(target.name);
      const blob = await readBlobFromOpfs({
        root,
        path: joinOpfsPath({ parentPath: currentPath, name: target.name }),
        mimeType,
      });
      downloadBlob({ blob, fileName: target.name });
      return;
    }

    const resolvedTarget = entries.find((entry) => entry.name === target.name) ?? target;
    const zipEntries = await buildZipEntriesForTarget({ root, basePath: currentPath, target: resolvedTarget });
    const zipBlob = await downloadZip(zipEntries).blob();
    downloadBlob({ blob: zipBlob, fileName: `${target.name}.zip` });
  },

  downloadSelected: async () => {
    const { currentPath, selectedNames, entries } = get();
    const targets = entries.filter((entry) => selectedNames.includes(entry.name));

    if (targets.length === 1) {
      await get().downloadEntry({ name: targets[0].name, kind: targets[0].kind });
      return;
    }

    const root = await getOpfsRoot();
    const zipEntryLists = await Promise.all(
      targets.map((target) => buildZipEntriesForTarget({ root, basePath: currentPath, target }))
    );
    const zipBlob = await downloadZip(zipEntryLists.flat()).blob();
    downloadBlob({ blob: zipBlob, fileName: "download.zip" });
  },
});

const stateCreator = (set: SetFileSystemState, get: GetFileSystemState): FileSystemState => ({
  ...createNavigationSlice({ set, get }),
  ...createSelectionSlice({ set, get }),
  ...createModalSlice({ set, get }),
  ...createEntryWriteSlice({ set, get }),
  ...createEntryDeleteSlice({ set, get }),
  ...createDownloadSlice({ set, get }),
});

const STORE_NAME = "etoolbox-file-system";

export const useFileSystemStore = createDevToolsStore(STORE_NAME, () => create<FileSystemState>()(immer(stateCreator)));
