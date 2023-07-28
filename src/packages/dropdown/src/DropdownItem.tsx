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
  borders,
  ...rest
}: DropdownItemProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<any>(null);

  useEffect(() => {
    ref.current = containerRef.current;
  }, [tooltip]);

  return (
    <Container
      className={cx(styles.item, {
        [styles.itemPadding]: padded,
        [styles.itemMargin]: margined,
        [styles.itemBorderTop]: borders?.top,
        [styles.itemBorderBottom]: borders?.bottom,
        [styles.itemBorderLeft]: borders?.left,
        [styles.itemBorderRight]: borders?.right,
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
