import { beforeEach, describe, expect, it } from "vitest";

import { useBase64ImageStore } from "./base64-image.store";

describe("useBase64ImageStore", () => {
  beforeEach(() => {
    useBase64ImageStore.setState({ inputText: "" });
  });

  it("starts with empty inputText", () => {
    const state = useBase64ImageStore.getState();

    expect(state.inputText).toBe("");
  });

  it("updates inputText via setInputText", () => {
    useBase64ImageStore.getState().setInputText("data:image/png;base64,abc");

    expect(useBase64ImageStore.getState().inputText).toBe(
      "data:image/png;base64,abc"
    );
  });

  it("replaces previous inputText on subsequent setInputText calls", () => {
    useBase64ImageStore.getState().setInputText("first");
    useBase64ImageStore.getState().setInputText("second");

    expect(useBase64ImageStore.getState().inputText).toBe("second");
  });
});
