import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import type { CameraSettings, ModelFileInfo, SceneSettings, ViewMode } from "./vr-3d-viewer.types";
import { DEFAULT_CAMERA_SETTINGS, DEFAULT_SCENE_SETTINGS } from "./vr-3d-viewer.types";

interface Vr3dViewerState {
  // Model state (not persisted)
  modelFile: ModelFileInfo | null;
  isLoading: boolean;
  loadProgress: number;
  error: string | null;

  // Settings (persisted)
  sceneSettings: SceneSettings;
  cameraSettings: CameraSettings;
  viewMode: ViewMode;

  // Actions
  setModelFile: (file: ModelFileInfo | null) => void;
  setIsLoading: (loading: boolean) => void;
  setLoadProgress: (progress: number) => void;
  setError: (error: string | null) => void;
  setSceneSettings: (settings: Partial<SceneSettings>) => void;
  setCameraSettings: (settings: Partial<CameraSettings>) => void;
  setViewMode: (mode: ViewMode) => void;
  resetSettings: () => void;
  clearModel: () => void;
}

const INITIAL_STATE = {
  modelFile: null,
  isLoading: false,
  loadProgress: 0,
  error: null,
  sceneSettings: DEFAULT_SCENE_SETTINGS,
  cameraSettings: DEFAULT_CAMERA_SETTINGS,
  viewMode: "normal" as ViewMode,
};

type SetState = (partial: Partial<Vr3dViewerState> | ((state: Vr3dViewerState) => Partial<Vr3dViewerState>)) => void;

const stateCreator = (set: SetState): Vr3dViewerState => ({
  ...INITIAL_STATE,

  setModelFile: (file) => set({ modelFile: file, error: null }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setLoadProgress: (progress) => set({ loadProgress: progress }),
  setError: (error) => set({ error, isLoading: false }),

  setSceneSettings: (settings) =>
    set((state) => ({
      sceneSettings: { ...state.sceneSettings, ...settings },
    })),

  setCameraSettings: (settings) =>
    set((state) => ({
      cameraSettings: { ...state.cameraSettings, ...settings },
    })),

  setViewMode: (mode) => set({ viewMode: mode }),

  resetSettings: () =>
    set({
      sceneSettings: DEFAULT_SCENE_SETTINGS,
      cameraSettings: DEFAULT_CAMERA_SETTINGS,
      viewMode: "normal",
    }),

  clearModel: () =>
    set({
      modelFile: null,
      isLoading: false,
      loadProgress: 0,
      error: null,
    }),
});

const PERSISTED_STORE_NAME = "etoolbox-vr-3d-viewer";

const persistedStateCreator = persist<Vr3dViewerState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({
    // Only persist settings, not model data
    sceneSettings: state.sceneSettings,
    cameraSettings: state.cameraSettings,
    viewMode: state.viewMode,
    // Don't persist these
    modelFile: null,
    isLoading: false,
    loadProgress: 0,
    error: null,
    // Actions are automatically handled
    setModelFile: state.setModelFile,
    setIsLoading: state.setIsLoading,
    setLoadProgress: state.setLoadProgress,
    setError: state.setError,
    setSceneSettings: state.setSceneSettings,
    setCameraSettings: state.setCameraSettings,
    setViewMode: state.setViewMode,
    resetSettings: state.resetSettings,
    clearModel: state.clearModel,
  }),
});

export const useVr3dViewerStore = create<Vr3dViewerState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME })
);
