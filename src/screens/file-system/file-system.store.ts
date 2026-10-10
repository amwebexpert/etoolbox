import { getErrorMessage, isBlank } from "@lichens-innovation/ts-common";
import { createDevToolsStore } from "@sucoza/zustand-devtools-plugin";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import {
  countOpfsDirectoryContents,
  createOpfsDirectory,
  getOpfsRoot,
  type OpfsEntryMeta,
  renameOpfsEntry,
  writeTextFileToOpfs,
} from "~/utils/opfs.utils";

import {
  assertOpfsEntryAvailable,
  buildZipEntriesForTarget,
  countOpfsEntriesContents,
  downloadOpfsFile,
  downloadZipArchive,
  type FileSystemEntryTarget,
  listOpfsTreeChildren,
  listSortedOpfsEntries,
  removeOpfsEntries,
  type UploadFilesResult,
  writeNewFilesToOpfs,
} from "./file-system.store.utils";
import type { FileSystemModalState, FileSystemTreeNode } from "./file-system.types";
import { findTreeNodeByKey, joinOpfsPath, ROOT_KEY, ROOT_PATH } from "./file-system.utils";

interface LoadTreeNodeChildrenArgs {
  path: string;
  force?: boolean;
}

interface CreateFileArgs {
  name: string;
  content: string;
}

interface SupportSlice {
  unsupportedError: string | null;
  init: () => Promise<void>;
}

interface DirectorySlice {
  currentPath: string;
  entries: OpfsEntryMeta[];
  loading: boolean;
  navigateTo: (path: string) => Promise<void>;
  refresh: () => Promise<void>;
}

interface TreeSlice {
  treeData: FileSystemTreeNode[];
  loadTreeNodeChildren: (args: LoadTreeNodeChildrenArgs) => Promise<void>;
}

interface SelectionSlice {
  selectedNames: string[];
  toggleSelected: (name: string) => void;
  setSelectedNames: (names: string[]) => void;
  clearSelection: () => void;
}

interface ModalSlice {
  modal: FileSystemModalState;
  openCreateFolderModal: () => void;
  openCreateFileModal: () => void;
  openRenameModal: (target: FileSystemEntryTarget) => void;
  closeModal: () => void;
}

interface EntryCreationSlice {
  createFolder: (name: string) => Promise<void>;
  createFile: (args: CreateFileArgs) => Promise<void>;
  uploadFiles: (files: File[]) => Promise<UploadFilesResult>;
}

interface EntryRenameSlice {
  renameEntry: (newName: string) => Promise<void>;
}

interface EntryDeleteSlice {
  countEntryContents: (target: FileSystemEntryTarget) => Promise<number>;
  countManyEntriesContents: (names: string[]) => Promise<number>;
  deleteEntry: (target: FileSystemEntryTarget) => Promise<void>;
  deleteSelected: () => Promise<void>;
}

interface DownloadSlice {
  downloadEntry: (target: FileSystemEntryTarget) => Promise<void>;
  downloadSelected: () => Promise<void>;
}

type FileSystemState = SupportSlice &
  DirectorySlice &
  TreeSlice &
  SelectionSlice &
  ModalSlice &
  EntryCreationSlice &
  EntryRenameSlice &
  EntryDeleteSlice &
  DownloadSlice;

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

const createSupportSlice = ({ set, get }: FileSystemSliceArgs): SupportSlice => ({
  unsupportedError: null,

  init: async () => {
    try {
      await getOpfsRoot();
    } catch (error) {
      set((state) => {
        state.unsupportedError = getErrorMessage(error);
      });
      return;
    }

    await get().loadTreeNodeChildren({ path: ROOT_PATH, force: true });
    await get().navigateTo(ROOT_PATH);
  },
});

