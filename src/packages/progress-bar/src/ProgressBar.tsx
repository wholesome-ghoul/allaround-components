import { useEffect } from "react";
import cx from "classnames";
import Container from "@allaround/container";
import Label from "@allaround/label";

import Props from "./types";
import styles from "./style.module.scss";
import StyledProgressBar from "./StyledProgressBar";

const ProgressBar = ({
  children,
  size,
  gridPosition,
  fill,
  dataCy,
  innerRef,
  progress,
  maxProgress,
  onProgressComplete,
  className,
  ...rest
}: Props) => {
  useEffect(() => {
    if (progress === maxProgress) {
      onProgressComplete && onProgressComplete();
    }
  }, [progress, maxProgress]);

  return (
    <Container className={cx(styles.progressBarContainer)} noGrid>
      <Label className={cx(styles.progressText)} size="large">
        {progress} %
      </Label>
      <Container className={cx(styles.progressBarWrapper)} noGrid>
        <StyledProgressBar
          className={cx(
            styles.progressBar,
            {
              [styles.fill]: fill,
            },
            styles[`${size}ProgressBar`],
            className
          )}
          ref={innerRef}
          gridPosition={gridPosition}
          styles={{
            width: `${progress}%`,
          }}
          {...rest}
          data-cy={dataCy}
        />
      </Container>
    </Container>
  );
};

ProgressBar.defaultProps = {
  size: "small",
  dataCy: "progress-bar-component",
};

export default ProgressBar;
