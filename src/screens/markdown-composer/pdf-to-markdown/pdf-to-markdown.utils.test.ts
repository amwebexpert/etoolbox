import { afterEach, describe, expect, it, vi } from "vitest";

import type { PdfToMarkdownResponse } from "./pdf-to-markdown.types";
import { convertPdfToMarkdown, toMarkdownFileName } from "./pdf-to-markdown.utils";

class FakeWorker {
  static instances: FakeWorker[] = [];
  onmessage: ((event: MessageEvent) => void) | null = null;
  onerror: ((event: ErrorEvent) => void) | null = null;
  postMessage = vi.fn();
  terminate = vi.fn();

  constructor() {
    FakeWorker.instances.push(this);
  }

  respondWith(data: PdfToMarkdownResponse) {
    this.onmessage?.({ data } as MessageEvent);
  }
}

const stubWorkerRespondingWith = (data: PdfToMarkdownResponse) => {
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

const createPdfFile = () => new File(["%PDF-fake"], "report.pdf", { type: "application/pdf" });

describe("convertPdfToMarkdown", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("posts the PDF bytes and options to the worker and resolves with its result", async () => {
    // arrange
    const result = { markdown: "# Title", pageCount: 2, warnings: [] };
    stubWorkerRespondingWith({ result });

    // act
    const converted = await convertPdfToMarkdown({
      file: createPdfFile(),
      firstPage: 1,
      lastPage: 2,
      keepHeaders: true,
    });

    // assert
    expect(converted).toEqual(result);
    const [worker] = FakeWorker.instances;
    const [request, transfer] = worker.postMessage.mock.calls[0];
    expect(request).toMatchObject({ firstPage: 1, lastPage: 2, keepHeaders: true });
    expect(new TextDecoder().decode(request.pdf)).toBe("%PDF-fake");
    expect(transfer).toEqual([request.pdf]);
    expect(worker.terminate).toHaveBeenCalledTimes(1);
  });

  it("propagates a worker-reported error", async () => {
    // arrange
    stubWorkerRespondingWith({ error: "failed to parse PDF" });

    // act & assert
    await expect(convertPdfToMarkdown({ file: createPdfFile(), keepHeaders: false })).rejects.toThrow(
      "failed to parse PDF"
    );
  });
});

interface MarkdownFileNameCase {
  pdfFileName: string;
  expected: string;
}

describe("toMarkdownFileName", () => {
  it.each`
    pdfFileName     | expected
    ${"report.pdf"} | ${"report.md"}
    ${"Report.PDF"} | ${"Report.md"}
    ${"notes"}      | ${"notes.md"}
    ${""}           | ${"document.md"}
    ${".pdf"}       | ${"document.md"}
  `("maps $pdfFileName to $expected", ({ pdfFileName, expected }: MarkdownFileNameCase) => {
    // act & assert
    expect(toMarkdownFileName(pdfFileName)).toBe(expected);
  });
});
