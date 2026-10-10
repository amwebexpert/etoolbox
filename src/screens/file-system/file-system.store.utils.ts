import { downloadBlob } from "@lichens-innovation/ts-common/web";
import { downloadZip } from "client-zip";

import {
  collectOpfsFilesRecursive,
  countOpfsDirectoryContents,
  listOpfsDirectoryEntries,
  opfsEntryExists,
  type OpfsEntryKind,
  type OpfsEntryMeta,
  readBlobFromOpfs,
  removeOpfsEntry,
  writeFileToOpfs,
} from "~/utils/opfs.utils";

import type { FileSystemTreeNode } from "./file-system.types";
import { buildTreeNode, compareEntriesFoldersFirst, joinOpfsPath, resolveOpfsMimeType } from "./file-system.utils";

export interface FileSystemEntryTarget {
  name: string;
  kind: OpfsEntryKind;
}

export interface UploadFilesResult {
  uploaded: string[];
  skipped: string[];
}

interface ZipEntry {
  input: File | Blob;
  name: string;
}

interface OpfsDirectoryArgs {
  root: FileSystemDirectoryHandle;
  path: string;
}

export const listSortedOpfsEntries = async ({ root, path }: OpfsDirectoryArgs): Promise<OpfsEntryMeta[]> => {
  const rawEntries = await listOpfsDirectoryEntries({ root, path });
  return rawEntries.sort(compareEntriesFoldersFirst);
};

export const listOpfsTreeChildren = async ({ root, path }: OpfsDirectoryArgs): Promise<FileSystemTreeNode[]> => {
  const entries = await listOpfsDirectoryEntries({ root, path });
  return entries
    .filter((entry) => entry.kind === "directory")
    .map((entry) => buildTreeNode({ path: joinOpfsPath({ parentPath: path, name: entry.name }), name: entry.name }))
    .sort((a, b) => a.title.localeCompare(b.title));
};

interface AssertOpfsEntryAvailableArgs extends OpfsDirectoryArgs {
  name: string;
}

export const assertOpfsEntryAvailable = async ({ root, path, name }: AssertOpfsEntryAvailableArgs): Promise<void> => {
  if (await opfsEntryExists({ root, path })) {
    throw new Error(`"${name}" already exists in this folder.`);
  }
};

interface WriteNewFilesToOpfsArgs {
  root: FileSystemDirectoryHandle;
  parentPath: string;
  files: File[];
}

export const writeNewFilesToOpfs = async ({
  root,
  parentPath,
  files,
}: WriteNewFilesToOpfsArgs): Promise<UploadFilesResult> => {
  const uploaded: string[] = [];
  const skipped: string[] = [];

  for (const file of files) {
    const path = joinOpfsPath({ parentPath, name: file.name });
    if (await opfsEntryExists({ root, path })) {
      skipped.push(file.name);
      continue;
    }

    await writeFileToOpfs({ root, path, file });
    uploaded.push(file.name);
  }

  return { uploaded, skipped };
};

interface CountOpfsEntriesContentsArgs {
  root: FileSystemDirectoryHandle;
  parentPath: string;
  entries: OpfsEntryMeta[];
  names: string[];
}

export const countOpfsEntriesContents = async ({
  root,
  parentPath,
  entries,
  names,
}: CountOpfsEntriesContentsArgs): Promise<number> => {
  let total = 0;
  for (const name of names) {
    const entry = entries.find((candidate) => candidate.name === name);
    if (entry?.kind === "directory") {
      total += await countOpfsDirectoryContents({ root, path: joinOpfsPath({ parentPath, name }) });
    }
  }
  return total;
};

interface RemoveOpfsEntriesArgs {
  root: FileSystemDirectoryHandle;
  parentPath: string;
  targets: FileSystemEntryTarget[];
}

export const removeOpfsEntries = async ({ root, parentPath, targets }: RemoveOpfsEntriesArgs): Promise<void> => {
  for (const target of targets) {
    await removeOpfsEntry({
      root,
      path: joinOpfsPath({ parentPath, name: target.name }),
      recursive: target.kind === "directory",
    });
  }
};

interface BuildZipEntriesForTargetArgs {
  root: FileSystemDirectoryHandle;
  basePath: string;
  target: FileSystemEntryTarget;
}

export const buildZipEntriesForTarget = async ({
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

interface DownloadOpfsFileArgs {
  root: FileSystemDirectoryHandle;
  parentPath: string;
  name: string;
}

export const downloadOpfsFile = async ({ root, parentPath, name }: DownloadOpfsFileArgs): Promise<void> => {
  const mimeType = resolveOpfsMimeType(name);
  const blob = await readBlobFromOpfs({ root, path: joinOpfsPath({ parentPath, name }), mimeType });
  downloadBlob({ blob, fileName: name });
};

interface DownloadZipArchiveArgs {
  zipEntries: ZipEntry[];
  fileName: string;
}

export const downloadZipArchive = async ({ zipEntries, fileName }: DownloadZipArchiveArgs): Promise<void> => {
  const zipBlob = await downloadZip(zipEntries).blob();
  downloadBlob({ blob: zipBlob, fileName });
};
