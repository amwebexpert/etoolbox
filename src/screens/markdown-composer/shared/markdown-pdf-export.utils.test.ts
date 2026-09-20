import { downloadBlob } from "@lichens-innovation/ts-common/web";
import { afterEach, describe, expect, it, vi } from "vitest";

import { exportMarkdownAsPdf } from "./markdown-pdf-export.utils";

vi.mock("@lichens-innovation/ts-common/web", () => ({
  downloadBlob: vi.fn(),
}));

interface FakeFileHandle {
  createWritable?: ReturnType<typeof vi.fn>;
  getFile?: ReturnType<typeof vi.fn>;
}

interface CreateFakeRootArgs {
  pdfContent: string;
}

const createFakeRoot = ({ pdfContent }: CreateFakeRootArgs) => {
  const writable = { write: vi.fn(), close: vi.fn() };
  const mdFileHandle: FakeFileHandle = { createWritable: vi.fn().mockResolvedValue(writable) };
  const pdfFile = { arrayBuffer: vi.fn().mockResolvedValue(new TextEncoder().encode(pdfContent).buffer) };
  const pdfFileHandle: FakeFileHandle = { getFile: vi.fn().mockResolvedValue(pdfFile) };

  const getFileHandle = vi.fn((path: string) => (path.endsWith(".md") ? mdFileHandle : pdfFileHandle));
  const removeEntry = vi.fn().mockResolvedValue(undefined);

  return { getFileHandle, removeEntry, writable };
};

interface ConvertWorkerResponse {
  pdfPath?: string;
  error?: string;
}

class FakeWorker {
  static instances: FakeWorker[] = [];
  onmessage: ((event: MessageEvent) => void) | null = null;
  onerror: ((event: ErrorEvent) => void) | null = null;
  postMessage = vi.fn();
  terminate = vi.fn();

  constructor() {
    FakeWorker.instances.push(this);
  }

  respondWith(data: ConvertWorkerResponse) {
    this.onmessage?.({ data } as MessageEvent);
  }
}

const stubWorkerRespondingWith = (data: ConvertWorkerResponse) => {
  FakeWorker.instances = [];
  vi.stubGlobal(
    "Worker",
    class extends FakeWorker {
      postMessage = vi.fn(() => {
        queueMicrotask(() => this.respondWith(data));
      });
    }
  );
};

describe("exportMarkdownAsPdf", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("throws when the browser has no Origin Private File System support", async () => {
    // arrange
    vi.stubGlobal("navigator", {});

    // act & assert
    await expect(exportMarkdownAsPdf({ markdown: "# hello" })).rejects.toThrow(/Origin Private File System/);
  });

  it("writes markdown to OPFS, converts via the worker, downloads the resulting PDF, and cleans up OPFS entries", async () => {
    // arrange
    const root = createFakeRoot({ pdfContent: "%PDF-fake" });
    vi.stubGlobal("navigator", { storage: { getDirectory: vi.fn().mockResolvedValue(root) } });
    stubWorkerRespondingWith({ pdfPath: "document.pdf" });

    // act
    await exportMarkdownAsPdf({ markdown: "# hello", fileName: "document.pdf" });

    // assert
    expect(root.writable.write).toHaveBeenCalledWith("# hello");
    expect(root.writable.close).toHaveBeenCalledTimes(1);
    expect(root.removeEntry).toHaveBeenCalledWith(expect.stringMatching(/^[\w-]+\.md$/));
    expect(root.removeEntry).toHaveBeenCalledWith("document.pdf");
    expect(downloadBlob).toHaveBeenCalledTimes(1);
    const call = vi.mocked(downloadBlob).mock.calls[0][0];
    expect(call.fileName).toBe("document.pdf");
    expect(call.blob.type).toBe("application/pdf");
  });

  it("propagates a worker-reported error", async () => {
    // arrange
    const root = createFakeRoot({ pdfContent: "" });
    vi.stubGlobal("navigator", { storage: { getDirectory: vi.fn().mockResolvedValue(root) } });
    stubWorkerRespondingWith({ error: "conversion failed" });

    // act & assert
    await expect(exportMarkdownAsPdf({ markdown: "# hello" })).rejects.toThrow("conversion failed");
    expect(downloadBlob).not.toHaveBeenCalled();
  });
});
