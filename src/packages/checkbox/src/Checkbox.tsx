import cx from "classnames";
import Label from "@allaround/label";
import Container from "@allaround/container";
import Tooltip from "@allaround/tooltip";
import { useEffect, useId, useRef, useState } from "react";

import Props from "./types";
import styles from "./style.module.scss";
import StyledCheckbox from "./StyledCheckbox";

const Checkbox = ({
  children,
  size,
  gridPosition,
  fill,
  dataCy,
  innerRef,
  checked,
  color,
  shape,
  className,
  text,
  iconPosition,
  tooltip,
  ...rest
}: Props) => {
  const id = useId();
  const iconIsOnRight = iconPosition === "right";
  const labelRef = useRef<HTMLLabelElement>(null);

  return (
    <Container
      className={cx(
        styles.checkboxContainer,
        {
          [styles.fill]: fill,
          [styles.checked]: checked,
          [styles[`${color}Checked`]]: checked,
          [styles.iconOnRight]: iconIsOnRight,
          [styles.iconOnLeft]: !iconIsOnRight,
        },
        styles[`${size}Checkbox`],
        styles[`${shape}Checkbox`]
      )}
      styles={rest.styles}
      flex
      noGrid
    >
      <Label htmlFor={id} innerRef={labelRef}>
        {text}
      </Label>
      <StyledCheckbox
        className={cx(styles.checkbox, className)}
        type="checkbox"
        innerRef={innerRef}
        gridPosition={gridPosition}
        id={id}
        {...rest}
        data-cy={dataCy}
      />

      {tooltip && (
        <Tooltip {...tooltip} componentRef={labelRef}>
          {tooltip.children}
        </Tooltip>
      )}
    </Container>
  );
};

Checkbox.defaultProps = {
  size: "small",
  dataCy: "checkbox-component",
  shape: "square",
  iconPosition: "left",
  color: "green",
};

export default Checkbox;
