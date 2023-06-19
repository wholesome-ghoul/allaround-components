import { useRef, useEffect } from "react";
import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledVideo from "./StyledVideo";

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

  return (
    <StyledVideo
      className={cx(
        styles.video,
        {
          [styles.fill]: fill,
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
