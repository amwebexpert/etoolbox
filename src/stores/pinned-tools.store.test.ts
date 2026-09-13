import { beforeEach, describe, expect, it } from "vitest";

import { usePinnedToolsStore } from "./pinned-tools.store";

describe("usePinnedToolsStore", () => {
  beforeEach(() => {
    usePinnedToolsStore.setState({ pinnedPaths: [] });
  });

  it("starts with no pinned tools", () => {
    // act
    const state = usePinnedToolsStore.getState();

    // assert
    expect(state.pinnedPaths).toEqual([]);
  });

  it("pins a tool by appending its path", () => {
    // act
    usePinnedToolsStore.getState().togglePinned("/json");

    // assert
    expect(usePinnedToolsStore.getState().pinnedPaths).toEqual(["/json"]);
  });

  it("unpins a tool that is already pinned", () => {
    // arrange
    usePinnedToolsStore.getState().togglePinned("/json");

    // act
    usePinnedToolsStore.getState().togglePinned("/json");

    // assert
    expect(usePinnedToolsStore.getState().pinnedPaths).toEqual([]);
  });

  it("keeps multiple pinned tools in insertion order", () => {
    // act
    usePinnedToolsStore.getState().togglePinned("/json");
    usePinnedToolsStore.getState().togglePinned("/base64");
    usePinnedToolsStore.getState().togglePinned("/url");

    // assert
    expect(usePinnedToolsStore.getState().pinnedPaths).toEqual(["/json", "/base64", "/url"]);
  });

  it("removes only the unpinned tool, preserving the order of the rest", () => {
    // arrange
    usePinnedToolsStore.getState().togglePinned("/json");
    usePinnedToolsStore.getState().togglePinned("/base64");
    usePinnedToolsStore.getState().togglePinned("/url");

    // act
    usePinnedToolsStore.getState().togglePinned("/base64");

    // assert
    expect(usePinnedToolsStore.getState().pinnedPaths).toEqual(["/json", "/url"]);
  });
});
