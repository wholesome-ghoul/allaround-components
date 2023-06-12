import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledButton from "./StyledButton";

const Button = (props: Props) => {
  const {
    children,
    size,
    gridPosition,
    onClick,
    icon,
    transparent,
    disabled,
    active,
    fill,
    dataCy,
    noBorder,
    innerRef,
    className,
    ...rest
  } = props;
  if (icon) {
    return (
      <StyledButton
        className={cx(
          styles.button,
          styles.iconButton,
          {
            [styles.icon]: !!children,
            [styles.fill]: fill,
            [styles.transparent]: transparent,
            [styles.disabled]: disabled,
            [styles.active]: active,
            [styles.noBorder]: noBorder,
          },
          className
        )}
        onClick={onClick}
        gridPosition={gridPosition}
        ref={innerRef}
        {...rest}
        data-cy={dataCy}
      >
        {icon}
        {children}
      </StyledButton>
    );
  }

  return (
    <StyledButton
      className={cx(
        styles.button,
        styles[`${size}Button`],
        {
          [styles.fill]: fill,
          [styles.transparent]: transparent,
          [styles.disabled]: disabled,
          [styles.active]: active,
          [styles.noBorder]: noBorder,
        },
        className
      )}
      onClick={onClick}
      gridPosition={gridPosition}
      ref={innerRef}
      {...rest}
      data-cy={dataCy}
    >
      {children}
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
