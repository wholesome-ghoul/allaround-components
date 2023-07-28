import cx from "classnames";
import Container from "@allaround/container";

import styles from "./style.module.scss";
import { BaseProps } from "../../../utils";

type Props = BaseProps<HTMLDivElement> & {
  radius?: string;
};

const Circle = ({ radius, ...rest }: Props) => {
  return (
    <Container
      className={cx(styles.circle, styles.background)}
      styles={{ width: radius, height: radius }}
      noGrid
      {...rest}
    />
  );
};

export default Circle;
