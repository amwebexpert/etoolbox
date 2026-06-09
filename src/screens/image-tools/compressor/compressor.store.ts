import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CompressorState {
  selectedFile: File | null;
  setSelectedFile: (file: File) => void;
  clearSelectedFile: () => void;
}

type SetState = (partial: Partial<CompressorState>) => void;

const stateCreator = (set: SetState): CompressorState => ({
  selectedFile: null,
  setSelectedFile: (file) => set({ selectedFile: file }),
  clearSelectedFile: () => set({ selectedFile: null }),
});

const STORE_NAME = "etoolbox-image-compressor";

export const useCompressorStore = create<CompressorState>()(devtools(stateCreator, { name: STORE_NAME }));
