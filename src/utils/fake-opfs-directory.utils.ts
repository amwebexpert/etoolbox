import { NO_OP } from "@lichens-innovation/ts-common";
import { vi } from "vitest";

import type { OpfsEntryKind } from "./opfs.utils";

interface FakeFsNode {
  kind: OpfsEntryKind;
  name: string;
  content?: string;
  lastModified?: number;
  // eslint-disable-next-line coding-guide/prefer-props-with-children -- data node, not a component props type
  children?: Map<string, FakeFsNode>;
}

interface FakeGetHandleOptions {
  create?: boolean;
}

const makeFakeDirectoryNode = (name: string): FakeFsNode => ({ kind: "directory", name, children: new Map() });

const wrapFakeDirectory = (node: FakeFsNode): FileSystemDirectoryHandle => {
  const children = node.children as Map<string, FakeFsNode>;

  const handle = {
    kind: "directory" as const,
    name: node.name,
    getDirectoryHandle: vi.fn(async (childName: string, options?: FakeGetHandleOptions) => {
      const existing = children.get(childName);
      if (existing) return wrapFakeDirectory(existing);
      if (!options?.create) throw new Error(`NotFoundError: ${childName}`);

      const created = makeFakeDirectoryNode(childName);
      children.set(childName, created);
      return wrapFakeDirectory(created);
    }),
    getFileHandle: vi.fn(async (childName: string, options?: FakeGetHandleOptions) => {
      const existing = children.get(childName);
      if (existing) return wrapFakeFile(existing);
      if (!options?.create) throw new Error(`NotFoundError: ${childName}`);

      const created: FakeFsNode = { kind: "file", name: childName, content: "", lastModified: Date.now() };
      children.set(childName, created);
      return wrapFakeFile(created);
    }),
    removeEntry: vi.fn(async (childName: string) => {
      children.delete(childName);
    }),
    keys: () => keysAsyncIterator(children),
    entries: () => entriesAsyncIterator(children),
  };

  return handle as unknown as FileSystemDirectoryHandle;
};

const wrapFakeFile = (node: FakeFsNode): FileSystemFileHandle => {
  const handle = {
    kind: "file" as const,
    name: node.name,
    getFile: vi.fn(async () => ({
      name: node.name,
      size: node.content?.length ?? 0,
      lastModified: node.lastModified ?? 0,
      arrayBuffer: async () => new TextEncoder().encode(node.content ?? "").buffer,
      text: async () => node.content ?? "",
    })),
    createWritable: vi.fn(async () => ({
      write: vi.fn(async (data: string | Blob) => {
        node.content = typeof data === "string" ? data : await data.text();
      }),
      close: vi.fn(NO_OP),
    })),
  };

  return handle as unknown as FileSystemFileHandle;
};

const keysAsyncIterator = (children: Map<string, FakeFsNode>) => ({
  [Symbol.asyncIterator]: async function* () {
    for (const key of children.keys()) yield key;
  },
});

const entriesAsyncIterator = (children: Map<string, FakeFsNode>) => ({
  [Symbol.asyncIterator]: async function* () {
    for (const [name, node] of children.entries()) {
      yield [name, node.kind === "file" ? wrapFakeFile(node) : wrapFakeDirectory(node)] as [
        string,
        FileSystemDirectoryHandle | FileSystemFileHandle,
      ];
    }
  },
});

export const createFakeOpfsDirectory = (): FileSystemDirectoryHandle => wrapFakeDirectory(makeFakeDirectoryNode(""));
