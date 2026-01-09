import { CodeSandboxOutlined } from "@ant-design/icons";
import { Alert, Flex } from "antd";
import { createStyles } from "antd-style";
import { useCallback, useEffect, useRef, useState } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useToastMessage } from "~/providers/toast-message-provider";

import type { Vr3dViewerCanvasRef } from "./vr-3d-viewer-canvas";
import { Vr3dViewerCanvas } from "./vr-3d-viewer-canvas";
import { Vr3dViewerFileUpload } from "./vr-3d-viewer-file-upload";
import { Vr3dViewerLoading } from "./vr-3d-viewer-loading";
import { Vr3dViewerSettings } from "./vr-3d-viewer-settings";
import { Vr3dViewerToolbar } from "./vr-3d-viewer-toolbar";
import { useVr3dViewerStore } from "./vr-3d-viewer.store";
import type { ModelFileInfo } from "./vr-3d-viewer.types";
import { DEFAULT_DEMO_MODEL } from "./vr-3d-viewer.types";

export const Vr3dViewer = () => {
  const { styles } = useStyles();
  const messageApi = useToastMessage();
  const canvasRef = useRef<Vr3dViewerCanvasRef>(null);

  // UI state
  const [showSettings, setShowSettings] = useState(false);
  const hasLoadedDefaultModelRef = useRef(false);

  // Store state
  const {
    modelFile,
    isLoading,
    loadProgress,
    error,
    sceneSettings,
    cameraSettings,
    setModelFile,
    setIsLoading,
    setLoadProgress,
    setError,
    setSceneSettings,
    setCameraSettings,
    clearModel,
  } = useVr3dViewerStore();

  // Load default demo model on mount if no model is loaded
  useEffect(() => {
    if (!modelFile && !hasLoadedDefaultModelRef.current) {
      hasLoadedDefaultModelRef.current = true;
      setModelFile(DEFAULT_DEMO_MODEL);
      // Apply suggested scale for demo model
      if (DEFAULT_DEMO_MODEL.suggestedScale) {
        setSceneSettings({ modelScale: DEFAULT_DEMO_MODEL.suggestedScale });
      }
      setIsLoading(true);
      setLoadProgress(0);
    }
  }, [modelFile, setModelFile, setSceneSettings, setIsLoading, setLoadProgress]);

  const handleFileLoaded = (fileInfo: ModelFileInfo) => {
    // Revoke previous URL to free memory
    if (modelFile?.url) {
      URL.revokeObjectURL(modelFile.url);
    }
    setModelFile(fileInfo);
    setIsLoading(true);
    setLoadProgress(0);
  };

  const handleProgress = useCallback(
    (progress: number) => {
      setLoadProgress(progress);
    },
    [setLoadProgress],
  );

  const handleLoaded = useCallback(() => {
    setIsLoading(false);
    setLoadProgress(100);
    messageApi.success("Model loaded successfully!");
  }, [setIsLoading, setLoadProgress, messageApi]);

  const handleError = useCallback(
    (errorMessage: string) => {
      setError(errorMessage);
      messageApi.error(`Failed to load model: ${errorMessage}`);
    },
    [setError, messageApi],
  );

  const handleClear = () => {
    if (modelFile?.url) {
      URL.revokeObjectURL(modelFile.url);
    }
    clearModel();
  };

  const handleResetCamera = useCallback(() => {
    canvasRef.current?.resetCamera();
  }, []);

  const handleFullscreen = useCallback(() => {
    canvasRef.current?.requestFullscreen();
  }, []);

  const handleToggleSettings = useCallback(() => {
    setShowSettings((prev) => !prev);
  }, []);

  const hasModel = !!modelFile;

  return (
    <ScreenContainer>
      <Flex vertical gap="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<CodeSandboxOutlined />}
          title="3D Model Viewer"
          description="View and inspect 3D models (GLTF, GLB, OBJ, FBX, STL). Drag to rotate, scroll to zoom, right-click to pan."
        />

        {/* File Upload */}
        <Vr3dViewerFileUpload modelFile={modelFile} onFileLoaded={handleFileLoaded} />

        {/* Toolbar */}
        <Vr3dViewerToolbar
          hasModel={hasModel}
          isLoading={isLoading}
          showSettings={showSettings}
          onToggleSettings={handleToggleSettings}
          onResetCamera={handleResetCamera}
          onFullscreen={handleFullscreen}
          onClear={handleClear}
        />

        {/* Settings Panel */}
        {showSettings && (
          <Vr3dViewerSettings
            sceneSettings={sceneSettings}
            cameraSettings={cameraSettings}
            onSceneSettingsChange={setSceneSettings}
            onCameraSettingsChange={setCameraSettings}
          />
        )}

        {/* Error Display */}
        {error && (
          <Alert
            type="error"
            title="Error Loading Model"
            description={error}
            showIcon
            closable
            onClose={() => setError(null)}
          />
        )}

        {/* Loading Indicator */}
        {isLoading && <Vr3dViewerLoading progress={loadProgress} fileName={modelFile?.name} />}

        {/* 3D Canvas */}
        <Vr3dViewerCanvas
          ref={canvasRef}
          modelFile={modelFile}
          sceneSettings={sceneSettings}
          cameraSettings={cameraSettings}
          onProgress={handleProgress}
          onError={handleError}
          onLoaded={handleLoaded}
        />

        {/* Usage Instructions */}
        {!hasModel && (
          <Alert
            type="info"
            title="Getting Started"
            description={
              <ul className={styles.instructionsList}>
                <li>Upload a 3D model file using the upload area above</li>
                <li>Supported formats: GLTF, GLB, OBJ, FBX, STL</li>
                <li>Use mouse to navigate: drag to rotate, scroll to zoom, right-click to pan</li>
                <li>Adjust settings for lighting, background, and more</li>
              </ul>
            }
            showIcon
          />
        )}
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  fullWidth: {
    width: "100%",
  },
  instructionsList: {
    margin: 0,
    paddingLeft: 20,
    "& li": {
      marginBottom: 4,
    },
    "& li:last-child": {
      marginBottom: 0,
    },
  },
}));
