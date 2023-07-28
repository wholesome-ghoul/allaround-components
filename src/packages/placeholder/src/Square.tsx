import cx from "classnames";
import Container from "@allaround/container";

import styles from "./style.module.scss";
import { BaseProps } from "../../../utils";

type Props = BaseProps<HTMLDivElement> & {
  maxWidth?: string;
  maxHeight?: string;
  size?: string;
  noMargin?: boolean;
};

const Square = ({
  size,
  noMargin,
  maxWidth,
  maxHeight,
  className,
  ...rest
}: Props) => {
  return (
    <Container
      className={cx(
        styles.square,
        styles.background,
        {
          [styles.squareMargin]: !noMargin,
        },
        className
      )}
      styles={{
        maxWidth,
        maxHeight,
        width: size,
        height: size,
      }}
      noGrid
      {...rest}
    />
  );
};

export default Square;
export type { Props as SquareProps };
