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
    // act
    const state = useDiffViewerStore.getState();

    // assert
    expect(state.originalText).toBe("");
    expect(state.modifiedText).toBe("");
  });

  it("starts with ignoreWhitespace disabled", () => {
    // act
    const state = useDiffViewerStore.getState();

    // assert
    expect(state.ignoreWhitespace).toBe(false);
  });

  it("updates originalText via setOriginalText", () => {
    // arrange
    const store = useDiffViewerStore.getState();

    // act
    store.setOriginalText("alpha");

    // assert
    expect(useDiffViewerStore.getState().originalText).toBe("alpha");
  });

  it("updates modifiedText via setModifiedText", () => {
    // arrange
    const store = useDiffViewerStore.getState();

    // act
    store.setModifiedText("beta");

    // assert
    expect(useDiffViewerStore.getState().modifiedText).toBe("beta");
  });

  it("keeps originalText and modifiedText independent", () => {
    // arrange
    const store = useDiffViewerStore.getState();

    // act
    store.setOriginalText("left");
    store.setModifiedText("right");
    const state = useDiffViewerStore.getState();

    // assert
    expect(state.originalText).toBe("left");
    expect(state.modifiedText).toBe("right");
  });

  it("updates ignoreWhitespace via setIgnoreWhitespace", () => {
    // arrange
    const store = useDiffViewerStore.getState();

    // act
    store.setIgnoreWhitespace(true);

    // assert
    expect(useDiffViewerStore.getState().ignoreWhitespace).toBe(true);
  });

  it("exchanges originalText and modifiedText via swapTexts", () => {
    // arrange
    const store = useDiffViewerStore.getState();
    store.setOriginalText("left");
    store.setModifiedText("right");

    // act
    store.swapTexts();
    const state = useDiffViewerStore.getState();

    // assert
    expect(state.originalText).toBe("right");
    expect(state.modifiedText).toBe("left");
  });
});
