import cx from "classnames";
import Container, { ContainerProps } from "@allaround/container";

import styles from "./style.module.scss";
import { BaseProps } from "../../../utils";

type Props = BaseProps<HTMLDivElement> &
  ContainerProps & {
    children: React.ReactNode;
    maxWidth?: string;
    direction: "rows" | "columns";
    alignItems?: "flex-start";
    noMargin?: boolean;
    noCenter?: boolean;
  };

const Group = ({
  maxWidth,
  children,
  direction,
  alignItems,
  noMargin,
  noCenter,
  ...rest
}: Props) => {
  return (
    <Container
      className={cx(styles.group, styles[direction], {
        [styles.groupMargin]: !noMargin,
        [styles.groupNoCenter]: noCenter,
      })}
      styles={{ maxWidth, alignItems }}
      noGrid
      flex
      {...rest}
    >
      {children}
    </Container>
  );
};

Group.defaultProps = {
  direction: "row",
};

export default Group;
