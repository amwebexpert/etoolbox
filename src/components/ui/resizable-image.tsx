import { createStyles } from "antd-style";
import { Resizable } from "re-resizable";
import type { ComponentRef, MouseEvent, ReactNode, Ref } from "react";

import { useResponsive } from "~/hooks/use-responsive";

interface ResizableImageProps {
  src: string;
  alt: string;
  imageClassName?: string;
  imageRef?: Ref<ComponentRef<"img">>;
  onImageClick?: (event: MouseEvent<HTMLImageElement>) => void;
  footer?: ReactNode;
  bordered?: boolean;
}

export const ResizableImage = ({
  src,
  alt,
  imageClassName,
  imageRef,
  onImageClick,
  footer,
  bordered = false,
}: ResizableImageProps) => {
  const { styles, cx } = useStyles();
  const { isMobile } = useResponsive();

  const defaultWidth = isMobile ? 280 : 400;

  return (
    <div className={styles.wrapper}>
      <Resizable
        defaultSize={{ width: defaultWidth, height: "auto" }}
        minWidth={150}
        maxWidth="100%"
        lockAspectRatio
        enable={{
          top: false,
          right: true,
          bottom: true,
          left: false,
          topRight: false,
          bottomRight: true,
          bottomLeft: false,
          topLeft: false,
        }}
        handleStyles={{
          right: { cursor: "ew-resize" },
          bottom: { cursor: "ns-resize" },
          bottomRight: { cursor: "nwse-resize" },
        }}
        className={cx(styles.resizable, bordered && styles.resizableBordered)}
      >
        <img ref={imageRef} src={src} alt={alt} className={cx(styles.image, imageClassName)} onClick={onImageClick} />
      </Resizable>
      {footer}
    </div>
  );
};

const useStyles = createStyles(({ token }) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
  },
  resizable: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  resizableBordered: {
    border: `2px solid ${token.colorPrimary}`,
    borderRadius: token.borderRadius,
    padding: 4,
    backgroundColor: token.colorBgContainer,
  },
  image: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    borderRadius: token.borderRadiusSM,
    display: "block",
  },
}));