const createDirectorySlice = ({ set, get }: FileSystemSliceArgs): DirectorySlice => ({
  currentPath: ROOT_PATH,
  entries: [],
  loading: false,

  navigateTo: async (path) => {
    set((state) => {
      state.currentPath = path;
      state.selectedNames = [];
      state.loading = true;
    });

    try {
      const root = await getOpfsRoot();
      const entries = await listSortedOpfsEntries({ root, path });
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
});

const createTreeSlice = ({ set, get }: FileSystemSliceArgs): TreeSlice => ({
  treeData: INITIAL_TREE_DATA,

  loadTreeNodeChildren: async ({ path, force }) => {
    const key = path === ROOT_PATH ? ROOT_KEY : path;
    const existing = findTreeNodeByKey({ nodes: get().treeData, key });
    if (!force && existing?.children) return;

    const root = await getOpfsRoot();
    const children = await listOpfsTreeChildren({ root, path });

    set((state) => {
      const node = findTreeNodeByKey({ nodes: state.treeData, key });
      if (node) node.children = children;
    });
  },
});

const createSelectionSlice = ({ set }: FileSystemSliceArgs): SelectionSlice => ({
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

const createModalSlice = ({ set }: FileSystemSliceArgs): ModalSlice => ({
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

const createEntryCreationSlice = ({ get }: FileSystemSliceArgs): EntryCreationSlice => ({
  createFolder: async (name) => {
    const root = await getOpfsRoot();
    const path = joinOpfsPath({ parentPath: get().currentPath, name });
    await assertOpfsEntryAvailable({ root, path, name });

    await createOpfsDirectory({ root, path });
    get().closeModal();
    await get().refresh();
  },

  createFile: async ({ name, content }) => {
    const root = await getOpfsRoot();
    const path = joinOpfsPath({ parentPath: get().currentPath, name });
    await assertOpfsEntryAvailable({ root, path, name });

    await writeTextFileToOpfs({ root, path, text: content });
    get().closeModal();
    await get().refresh();
  },

  uploadFiles: async (files) => {
    const root = await getOpfsRoot();
    const result = await writeNewFilesToOpfs({ root, parentPath: get().currentPath, files });
    await get().refresh();
    return result;
  },
});

const createEntryRenameSlice = ({ get }: FileSystemSliceArgs): EntryRenameSlice => ({
  renameEntry: async (newName) => {
    const { modal, currentPath } = get();
    if (modal.mode !== "rename" || isBlank(modal.targetKind)) {
      throw new Error("No rename target selected.");
    }

    const root = await getOpfsRoot();
    const hasNameChanged = newName !== modal.targetName;
    const newPath = joinOpfsPath({ parentPath: currentPath, name: newName });

    if (hasNameChanged) {
      await assertOpfsEntryAvailable({ root, path: newPath, name: newName });
    }

    await renameOpfsEntry({
      root,
      path: joinOpfsPath({ parentPath: currentPath, name: modal.targetName }),
      kind: modal.targetKind,
      newName,
    });
    get().closeModal();
    await get().refresh();
  },
});

const createEntryDeleteSlice = ({ set, get }: FileSystemSliceArgs): EntryDeleteSlice => ({
  countEntryContents: async (target) => {
    if (target.kind === "file") return 0;
    const root = await getOpfsRoot();
    const path = joinOpfsPath({ parentPath: get().currentPath, name: target.name });
    return countOpfsDirectoryContents({ root, path });
  },

  countManyEntriesContents: async (names) => {
    const root = await getOpfsRoot();
    const { currentPath, entries } = get();
    return countOpfsEntriesContents({ root, parentPath: currentPath, entries, names });
  },

  deleteEntry: async (target) => {
    const root = await getOpfsRoot();
    await removeOpfsEntries({ root, parentPath: get().currentPath, targets: [target] });

    set((state) => {
      state.selectedNames = state.selectedNames.filter((selected) => selected !== target.name);
    });
    await get().refresh();
  },

  deleteSelected: async () => {
    const root = await getOpfsRoot();
    const { currentPath, selectedNames, entries } = get();
    const targets = entries.filter((entry) => selectedNames.includes(entry.name));
    await removeOpfsEntries({ root, parentPath: currentPath, targets });

    get().clearSelection();
    await get().refresh();
  },
});

const createDownloadSlice = ({ get }: FileSystemSliceArgs): DownloadSlice => ({
  downloadEntry: async (target) => {
    const root = await getOpfsRoot();
    const { currentPath, entries } = get();

    if (target.kind === "file") {
      await downloadOpfsFile({ root, parentPath: currentPath, name: target.name });
      return;
    }

    const resolvedTarget = entries.find((entry) => entry.name === target.name) ?? target;
    const zipEntries = await buildZipEntriesForTarget({ root, basePath: currentPath, target: resolvedTarget });
    await downloadZipArchive({ zipEntries, fileName: `${target.name}.zip` });
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
    await downloadZipArchive({ zipEntries: zipEntryLists.flat(), fileName: "download.zip" });
  },
});

const stateCreator = (set: SetFileSystemState, get: GetFileSystemState): FileSystemState => ({
  ...createSupportSlice({ set, get }),
  ...createDirectorySlice({ set, get }),
  ...createTreeSlice({ set, get }),
  ...createSelectionSlice({ set, get }),
  ...createModalSlice({ set, get }),
  ...createEntryCreationSlice({ set, get }),
  ...createEntryRenameSlice({ set, get }),
  ...createEntryDeleteSlice({ set, get }),
  ...createDownloadSlice({ set, get }),
});

const STORE_NAME = "etoolbox-file-system";

export const useFileSystemStore = createDevToolsStore(STORE_NAME, () => create<FileSystemState>()(immer(stateCreator)));
