import { Grid } from "@react-three/drei";
import { isLightColor } from "@lichens-innovation/ts-common";

import type { SceneGridProps } from "./canvas.types";

/**
 * Grid helper component for the 3D scene
 */
export const SceneGrid = ({ backgroundColor }: SceneGridProps) => {
  const isLight = isLightColor(backgroundColor);
  const gridColor = isLight ? "#333333" : "#555555";
  const cellColor = isLight ? "#222222" : "#444444";

  return (
    <Grid
      position={[0, -0.01, 0]}
      args={[20, 20]}
      cellSize={0.5}
      cellThickness={0.5}
      cellColor={cellColor}
      sectionSize={2}
      sectionThickness={1}
      sectionColor={gridColor}
      fadeDistance={25}
      fadeStrength={1}
      infiniteGrid
    />
  );
};
