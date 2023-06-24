import cx from "classnames";
import { useRef, useEffect } from "react";
import Container from "@allaround/container";
import Tooltip from "@allaround/tooltip";

import styles from "./style.module.scss";

import type { DropdownItemProps } from "./types";

const DropdownItem = ({
  children,
  padded,
  margined,
  activeIndicator,
  icon,
  tooltip,
  ...rest
}: DropdownItemProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<any>(null);

  useEffect(() => {
    ref.current = containerRef.current;
  }, [tooltip])

  return (
    <Container
      className={cx(styles.item, {
        [styles.itemPadding]: padded,
        [styles.itemMargin]: margined,
      })}
      innerRef={ref}
      noGrid
      {...rest}
    >
      {activeIndicator && icon}
      {children}

      {tooltip && (
        <Tooltip {...tooltip} componentRef={ref}>
          {tooltip.children}
        </Tooltip>
      )}
    </Container>
  );
};

export default DropdownItem;
