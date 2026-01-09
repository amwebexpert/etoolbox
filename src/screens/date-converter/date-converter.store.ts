import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { DEFAULT_EPOCH_UNIT, DEFAULT_EPOCH_VALUE, type EpochUnit } from "./date-converter.constants";

interface DateConverterState {
  epochValue: string;
  epochUnit: EpochUnit;
  showCodeExamples: boolean;
  setEpochValue: (value: string) => void;
  setEpochUnit: (unit: EpochUnit) => void;
  setShowCodeExamples: (show: boolean) => void;
  toggleShowCodeExamples: () => void;
  reset: () => void;
}

const stateCreator = (
  set: (partial: Partial<DateConverterState> | ((state: DateConverterState) => Partial<DateConverterState>)) => void,
): DateConverterState => ({
  epochValue: DEFAULT_EPOCH_VALUE,
  epochUnit: DEFAULT_EPOCH_UNIT,
  showCodeExamples: true,
  setEpochValue: (value) => set({ epochValue: value }),
  setEpochUnit: (unit) => set({ epochUnit: unit }),
  setShowCodeExamples: (show) => set({ showCodeExamples: show }),
  toggleShowCodeExamples: () => set((state) => ({ showCodeExamples: !state.showCodeExamples })),
  reset: () =>
    set({
      epochValue: DEFAULT_EPOCH_VALUE,
      epochUnit: DEFAULT_EPOCH_UNIT,
    }),
});

const PERSISTED_STORE_NAME = "etoolbox-date-converter";

const persistedStateCreator = persist<DateConverterState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useDateConverterStore = create<DateConverterState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME }),
);
