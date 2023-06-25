import { useRef, useEffect } from "react";
import cx from "classnames";
import hooks from "@allaround/hooks";

import Props from "./types";
import styles from "./style.module.scss";
import StyledVideo from "./StyledVideo";

const { useEventListener } = hooks;

const Video = ({
  children,
  size,
  gridPosition,
  fill,
  dataCy,
  file,
  innerRef,
  width,
  height,
  className,
  handleError,
  isError,
  maxDuration = 60 * 15,
  ...rest
}: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        videoRef.current!.src = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    }
  }, [file]);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isError) {
      videoRef.current.src = "";
    }
  }, [isError]);

  useEventListener(
    "loadedmetadata",
    () => {
      if (!videoRef.current) return;

      if (videoRef.current.duration > maxDuration) {
        const text = `Video duration is too long. Max duration is ${maxDuration} seconds.`;
        const show = true;
        handleError({ text, show });
      }
    },
    videoRef
  );

  return (
    <StyledVideo
      className={cx(
        styles.video,
        {
          [styles.fill]: fill,
          [styles.isError]: isError,
        },
        styles[`${size}Video`],
        className
      )}
      ref={videoRef}
      gridPosition={gridPosition}
      {...rest}
      data-cy={dataCy}
      width={width}
      height={height}
      controls
    >
      {children}
    </StyledVideo>
  );
};

Video.defaultProps = {
  size: "small",
  dataCy: "video-component",
  width: "100%",
  height: "100%",
};

export default Video;
