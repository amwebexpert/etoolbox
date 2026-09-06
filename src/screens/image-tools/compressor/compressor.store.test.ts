import { beforeEach, describe, expect, it, vi } from "vitest";

vi.hoisted(() => {
  if (typeof globalThis.localStorage !== "undefined") return;
  const store = new Map<string, string>();
  const mock: Storage = {
    get length() {
      return store.size;
    },
    clear: () => store.clear(),
    getItem: (key) => store.get(key) ?? null,
    key: (index) => Array.from(store.keys())[index] ?? null,
    removeItem: (key) => {
      store.delete(key);
    },
    setItem: (key, value) => {
      store.set(key, String(value));
    },
  };
  Object.defineProperty(globalThis, "localStorage", {
    value: mock,
    configurable: true,
  });
});

import { COMPRESSOR_DEFAULTS, useCompressorStore } from "./compressor.store";

const makeImageFile = (): File => new File(["x"], "img.png", { type: "image/png" });

describe("useCompressorStore", () => {
  beforeEach(() => {
    useCompressorStore.setState({ ...COMPRESSOR_DEFAULTS, selectedFile: null, showCompressionSettings: false });
    localStorage.clear();
  });

  it("starts with the documented defaults", () => {
    // act
    const state = useCompressorStore.getState();

    // assert
    expect(state.quality).toBe(COMPRESSOR_DEFAULTS.quality);
    expect(state.mimeType).toBe(COMPRESSOR_DEFAULTS.mimeType);
    expect(state.maxWidth).toBe(COMPRESSOR_DEFAULTS.maxWidth);
    expect(state.maxHeight).toBe(COMPRESSOR_DEFAULTS.maxHeight);
    expect(state.minWidth).toBe(COMPRESSOR_DEFAULTS.minWidth);
    expect(state.minHeight).toBe(COMPRESSOR_DEFAULTS.minHeight);
    expect(state.width).toBe(COMPRESSOR_DEFAULTS.width);
    expect(state.height).toBe(COMPRESSOR_DEFAULTS.height);
    expect(state.resize).toBe(COMPRESSOR_DEFAULTS.resize);
    expect(state.convertSize).toBe(COMPRESSOR_DEFAULTS.convertSize);
    expect(state.checkOrientation).toBe(COMPRESSOR_DEFAULTS.checkOrientation);
  });

  it("starts with selectedFile null", () => {
    // act
    const selectedFile = useCompressorStore.getState().selectedFile;

    // assert
    expect(selectedFile).toBeNull();
  });

  it("updates quality via setQuality", () => {
    // arrange
    const store = useCompressorStore.getState();

    // act
    store.setQuality(0.42);

    // assert
    expect(useCompressorStore.getState().quality).toBe(0.42);
  });

  it("updates mimeType via setMimeType", () => {
    // arrange
    const store = useCompressorStore.getState();

    // act
    store.setMimeType("image/webp");

    // assert
    expect(useCompressorStore.getState().mimeType).toBe("image/webp");
  });

  it("updates maxWidth via setMaxWidth", () => {
    // arrange
    const store = useCompressorStore.getState();

    // act
    store.setMaxWidth(1280);

    // assert
    expect(useCompressorStore.getState().maxWidth).toBe(1280);
  });

  it("updates maxHeight via setMaxHeight", () => {
    // arrange
    const store = useCompressorStore.getState();

    // act
    store.setMaxHeight(720);

    // assert
    expect(useCompressorStore.getState().maxHeight).toBe(720);
  });

  it("updates minWidth via setMinWidth", () => {
    // arrange
    const store = useCompressorStore.getState();

    // act
    store.setMinWidth(64);

    // assert
    expect(useCompressorStore.getState().minWidth).toBe(64);
  });

  it("updates minHeight via setMinHeight", () => {
    // arrange
    const store = useCompressorStore.getState();

    // act
    store.setMinHeight(48);

    // assert
    expect(useCompressorStore.getState().minHeight).toBe(48);
  });

  it("updates width via setWidth", () => {
    // arrange
    const store = useCompressorStore.getState();

    // act
    store.setWidth(800);

    // assert
    expect(useCompressorStore.getState().width).toBe(800);
  });

  it("updates height via setHeight", () => {
    // arrange
    const store = useCompressorStore.getState();

    // act
    store.setHeight(600);

    // assert
    expect(useCompressorStore.getState().height).toBe(600);
  });

  it("updates resize via setResize", () => {
    // arrange
    const store = useCompressorStore.getState();

    // act
    store.setResize("cover");

    // assert
    expect(useCompressorStore.getState().resize).toBe("cover");
  });

  it("updates convertSize via setConvertSize", () => {
    // arrange
    const store = useCompressorStore.getState();

    // act
    store.setConvertSize(2_000_000);

    // assert
    expect(useCompressorStore.getState().convertSize).toBe(2_000_000);
  });

  it.each([
    ["setMaxWidth", "maxWidth"],
    ["setMaxHeight", "maxHeight"],
    ["setMinWidth", "minWidth"],
    ["setMinHeight", "minHeight"],
    ["setWidth", "width"],
    ["setHeight", "height"],
    ["setConvertSize", "convertSize"],
  ] as const)("coerces null to 0 via %s", (setterName, stateKey) => {
    // arrange
    const store = useCompressorStore.getState();

    // act
    store[setterName](1280);

    // assert
    expect(useCompressorStore.getState()[stateKey]).toBe(1280);

    // act
    store[setterName](null);

    // assert
    expect(useCompressorStore.getState()[stateKey]).toBe(0);
  });

  it("updates checkOrientation via setCheckOrientation", () => {
    // arrange
    const store = useCompressorStore.getState();

    // act
    store.setCheckOrientation(false);

    // assert
    expect(useCompressorStore.getState().checkOrientation).toBe(false);
  });

  it("sets selectedFile via setSelectedFile", () => {
    // arrange
    const store = useCompressorStore.getState();
    const file = makeImageFile();

    // act
    store.setSelectedFile(file);

    // assert
    expect(useCompressorStore.getState().selectedFile).toBe(file);
  });

  it("clears selectedFile via clearSelectedFile", () => {
    // arrange
    const store = useCompressorStore.getState();
    store.setSelectedFile(makeImageFile());

    // act
    store.clearSelectedFile();

    // assert
    expect(useCompressorStore.getState().selectedFile).toBeNull();
  });

  it("persists state changes to localStorage under the store name", () => {
    // arrange
    const store = useCompressorStore.getState();

    // act
    store.setQuality(0.33);
    store.setMimeType("image/jpeg");
    const raw = localStorage.getItem("etoolbox-compressor");

    // assert
    expect(raw).not.toBeNull();

    let parsed: { state: { quality: number; mimeType: string } };
    try {
      parsed = JSON.parse(raw as string) as { state: { quality: number; mimeType: string } };
    } catch (error) {
      throw new Error(`Failed to parse persisted compressor state: ${String(error)}`, { cause: error });
    }
    expect(parsed.state.quality).toBe(0.33);
    expect(parsed.state.mimeType).toBe("image/jpeg");
  });
});
