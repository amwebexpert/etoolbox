import { createDevToolsStore } from "@sucoza/zustand-devtools-plugin";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface JwtDecoderState {
  token: string;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const stateCreator = (set: (partial: Partial<JwtDecoderState>) => void): JwtDecoderState => ({
  token: "",
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: "" }),
});

const PERSISTED_STORE_NAME = "etoolbox-jwt-decoder";

const persistedStateCreator = persist<JwtDecoderState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useJwtDecoderStore = createDevToolsStore(PERSISTED_STORE_NAME, () =>
  create<JwtDecoderState>()(persistedStateCreator)
);
