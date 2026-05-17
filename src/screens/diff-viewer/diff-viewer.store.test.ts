import { beforeEach, describe, expect, it } from "vitest";

import { useDiffViewerStore } from "./diff-viewer.store";

describe("useDiffViewerStore", () => {
  beforeEach(() => {
    useDiffViewerStore.setState({
      originalText: "",
      modifiedText: "",
      ignoreWhitespace: false,
    });
  });

  it("starts with empty original and modified text", () => {
    const state = useDiffViewerStore.getState();

    expect(state.originalText).toBe("");
    expect(state.modifiedText).toBe("");
  });

  it("starts with ignoreWhitespace disabled", () => {
    const state = useDiffViewerStore.getState();

    expect(state.ignoreWhitespace).toBe(false);
  });

  it("updates originalText via setOriginalText", () => {
    useDiffViewerStore.getState().setOriginalText("alpha");

    expect(useDiffViewerStore.getState().originalText).toBe("alpha");
  });

  it("updates modifiedText via setModifiedText", () => {
    useDiffViewerStore.getState().setModifiedText("beta");

    expect(useDiffViewerStore.getState().modifiedText).toBe("beta");
  });

  it("keeps originalText and modifiedText independent", () => {
    useDiffViewerStore.getState().setOriginalText("left");
    useDiffViewerStore.getState().setModifiedText("right");

    const state = useDiffViewerStore.getState();
    expect(state.originalText).toBe("left");
    expect(state.modifiedText).toBe("right");
  });

  it("updates ignoreWhitespace via setIgnoreWhitespace", () => {
    useDiffViewerStore.getState().setIgnoreWhitespace(true);

    expect(useDiffViewerStore.getState().ignoreWhitespace).toBe(true);
  });

  it("exchanges originalText and modifiedText via swapTexts", () => {
    useDiffViewerStore.getState().setOriginalText("left");
    useDiffViewerStore.getState().setModifiedText("right");

    useDiffViewerStore.getState().swapTexts();

    const state = useDiffViewerStore.getState();
    expect(state.originalText).toBe("right");
    expect(state.modifiedText).toBe("left");
  });
});
