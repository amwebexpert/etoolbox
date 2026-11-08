import { describe, expect, it } from "vitest";

import { getSavedFileMessage } from "./use-saved-file-toast";

describe("getSavedFileMessage", () => {
  it("reports a saved file when written through the save file picker", () => {
    // act
    const result = getSavedFileMessage({ method: "picker", fileName: "notes.pdf" });

    // assert
    expect(result).toBe("File saved: notes.pdf");
  });

  it("reports a downloaded file when falling back to a regular download", () => {
    // act
    const result = getSavedFileMessage({ method: "download", fileName: "document.pdf" });

    // assert
    expect(result).toBe("File downloaded: document.pdf");
  });
});
