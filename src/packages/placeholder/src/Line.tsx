import cx from "classnames";
import Container from "@allaround/container";

import styles from "./style.module.scss";
import { BaseProps } from "../../../utils";
import Props from "./types";

type LineProps = BaseProps<HTMLDivElement> &
  Pick<Props, "animate"> & {
    maxWidth?: string;
  };

const Line = ({ maxWidth, className, ...rest }: LineProps) => {
  return (
    <Container
      className={cx(
        styles.line,
        styles.background,
        {
          [styles.animate]: rest.animate,
        },
        className
      )}
      styles={{ maxWidth }}
      noGrid
      {...rest}
    />
  );
};

export default Line;
