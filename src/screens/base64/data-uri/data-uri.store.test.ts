import { beforeEach, describe, expect, it } from "vitest";

import { useDataUriStore } from "./data-uri.store";

describe("useDataUriStore", () => {
  beforeEach(() => {
    useDataUriStore.setState({ inputText: "" });
  });

  it("starts with empty inputText", () => {
    // act
    const state = useDataUriStore.getState();

    // assert
    expect(state.inputText).toBe("");
  });

  it("updates inputText via setInputText", () => {
    // arrange
    const store = useDataUriStore.getState();
    const nextInput = "data:image/png;base64,abc";

    // act
    store.setInputText(nextInput);

    // assert
    expect(useDataUriStore.getState().inputText).toBe(nextInput);
  });

  it("replaces previous inputText on subsequent setInputText calls", () => {
    // arrange
    const store = useDataUriStore.getState();

    // act
    store.setInputText("first");
    store.setInputText("second");

    // assert
    expect(useDataUriStore.getState().inputText).toBe("second");
  });
});
