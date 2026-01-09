import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { DEFAULT_QUANTITY, DEFAULT_VERSION, type UuidVersion } from "./uuid-generator.utils";

interface UuidGeneratorState {
  version: UuidVersion;
  quantity: number;
  generated: string;
  setVersion: (version: UuidVersion) => void;
  setQuantity: (quantity: number) => void;
  setGenerated: (result: string) => void;
  clearAll: () => void;
}

const stateCreator = (set: (partial: Partial<UuidGeneratorState>) => void): UuidGeneratorState => ({
  version: DEFAULT_VERSION,
  quantity: DEFAULT_QUANTITY,
  generated: "",
  setVersion: (version) => set({ version }),
  setQuantity: (quantity) => set({ quantity }),
  setGenerated: (generated) => set({ generated }),
  clearAll: () =>
    set({
      version: DEFAULT_VERSION,
      quantity: DEFAULT_QUANTITY,
      generated: "",
    }),
});

const PERSISTED_STORE_NAME = "etoolbox-uuid-generator";

const persistedStateCreator = persist<UuidGeneratorState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useUuidGeneratorStore = create<UuidGeneratorState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME }),
);
