import { beforeEach, describe, expect, it } from "vitest";

import { useDataUriStore } from "./data-uri.store";

describe("useDataUriStore", () => {
  beforeEach(() => {
    useDataUriStore.setState({ inputText: "" });
  });

  it("starts with empty inputText", () => {
    const state = useDataUriStore.getState();

    expect(state.inputText).toBe("");
  });

  it("updates inputText via setInputText", () => {
    useDataUriStore.getState().setInputText("data:image/png;base64,abc");

    expect(useDataUriStore.getState().inputText).toBe("data:image/png;base64,abc");
  });

  it("replaces previous inputText on subsequent setInputText calls", () => {
    useDataUriStore.getState().setInputText("first");
    useDataUriStore.getState().setInputText("second");

    expect(useDataUriStore.getState().inputText).toBe("second");
  });
});
