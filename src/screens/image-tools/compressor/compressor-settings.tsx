import { SettingOutlined } from "@ant-design/icons";
import { Col, Collapse, Form, InputNumber, Row, Select, Slider, Switch } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";
import { smallSizeOnMobile } from "~/utils/responsive.utils";

import {
  useCompressorCheckOrientation,
  useCompressorConvertSize,
  useCompressorHeight,
  useCompressorMaxHeight,
  useCompressorMaxWidth,
  useCompressorMimeType,
  useCompressorMinHeight,
  useCompressorMinWidth,
  useCompressorQuality,
  useCompressorResize,
  useCompressorShowCompressionSettings,
  useCompressorWidth,
  useSetCompressorCheckOrientation,
  useSetCompressorConvertSize,
  useSetCompressorHeight,
  useSetCompressorMaxHeight,
  useSetCompressorMaxWidth,
  useSetCompressorMimeType,
  useSetCompressorMinHeight,
  useSetCompressorMinWidth,
  useSetCompressorQuality,
  useSetCompressorResize,
  useSetCompressorShowCompressionSettings,
  useSetCompressorWidth,
} from "./compressor.store";
import { MIME_TYPE_OPTIONS, percentToQuality, qualityToPercent, RESIZE_OPTIONS } from "./compressor-settings.utils";

const PERCENT_FORMATTER = (value?: number): string => `${value ?? 0}%`;

const COLLAPSE_KEY = "compression-settings";

export const CompressorSettings = () => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();

  const quality = useCompressorQuality();
  const mimeType = useCompressorMimeType();
  const maxWidth = useCompressorMaxWidth();
  const maxHeight = useCompressorMaxHeight();
  const minWidth = useCompressorMinWidth();
  const minHeight = useCompressorMinHeight();
  const width = useCompressorWidth();
  const height = useCompressorHeight();
  const resize = useCompressorResize();
  const convertSize = useCompressorConvertSize();
  const checkOrientation = useCompressorCheckOrientation();
  const showCompressionSettings = useCompressorShowCompressionSettings();

  const setQuality = useSetCompressorQuality();
  const setMimeType = useSetCompressorMimeType();
  const setMaxWidth = useSetCompressorMaxWidth();
  const setMaxHeight = useSetCompressorMaxHeight();
  const setMinWidth = useSetCompressorMinWidth();
  const setMinHeight = useSetCompressorMinHeight();
  const setWidth = useSetCompressorWidth();
  const setHeight = useSetCompressorHeight();
  const setResize = useSetCompressorResize();
  const setConvertSize = useSetCompressorConvertSize();
  const setCheckOrientation = useSetCompressorCheckOrientation();
  const setShowCompressionSettings = useSetCompressorShowCompressionSettings();

  const handleQualityChange = (percent: number): void => {
    setQuality(percentToQuality(percent));
  };

  const handleNumberChange =
    (setter: (value: number) => void) =>
    (value: number | null): void => {
      setter(value ?? 0);
    };

  const collapseItems = [
    {
      key: COLLAPSE_KEY,
      label: (
        <span className={styles.collapseLabel}>
          <SettingOutlined /> Compression Settings
        </span>
      ),
      children: (
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
                <InputNumber
                  min={0}
                  value={maxWidth}
                  onChange={handleNumberChange(setMaxWidth)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={8} md={4}>
              <Form.Item label="Max height">
                <InputNumber
                  min={0}
                  value={maxHeight}
                  onChange={handleNumberChange(setMaxHeight)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={8} md={4}>
              <Form.Item label="Min width">
                <InputNumber
                  min={0}
                  value={minWidth}
                  onChange={handleNumberChange(setMinWidth)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={8} md={4}>
              <Form.Item label="Min height">
                <InputNumber
                  min={0}
                  value={minHeight}
                  onChange={handleNumberChange(setMinHeight)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={8} md={4}>
              <Form.Item label="Width (exact)">
                <InputNumber min={0} value={width} onChange={handleNumberChange(setWidth)} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={8} md={4}>
              <Form.Item label="Height (exact)">
                <InputNumber
                  min={0}
                  value={height}
                  onChange={handleNumberChange(setHeight)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={8} md={4}>
              <Form.Item label="Resize strategy">
                <Select value={resize} onChange={setResize} options={[...RESIZE_OPTIONS]} />
              </Form.Item>
            </Col>
            <Col xs={8} md={4}>
              <Form.Item label="Convert size threshold (bytes)">
                <InputNumber
                  min={0}
                  value={convertSize}
                  onChange={handleNumberChange(setConvertSize)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={8} md={4}>
              <Form.Item label="Check EXIF orientation">
                <Switch checked={checkOrientation} onChange={setCheckOrientation} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
  ];

  return (
    <Collapse
      items={collapseItems}
      activeKey={showCompressionSettings ? [COLLAPSE_KEY] : []}
      onChange={(keys) => setShowCompressionSettings(keys.includes(COLLAPSE_KEY))}
      size={smallSizeOnMobile(isMobile)}
      className={styles.collapse}
    />
  );
};

const useStyles = createStyles(() => ({
  collapse: {
    width: "100%",
  },
  collapseLabel: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  form: {
    width: "100%",
  },
}));
