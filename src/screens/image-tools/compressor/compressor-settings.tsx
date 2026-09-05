import { SettingOutlined } from "@ant-design/icons";
import { Collapse } from "antd";

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
import { useStyles } from "./compressor-settings.styles";
import { CompressorSettingsFields } from "./compressor-settings-fields";

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

  const collapseItems = [
    {
      key: COLLAPSE_KEY,
      label: (
        <span className={styles.collapseLabel}>
          <SettingOutlined /> Compression Settings
        </span>
      ),
      children: (
        <CompressorSettingsFields
          quality={quality}
          mimeType={mimeType}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          minWidth={minWidth}
          minHeight={minHeight}
          width={width}
          height={height}
          resize={resize}
          convertSize={convertSize}
          checkOrientation={checkOrientation}
          setQuality={setQuality}
          setMimeType={setMimeType}
          setMaxWidth={setMaxWidth}
          setMaxHeight={setMaxHeight}
          setMinWidth={setMinWidth}
          setMinHeight={setMinHeight}
          setWidth={setWidth}
          setHeight={setHeight}
          setResize={setResize}
          setConvertSize={setConvertSize}
          setCheckOrientation={setCheckOrientation}
        />
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
