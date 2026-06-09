import { beforeEach, describe, expect, it } from "vitest";

import { useCompressorStore } from "./compressor.store";

const makeImageFile = (): File => new File(["x"], "img.png", { type: "image/png" });

describe("useCompressorStore", () => {
  beforeEach(() => {
    useCompressorStore.setState({ selectedFile: null });
  });

  it("starts with selectedFile null", () => {
    const state = useCompressorStore.getState();

    expect(state.selectedFile).toBeNull();
  });

  it("sets selectedFile via setSelectedFile", () => {
    const file = makeImageFile();

    useCompressorStore.getState().setSelectedFile(file);

    expect(useCompressorStore.getState().selectedFile).toBe(file);
  });

  it("clears selectedFile via clearSelectedFile", () => {
    useCompressorStore.getState().setSelectedFile(makeImageFile());

    useCompressorStore.getState().clearSelectedFile();

    expect(useCompressorStore.getState().selectedFile).toBeNull();
  });
});
