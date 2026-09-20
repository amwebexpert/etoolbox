import { NO_OP } from "@lichens-innovation/ts-common";

export const getOpfsRoot = async (): Promise<FileSystemDirectoryHandle> => {
  if (!navigator.storage?.getDirectory) {
    throw new Error("This feature requires a browser with Origin Private File System support.");
  }
  return navigator.storage.getDirectory();
};

interface OpfsRootPathArgs {
  root: FileSystemDirectoryHandle;
  path: string;
}

interface ResolveOpfsDirectoryArgs extends OpfsRootPathArgs {
  create?: boolean;
}

const resolveOpfsDirectory = async ({
  root,
  path,
  create = false,
}: ResolveOpfsDirectoryArgs): Promise<FileSystemDirectoryHandle> => {
  const segments = path.split("/").filter(Boolean);

  let dir = root;
  for (const segment of segments) {
    dir = await dir.getDirectoryHandle(segment, { create });
  }
  return dir;
};

interface ResolveOpfsParentArgs extends OpfsRootPathArgs {
  create?: boolean;
}

interface ResolvedOpfsParent {
  parent: FileSystemDirectoryHandle;
  name: string;
}

const resolveOpfsParent = async ({
  root,
  path,
  create = false,
}: ResolveOpfsParentArgs): Promise<ResolvedOpfsParent> => {
  const segments = path.split("/").filter(Boolean);
  const name = segments.at(-1) ?? "";
  const parent = await resolveOpfsDirectory({ root, path: segments.slice(0, -1).join("/"), create });
  return { parent, name };
};

export interface WriteTextFileToOpfsArgs extends OpfsRootPathArgs {
  text: string;
}

