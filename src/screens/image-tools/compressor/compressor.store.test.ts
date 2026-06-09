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

describe("useCompressorStore", () => {
  beforeEach(() => {
    useCompressorStore.setState({ ...COMPRESSOR_DEFAULTS });
    localStorage.clear();
  });

  it("starts with the documented defaults", () => {
    const state = useCompressorStore.getState();

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

  it("updates quality via setQuality", () => {
    useCompressorStore.getState().setQuality(0.42);
    expect(useCompressorStore.getState().quality).toBe(0.42);
  });

  it("updates mimeType via setMimeType", () => {
    useCompressorStore.getState().setMimeType("image/webp");
    expect(useCompressorStore.getState().mimeType).toBe("image/webp");
  });

  it("updates maxWidth via setMaxWidth", () => {
    useCompressorStore.getState().setMaxWidth(1280);
    expect(useCompressorStore.getState().maxWidth).toBe(1280);
  });

  it("updates maxHeight via setMaxHeight", () => {
    useCompressorStore.getState().setMaxHeight(720);
    expect(useCompressorStore.getState().maxHeight).toBe(720);
  });

  it("updates minWidth via setMinWidth", () => {
    useCompressorStore.getState().setMinWidth(64);
    expect(useCompressorStore.getState().minWidth).toBe(64);
  });

  it("updates minHeight via setMinHeight", () => {
    useCompressorStore.getState().setMinHeight(48);
    expect(useCompressorStore.getState().minHeight).toBe(48);
  });

  it("updates width via setWidth", () => {
    useCompressorStore.getState().setWidth(800);
    expect(useCompressorStore.getState().width).toBe(800);
  });

  it("updates height via setHeight", () => {
    useCompressorStore.getState().setHeight(600);
    expect(useCompressorStore.getState().height).toBe(600);
  });

  it("updates resize via setResize", () => {
    useCompressorStore.getState().setResize("cover");
    expect(useCompressorStore.getState().resize).toBe("cover");
  });

  it("updates convertSize via setConvertSize", () => {
    useCompressorStore.getState().setConvertSize(2_000_000);
    expect(useCompressorStore.getState().convertSize).toBe(2_000_000);
  });

  it("updates checkOrientation via setCheckOrientation", () => {
    useCompressorStore.getState().setCheckOrientation(false);
    expect(useCompressorStore.getState().checkOrientation).toBe(false);
  });

  it("persists state changes to localStorage under the store name", () => {
    useCompressorStore.getState().setQuality(0.33);
    useCompressorStore.getState().setMimeType("image/jpeg");

    const raw = localStorage.getItem("etoolbox-compressor");
    expect(raw).not.toBeNull();

    const parsed = JSON.parse(raw as string) as { state: { quality: number; mimeType: string } };
    expect(parsed.state.quality).toBe(0.33);
    expect(parsed.state.mimeType).toBe("image/jpeg");
  });
});
