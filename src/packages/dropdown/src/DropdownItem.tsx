import cx from "classnames";
import Container from "@allaround/container";

import styles from "./style.module.scss";

import type { DropdownItemProps } from "./types";

const DropdownItem = ({
  children,
  padded,
  margined,
  activeIndicator,
  icon,
  ...rest
}: DropdownItemProps) => {
  return (
    <Container
      className={cx(styles.item, {
        [styles.itemPadding]: padded,
        [styles.itemMargin]: margined,
      })}
      noGrid
      {...rest}
    >
      {activeIndicator && icon}
      {children}
    </Container>
  );
};

export default DropdownItem;
