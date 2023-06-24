import { useEffect, useRef, useState } from "react";
import cx from "classnames";
import hooks from "@allaround/hooks";

import type { Props, Position } from "./types";
import styles from "./style.module.scss";
import StyledTooltip from "./StyledTooltip";
import { createPortal } from "react-dom";

const { useEventListener } = hooks;

type Direction = Pick<Props, "preferredPosition">["preferredPosition"];

const Tooltip = <Elem extends HTMLElement>({
  children,
  size,
  gridPosition,
  fill,
  dataCy,
  componentRef,
  preferredPosition,
  className,
  ...rest
}: Props<Elem>) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [direction, setDirection] = useState<Direction>(preferredPosition);
  const innerRef = useRef<HTMLDivElement>(null);

  useEventListener(
    "mouseover",
    (e) => {
      if (visible) return;

      if (
        innerRef.current &&
        componentRef?.current &&
        componentRef?.current === (e.target as Node)
      ) {
        const { top, left, width, height } =
          componentRef.current.getBoundingClientRect();

        const tooltipRect = innerRef.current?.getBoundingClientRect();

        const relativePosition = {
          x: Math.floor(tooltipRect.left),
          y: Math.floor(tooltipRect.top),
        };

        let x = Math.floor(left - relativePosition.x);
        let y = Math.floor(top - relativePosition.y);

        const margin = 18;

        /* Potential new coordinates for tooltip */
        const newPosition = {
          top: {
            x: x - tooltipRect.width / 2 + width / 2,
            y: y - tooltipRect.height - margin,
          },
          left: {
            x: x - tooltipRect.width - margin,
            y: y - (tooltipRect.height - height) / 2,
          },
          right: {
            x: x + width + margin,
            y: y - (tooltipRect.height - height) / 2,
          },
          bottom: {
            x: x - (tooltipRect.width - width) / 2,
            y: y + height + margin,
          },
        };

        const canBeRight = left + width + margin > tooltipRect.width;
        const canBeLeft = left - margin > tooltipRect.width;
        const canBeBottom = top + height + margin > tooltipRect.height;
        const canBeTop = top - margin > tooltipRect.height;

        const canBe: { [key in Direction]: boolean } = {
          top: canBeTop,
          left: canBeLeft,
          right: canBeRight,
          bottom: canBeBottom,
        };

        if (canBe[direction]) {
          x = Math.floor(newPosition[direction].x);
          y = Math.floor(newPosition[direction].y);
        } else {
          for (const key in canBe) {
            if (canBe[key as Direction]) {
              x = Math.floor(newPosition[key as Direction].x);
              y = Math.floor(newPosition[key as Direction].y);

              setDirection(key as Direction);
              break;
            }
          }
        }

        setPosition({ x, y });

        setVisible(true);
      }
    },
    componentRef
  );

  useEventListener(
    "mouseleave",
    (e) => {
      if (!visible) return;

      if (
        componentRef?.current &&
        componentRef?.current === (e.target as Node)
      ) {
        setPosition({ x: 0, y: 0 });
        setVisible(false);
      }
    },
    componentRef
  );

  useEffect(() => {
    if (visible) {
      const timeoutId = setTimeout(() => {
        setPosition({ x: 0, y: 0 });
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [visible]);

  return createPortal(
    <StyledTooltip
      className={cx(
        styles.tooltip,
        {
          [styles.fill]: fill,
        },
        styles[`${size}Tooltip`],
        className
      )}
      gridPosition={gridPosition}
      position={position}
      {...rest}
      data-cy={dataCy}
    >
      <div
        className={cx(styles.tooltipText, styles[direction], {
          [styles.visible]: visible,
        })}
        ref={innerRef}
      >
        {children}
      </div>
    </StyledTooltip>,
    document.body
  );
};

Tooltip.defaultProps = {
  size: "small",
  dataCy: "tooltip-component",
  preferredPosition: "bottom",
};

export default Tooltip;
