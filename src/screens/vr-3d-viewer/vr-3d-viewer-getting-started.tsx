import { Alert } from "antd";

import { useStyles } from "./vr-3d-viewer.styles";

export const Vr3dViewerGettingStarted = () => {
  const { styles } = useStyles();

  return (
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
  );
};
