import { Col, Form, InputNumber, Row, Select, Slider, Switch } from "antd";

import { useCompressorStore } from "./compressor.store";
import {
  MIME_TYPE_OPTIONS,
  percentToQuality,
  qualityToPercent,
  RESIZE_OPTIONS,
} from "./compressor-settings.utils";

const PERCENT_FORMATTER = (value?: number): string => `${value ?? 0}%`;

export const CompressorSettings = () => {
  const quality = useCompressorStore((state) => state.quality);
  const mimeType = useCompressorStore((state) => state.mimeType);
  const maxWidth = useCompressorStore((state) => state.maxWidth);
  const maxHeight = useCompressorStore((state) => state.maxHeight);
  const minWidth = useCompressorStore((state) => state.minWidth);
  const minHeight = useCompressorStore((state) => state.minHeight);
  const width = useCompressorStore((state) => state.width);
  const height = useCompressorStore((state) => state.height);
  const resize = useCompressorStore((state) => state.resize);
  const convertSize = useCompressorStore((state) => state.convertSize);
  const checkOrientation = useCompressorStore((state) => state.checkOrientation);

  const setQuality = useCompressorStore((state) => state.setQuality);
  const setMimeType = useCompressorStore((state) => state.setMimeType);
  const setMaxWidth = useCompressorStore((state) => state.setMaxWidth);
  const setMaxHeight = useCompressorStore((state) => state.setMaxHeight);
  const setMinWidth = useCompressorStore((state) => state.setMinWidth);
  const setMinHeight = useCompressorStore((state) => state.setMinHeight);
  const setWidth = useCompressorStore((state) => state.setWidth);
  const setHeight = useCompressorStore((state) => state.setHeight);
  const setResize = useCompressorStore((state) => state.setResize);
  const setConvertSize = useCompressorStore((state) => state.setConvertSize);
  const setCheckOrientation = useCompressorStore((state) => state.setCheckOrientation);

  const handleQualityChange = (percent: number): void => {
    setQuality(percentToQuality(percent));
  };

  const handleNumberChange = (setter: (value: number) => void) => (value: number | null): void => {
    setter(value ?? 0);
  };

  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col xs={24} md={12}>
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
        <Col xs={24} md={12}>
          <Form.Item label="MIME type">
            <Select value={mimeType} onChange={setMimeType} options={[...MIME_TYPE_OPTIONS]} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Max width">
            <InputNumber min={0} value={maxWidth} onChange={handleNumberChange(setMaxWidth)} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Max height">
            <InputNumber
              min={0}
              value={maxHeight}
              onChange={handleNumberChange(setMaxHeight)}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Min width">
            <InputNumber min={0} value={minWidth} onChange={handleNumberChange(setMinWidth)} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Min height">
            <InputNumber
              min={0}
              value={minHeight}
              onChange={handleNumberChange(setMinHeight)}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Width (exact)">
            <InputNumber min={0} value={width} onChange={handleNumberChange(setWidth)} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Height (exact)">
            <InputNumber min={0} value={height} onChange={handleNumberChange(setHeight)} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Resize strategy">
            <Select value={resize} onChange={setResize} options={[...RESIZE_OPTIONS]} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Convert size threshold (bytes)">
            <InputNumber
              min={0}
              value={convertSize}
              onChange={handleNumberChange(setConvertSize)}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Check EXIF orientation">
            <Switch checked={checkOrientation} onChange={setCheckOrientation} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
