import { Col, Form, Row, Select, Slider, Switch } from "antd";
import { createStyles } from "antd-style";

import type { CameraSettings, SceneSettings } from "./vr-3d-viewer.types";
import { BACKGROUND_COLOR_OPTIONS, LIGHTING_PRESET_OPTIONS, MODEL_SCALE_OPTIONS } from "./vr-3d-viewer.types";

interface Vr3dViewerSettingsProps {
  sceneSettings: SceneSettings;
  cameraSettings: CameraSettings;
  onSceneSettingsChange: (settings: Partial<SceneSettings>) => void;
  onCameraSettingsChange: (settings: Partial<CameraSettings>) => void;
}

export const Vr3dViewerSettings = ({
  sceneSettings,
  cameraSettings,
  onSceneSettingsChange,
  onCameraSettingsChange,
}: Vr3dViewerSettingsProps) => {
  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <Form layout="vertical" className={styles.form}>
        <Row gutter={[16, 0]}>
          {/* Background Color */}
          <Col xs={12} sm={8} md={6} lg={4}>
            <Form.Item label="Background" className={styles.formItem}>
              <Select
                value={sceneSettings.backgroundColor}
                onChange={(value) => onSceneSettingsChange({ backgroundColor: value })}
                options={BACKGROUND_COLOR_OPTIONS}
                className={styles.select}
              />
            </Form.Item>
          </Col>

          {/* Lighting Preset */}
          <Col xs={12} sm={8} md={6} lg={4}>
            <Form.Item label="Lighting" className={styles.formItem}>
              <Select
                value={sceneSettings.lightingPreset}
                onChange={(value) => onSceneSettingsChange({ lightingPreset: value })}
                options={LIGHTING_PRESET_OPTIONS}
                className={styles.select}
              />
            </Form.Item>
          </Col>

          {/* Model Scale */}
          <Col xs={12} sm={8} md={6} lg={4}>
            <Form.Item label="Scale" className={styles.formItem}>
              <Select
                value={sceneSettings.modelScale}
                onChange={(value) => onSceneSettingsChange({ modelScale: value })}
                options={MODEL_SCALE_OPTIONS}
                className={styles.select}
              />
            </Form.Item>
          </Col>

          {/* Ambient Intensity */}
          <Col xs={24} sm={12} md={6} lg={4}>
            <Form.Item label="Ambient light" className={styles.formItem}>
              <Slider
                min={0}
                max={2}
                step={0.1}
                value={sceneSettings.ambientIntensity}
                onChange={(value) => onSceneSettingsChange({ ambientIntensity: value })}
              />
            </Form.Item>
          </Col>

          {/* Show Grid */}
          <Col xs={12} sm={6} md={4} lg={3}>
            <Form.Item label="Show grid" className={styles.formItem}>
              <Switch
                checked={sceneSettings.showGrid}
                onChange={(checked) => onSceneSettingsChange({ showGrid: checked })}
              />
            </Form.Item>
          </Col>

          {/* Show Axes */}
          <Col xs={12} sm={6} md={4} lg={3}>
            <Form.Item label="Show axes" className={styles.formItem}>
              <Switch
                checked={sceneSettings.showAxes}
                onChange={(checked) => onSceneSettingsChange({ showAxes: checked })}
              />
            </Form.Item>
          </Col>

          {/* Auto Rotate */}
          <Col xs={12} sm={6} md={4} lg={3}>
            <Form.Item label="Auto rotate" className={styles.formItem}>
              <Switch
                checked={cameraSettings.autoRotate}
                onChange={(checked) => onCameraSettingsChange({ autoRotate: checked })}
              />
            </Form.Item>
          </Col>

          {/* Auto Rotate Speed */}
          {cameraSettings.autoRotate && (
            <Col xs={24} sm={12} md={6} lg={4}>
              <Form.Item label="Rotation speed" className={styles.formItem}>
                <Slider
                  min={0.5}
                  max={10}
                  step={0.5}
                  value={cameraSettings.autoRotateSpeed}
                  onChange={(value) => onCameraSettingsChange({ autoRotateSpeed: value })}
                />
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </div>
  );
};

const useStyles = createStyles(({ token }) => ({
  container: {
    padding: token.paddingSM,
    backgroundColor: token.colorBgContainer,
    borderRadius: token.borderRadius,
    border: `1px solid ${token.colorBorder}`,
  },
  form: {
    width: "100%",
  },
  formItem: {
    marginBottom: 8,
  },
  select: {
    width: "100%",
  },
}));
