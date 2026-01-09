import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

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

export const useJwtDecoderStore = create<JwtDecoderState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME }),
);
