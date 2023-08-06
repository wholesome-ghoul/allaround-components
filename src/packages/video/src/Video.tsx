import {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import Container from "@allaround/container";
import hooks from "@allaround/hooks";
import Button from "@allaround/button";
import Icons from "@allaround/icons";
import Upload from "@allaround/upload";
import ProgressBar from "@allaround/progress-bar";
import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledVideo from "./StyledVideo";
import { DisplayError } from "../../../utils";

const { useEventListener } = hooks;

const Video = forwardRef(
  (
    {
      children,
      gridPosition,
      fill,
      src,
      innerRef,
      clickHandler,
      className,
      setIsError,
      editable,
      maxDuration = 60 * 15,
      size = "small",
      dataCy = "video-component",
      width = "100%",
      height = "100%",
      icon = <Icons.DelIcon size="large" />,
      iconPosition = "topLeft",
      preload = "metadata",
      currentProgress = 100,
      maxProgress = 100,
      onLoadedMetadata,
      ...rest
    }: Props,
    ref: React.Ref<HTMLVideoElement>
  ) => {
    const [_src, _setSrc] = useState("");
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<DisplayError>({ text: "", show: false });
    useImperativeHandle(ref, () => {
      return videoRef.current as HTMLVideoElement;
    });

    useEffect(() => {
      if (!src) return;

      if (typeof src === "string") _setSrc(src);
      else if (src instanceof File) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const buffer = e.target?.result as ArrayBuffer;
          const blob = new Blob([buffer], { type: src.type });
          const url = URL.createObjectURL(blob);
          _setSrc(url);
        };

        reader.readAsArrayBuffer(src);
      }
    }, [src]);

    useEffect(() => {
      if (error.show) {
        _setSrc("");
      }
    }, [error]);

    useEventListener(
      "loadedmetadata",
      () => {
        if (!videoRef.current) return;

        if (maxDuration && videoRef.current.duration > maxDuration) {
          const text = `Video is longer than ${maxDuration / 60} minutes`;
          const show = true;
          setError({ text, show });
          setIsError && setIsError(true);
        } else {
          setError({ text: "", show: false });
          setIsError && setIsError(false);

          onLoadedMetadata && onLoadedMetadata();
        }
      },
      videoRef
    );

    return (
      <>
        <Container
          className={cx(styles.videoContainer, {
            [styles.none]: currentProgress < 100 && !error.show,
          })}
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
            src={_src}
            preload={preload}
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

        {!error.show && currentProgress < 100 && (
          <ProgressBar progress={currentProgress} maxProgress={maxProgress} />
        )}
      </>
    );
  }
);

// Video.defaultProps = {
//   size: "small",
//   dataCy: "video-component",
//   width: "100%",
//   height: "100%",
//   icon: <Icons.DelIcon size="large" />,
//   iconPosition: "topLeft",
//   preload: "metadata",
//   currentProgress: 100,
//   maxProgress: 100,
// };

export default Video;
