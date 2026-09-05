import { Col, Form, InputNumber, Row, Select, Slider, Switch } from "antd";

import type { CompressorResizeMode } from "./compressor.types";
import { useStyles } from "./compressor-settings.styles";
import { MIME_TYPE_OPTIONS, percentToQuality, qualityToPercent, RESIZE_OPTIONS } from "./compressor-settings.utils";

const PERCENT_FORMATTER = (value?: number): string => `${value ?? 0}%`;

interface CompressorSettingsFieldsProps {
  quality: number;
  mimeType: string;
  maxWidth: number;
  maxHeight: number;
  minWidth: number;
  minHeight: number;
  width: number;
  height: number;
  resize: CompressorResizeMode;
  convertSize: number;
  checkOrientation: boolean;
  setQuality: (quality: number) => void;
  setMimeType: (mimeType: string) => void;
  setMaxWidth: (value: number | null) => void;
  setMaxHeight: (value: number | null) => void;
  setMinWidth: (value: number | null) => void;
  setMinHeight: (value: number | null) => void;
  setWidth: (value: number | null) => void;
  setHeight: (value: number | null) => void;
  setResize: (resize: CompressorResizeMode) => void;
  setConvertSize: (value: number | null) => void;
  setCheckOrientation: (checked: boolean) => void;
}

export const CompressorSettingsFields = ({
  quality,
  mimeType,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  width,
  height,
  resize,
  convertSize,
  checkOrientation,
  setQuality,
  setMimeType,
  setMaxWidth,
  setMaxHeight,
  setMinWidth,
  setMinHeight,
  setWidth,
  setHeight,
  setResize,
  setConvertSize,
  setCheckOrientation,
}: CompressorSettingsFieldsProps) => {
  const { styles } = useStyles();

  const handleQualityChange = (percent: number): void => {
    setQuality(percentToQuality(percent));
  };

  return (
    <Form layout="vertical" className={styles.form}>
      <Row gutter={16}>
        <Col xs={8} md={4}>
          <Form.Item label={`Quality (${qualityToPercent(quality)}%)`}>
            <Slider
              min={0}
              max={100}
              step={1}
              value={qualityToPercent(quality)}
              onChange={handleQualityChange}
              tooltip={{ formatter: PERCENT_FORMATTER }}
            />
          </Form.Item>
        </Col>
        <Col xs={8} md={4}>
          <Form.Item label="MIME type">
            <Select value={mimeType} onChange={setMimeType} options={[...MIME_TYPE_OPTIONS]} />
          </Form.Item>
        </Col>
        <Col xs={8} md={4}>
          <Form.Item label="Max width">
            <InputNumber min={0} value={maxWidth} onChange={setMaxWidth} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={8} md={4}>
          <Form.Item label="Max height">
            <InputNumber min={0} value={maxHeight} onChange={setMaxHeight} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={8} md={4}>
          <Form.Item label="Min width">
            <InputNumber min={0} value={minWidth} onChange={setMinWidth} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={8} md={4}>
          <Form.Item label="Min height">
            <InputNumber min={0} value={minHeight} onChange={setMinHeight} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={8} md={4}>
          <Form.Item label="Width (exact)">
            <InputNumber min={0} value={width} onChange={setWidth} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={8} md={4}>
          <Form.Item label="Height (exact)">
            <InputNumber min={0} value={height} onChange={setHeight} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={8} md={4}>
          <Form.Item label="Resize strategy">
            <Select value={resize} onChange={setResize} options={[...RESIZE_OPTIONS]} />
          </Form.Item>
        </Col>
        <Col xs={8} md={4}>
          <Form.Item label="Convert size threshold (bytes)">
            <InputNumber min={0} value={convertSize} onChange={setConvertSize} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={8} md={4}>
          <Form.Item label="Check EXIF orientation">
            <Switch checked={checkOrientation} onChange={setCheckOrientation} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
