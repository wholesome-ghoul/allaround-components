import { useRef, useEffect, useState } from "react";
import Container from "@allaround/container";
import hooks from "@allaround/hooks";
import Button from "@allaround/button";
import Icons from "@allaround/icons";
import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledVideo from "./StyledVideo";
import { DisplayError } from "../../../utils";

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
  setIsError,
  handleRemove,
  maxDuration = 60 * 15,
  ...rest
}: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<DisplayError>({ text: "", show: false });

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

    if (error.show) {
      videoRef.current.src = "";
    }
  }, [error]);

  useEventListener(
    "loadedmetadata",
    () => {
      if (!videoRef.current) return;

      if (videoRef.current.duration > maxDuration) {
        const text = `Video duration is too long. Max ${maxDuration} seconds.`;
        const show = true;
        setError({ text, show });
      } else {
        setError({ text: "", show: false });
      }
    },
    videoRef
  );

  return (
    <Container
      className={cx(styles.videoContainer)}
      gridPosition={gridPosition}
      noGrid
      flex
    >
      <StyledVideo
        className={cx(
          styles.video,
          {
            [styles.fill]: fill,
            [styles.isError]: error.show,
          },
          styles[`${size}Video`],
          className
        )}
        ref={videoRef}
        {...rest}
        data-cy={dataCy}
        width={width}
        height={height}
        controls
      >
        {children}
      </StyledVideo>

      {setIsError && error.show && (
        <>
          <Container className={cx(styles.errorContainer)} noGrid>
            {error.text}
          </Container>

          <Button
            onClick={handleRemove}
            icon={<Icons.DelIcon size="large" />}
            className={cx(styles.removeButton)}
            tooltip={{
              children: "remove video",
              preferredPosition: "bottom",
            }}
            noBorder
          />
        </>
      )}
    </Container>
  );
};

Video.defaultProps = {
  size: "small",
  dataCy: "video-component",
  width: "100%",
  height: "100%",
};

export default Video;
