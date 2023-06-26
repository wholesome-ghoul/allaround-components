import { useRef, useEffect, useState } from "react";
import Container from "@allaround/container";
import hooks from "@allaround/hooks";
import Button from "@allaround/button";
import Icons from "@allaround/icons";
import Upload from "@allaround/upload";
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
  clickHandler,
  icon,
  iconPosition,
  height,
  className,
  setIsError,
  editable,
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
        const text = `Video is longer than ${maxDuration / 60} minutes`;
        const show = true;
        setError({ text, show });
        setIsError && setIsError(true);
      } else {
        setError({ text: "", show: false });
        setIsError && setIsError(false);
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

      {clickHandler && !editable && (
        <Button
          onClick={clickHandler}
          icon={icon}
          className={cx(styles.iconButton, styles[`${iconPosition}Icon`])}
          noBorder
          transparent
        />
      )}

      {!clickHandler && editable && (
        <Upload
          accept={rest.accept ?? ["video/mp4"]}
          maxSize={rest.maxSize}
          setIsError={rest.uploadSetIsError}
          setFile={rest.setFile ?? (() => {})}
          icon={<Icons.EditIcon size="small" />}
          className={cx(styles.iconButton, styles[`${iconPosition}Icon`])}
          noBorder
        />
      )}

      {setIsError && error.show && (
        <Container className={cx(styles.errorContainer)} noGrid>
          {error.text}
        </Container>
      )}
    </Container>
  );
};

Video.defaultProps = {
  size: "small",
  dataCy: "video-component",
  width: "100%",
  height: "100%",
  icon: <Icons.DelIcon size="large" />,
  iconPosition: "topLeft",
};

export default Video;
