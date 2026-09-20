export const getOpfsRoot = async (): Promise<FileSystemDirectoryHandle> => {
  if (!navigator.storage?.getDirectory) {
    throw new Error("This feature requires a browser with Origin Private File System support.");
  }
  return navigator.storage.getDirectory();
};

export interface WriteTextFileToOpfsArgs {
  root: FileSystemDirectoryHandle;
  path: string;
  text: string;
}

export const writeTextFileToOpfs = async ({ root, path, text }: WriteTextFileToOpfsArgs): Promise<void> => {
  const fileHandle = await root.getFileHandle(path, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(text);
  await writable.close();
};

export interface ReadBlobFromOpfsArgs {
  root: FileSystemDirectoryHandle;
  path: string;
  mimeType: string;
}

export const readBlobFromOpfs = async ({ root, path, mimeType }: ReadBlobFromOpfsArgs): Promise<Blob> => {
  const fileHandle = await root.getFileHandle(path);
  const file = await fileHandle.getFile();
  return new Blob([await file.arrayBuffer()], { type: mimeType });
};

export interface RemoveOpfsEntryArgs {
  root: FileSystemDirectoryHandle;
  path: string;
}

export const removeOpfsEntry = async ({ root, path }: RemoveOpfsEntryArgs): Promise<void> => {
  await root.removeEntry(path).catch(() => undefined);
};
