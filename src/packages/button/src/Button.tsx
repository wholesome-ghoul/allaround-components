import cx from "classnames";
import { useRef } from "react";
import Tooltip from "@allaround/tooltip";

import Props from "./types";
import styles from "./style.module.scss";
import StyledButton from "./StyledButton";

const Button = (props: Props) => {
  const {
    children,
    variant,
    size,
    gridPosition,
    onClick,
    icon,
    transparent,
    hoverTransparent,
    disabled,
    active,
    fill,
    dataCy,
    noBorder,
    className,
    tooltip,
    ...rest
  } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);

  if (icon) {
    return (
      <StyledButton
        className={cx(
          styles.button,
          styles[`${variant}Variant`],
          styles.iconButton,
          {
            [styles.icon]: !!children,
            [styles.fill]: fill,
            [styles.transparent]: transparent,
            [styles.hoverTransparent]: hoverTransparent,
            [styles.disabled]: disabled,
            [styles.active]: active,
            [styles.noBorder]: noBorder,
          },
          className
        )}
        onClick={disabled ? () => {} : onClick}
        gridPosition={gridPosition}
        ref={buttonRef}
        {...rest}
        data-cy={dataCy}
      >
        {icon}
        {children}

        {!disabled && tooltip && (
          <Tooltip {...tooltip} componentRef={buttonRef}>
            {tooltip.children}
          </Tooltip>
        )}
      </StyledButton>
    );
  }

  return (
    <StyledButton
      className={cx(
        styles.button,
        styles[`${size}Button`],
        styles[`${variant}Variant`],
        {
          [styles.fill]: fill,
          [styles.transparent]: transparent,
          [styles.hoverTransparent]: hoverTransparent,
          [styles.disabled]: disabled,
          [styles.active]: active,
          [styles.noBorder]: noBorder,
        },
        className
      )}
      onClick={disabled ? () => {} : onClick}
      gridPosition={gridPosition}
      ref={buttonRef}
      {...rest}
      data-cy={dataCy}
    >
      {children}

      {!disabled && tooltip && (
        <Tooltip {...tooltip} componentRef={buttonRef}>
          {tooltip.children}
        </Tooltip>
      )}
    </StyledButton>
  );
};

Button.defaultProps = {
  size: "small",
  transparent: false,
  disabled: false,
  active: false,
  noBorder: false,
  dataCy: "button-component",
};

export default Button;