export const writeTextFileToOpfs = async ({ root, path, text }: WriteTextFileToOpfsArgs): Promise<void> => {
  const { parent, name } = await resolveOpfsParent({ root, path, create: true });
  const fileHandle = await parent.getFileHandle(name, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(text);
  await writable.close();
};

export interface WriteFileToOpfsArgs extends OpfsRootPathArgs {
  file: File | Blob;
}

export const writeFileToOpfs = async ({ root, path, file }: WriteFileToOpfsArgs): Promise<void> => {
  const { parent, name } = await resolveOpfsParent({ root, path, create: true });
  const fileHandle = await parent.getFileHandle(name, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(file);
  await writable.close();
};

export interface ReadBlobFromOpfsArgs extends OpfsRootPathArgs {
  mimeType: string;
}

export const readBlobFromOpfs = async ({ root, path, mimeType }: ReadBlobFromOpfsArgs): Promise<Blob> => {
  const { parent, name } = await resolveOpfsParent({ root, path });
  const fileHandle = await parent.getFileHandle(name);
  const file = await fileHandle.getFile();
  return new Blob([await file.arrayBuffer()], { type: mimeType });
};

export interface RemoveOpfsEntryArgs extends OpfsRootPathArgs {
  recursive?: boolean;
}

export const removeOpfsEntry = async ({ root, path, recursive }: RemoveOpfsEntryArgs): Promise<void> => {
  const { parent, name } = await resolveOpfsParent({ root, path });
  const removal = recursive ? parent.removeEntry(name, { recursive: true }) : parent.removeEntry(name);
  await removal.catch(NO_OP);
};

export type CreateOpfsDirectoryArgs = OpfsRootPathArgs;

export const createOpfsDirectory = async ({ root, path }: CreateOpfsDirectoryArgs): Promise<void> => {
  await resolveOpfsDirectory({ root, path, create: true });
};

export type OpfsEntryKind = "file" | "directory";

export interface OpfsEntryMeta {
  name: string;
  kind: OpfsEntryKind;
  size?: number;
  lastModified?: number;
}

export type ListOpfsDirectoryEntriesArgs = OpfsRootPathArgs;

export const listOpfsDirectoryEntries = async ({
  root,
  path,
}: ListOpfsDirectoryEntriesArgs): Promise<OpfsEntryMeta[]> => {
  const dir = await resolveOpfsDirectory({ root, path });

  const entries: OpfsEntryMeta[] = [];
  for await (const [name, handle] of dir.entries()) {
    if (handle.kind === "file") {
      const file = await handle.getFile();
      entries.push({ name, kind: "file", size: file.size, lastModified: file.lastModified });
    } else {
      entries.push({ name, kind: "directory" });
    }
  }
  return entries;
};

export type OpfsEntryExistsArgs = OpfsRootPathArgs;

export const opfsEntryExists = async ({ root, path }: OpfsEntryExistsArgs): Promise<boolean> => {
  const { parent, name } = await resolveOpfsParent({ root, path });

  for await (const entryName of parent.keys()) {
    if (entryName === name) return true;
  }
  return false;
};

interface CopyOpfsDirectoryContentsArgs {
  source: FileSystemDirectoryHandle;
  destination: FileSystemDirectoryHandle;
}

const copyOpfsDirectoryContents = async ({ source, destination }: CopyOpfsDirectoryContentsArgs): Promise<void> => {
  for await (const [name, handle] of source.entries()) {
    if (handle.kind === "file") {
      const file = await handle.getFile();
      const destFileHandle = await destination.getFileHandle(name, { create: true });
      const writable = await destFileHandle.createWritable();
      await writable.write(file);
      await writable.close();
    } else {
      const destDirHandle = await destination.getDirectoryHandle(name, { create: true });
      await copyOpfsDirectoryContents({ source: handle, destination: destDirHandle });
    }
  }
};

export interface RenameOpfsEntryArgs extends OpfsRootPathArgs {
  kind: OpfsEntryKind;
  newName: string;
}

export const renameOpfsEntry = async ({ root, path, kind, newName }: RenameOpfsEntryArgs): Promise<void> => {
  const { parent, name } = await resolveOpfsParent({ root, path });

  if (kind === "file") {
    const fileHandle = await parent.getFileHandle(name);
    const file = await fileHandle.getFile();
    const newHandle = await parent.getFileHandle(newName, { create: true });
    const writable = await newHandle.createWritable();
    await writable.write(file);
    await writable.close();
  } else {
    const sourceDir = await parent.getDirectoryHandle(name);
    const newDir = await parent.getDirectoryHandle(newName, { create: true });
    await copyOpfsDirectoryContents({ source: sourceDir, destination: newDir });
  }

  await parent.removeEntry(name, { recursive: true });
};

export interface OpfsFileEntry {
  path: string;
  file: File;
}

interface CollectFilesFromDirectoryHandleArgs {
  dir: FileSystemDirectoryHandle;
  basePath: string;
}

const collectFilesFromDirectoryHandle = async ({
  dir,
  basePath,
}: CollectFilesFromDirectoryHandleArgs): Promise<OpfsFileEntry[]> => {
  const files: OpfsFileEntry[] = [];

  for await (const [name, handle] of dir.entries()) {
    const relativePath = basePath ? `${basePath}/${name}` : name;

    if (handle.kind === "file") {
      const file = await handle.getFile();
      files.push({ path: relativePath, file });
    } else {
      const subFiles: OpfsFileEntry[] = await collectFilesFromDirectoryHandle({ dir: handle, basePath: relativePath });
      files.push(...subFiles);
    }
  }
  return files;
};

export type CollectOpfsFilesRecursiveArgs = OpfsRootPathArgs;

export const collectOpfsFilesRecursive = async ({
  root,
  path,
}: CollectOpfsFilesRecursiveArgs): Promise<OpfsFileEntry[]> => {
  const dir = await resolveOpfsDirectory({ root, path });
  return collectFilesFromDirectoryHandle({ dir, basePath: "" });
};

export type CountOpfsDirectoryContentsArgs = OpfsRootPathArgs;

export const countOpfsDirectoryContents = async ({ root, path }: CountOpfsDirectoryContentsArgs): Promise<number> => {
  const dir = await resolveOpfsDirectory({ root, path });

  let count = 0;
  for await (const [name, handle] of dir.entries()) {
    count += 1;
    if (handle.kind === "directory") {
      count += await countOpfsDirectoryContents({ root, path: `${path}/${name}` });
    }
  }
  return count;
};
