import { beforeEach, describe, expect, it } from "vitest";

import { useDiffViewerStore } from "./diff-viewer.store";

describe("useDiffViewerStore", () => {
  beforeEach(() => {
    useDiffViewerStore.setState({ originalText: "", modifiedText: "" });
  });

  it("starts with empty original and modified text", () => {
    const state = useDiffViewerStore.getState();

    expect(state.originalText).toBe("");
    expect(state.modifiedText).toBe("");
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
});
