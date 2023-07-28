import cx from "classnames";
import Container from "@allaround/container";

import styles from "./style.module.scss";
import { BaseProps } from "../../../utils";

type Props = BaseProps<HTMLDivElement> & {
  maxWidth?: string;
};

const Line = ({ maxWidth, className, ...rest }: Props) => {
  return (
    <Container
      className={cx(styles.line, styles.background, className)}
      styles={{ maxWidth }}
      noGrid
      {...rest}
    />
  );
};

export default Line;
