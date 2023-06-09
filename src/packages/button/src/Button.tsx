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
    className,
    ...rest
  } = props;
  const styledProps = { ...gridPosition };

  if (icon) {
    return (
      <StyledButton
        className={cx(
          styles.button,
          styles.icon,
          {
            [styles.fill]: fill,
            [styles.transparent]: transparent,
            [styles.disabled]: disabled,
            [styles.active]: active,
          },
          className
        )}
        onClick={onClick}
        {...styledProps}
        {...rest}
        data-cy={dataCy}
      >
        {icon}
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
        },
        className
      )}
      onClick={onClick}
      {...styledProps}
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
  dataCy: "button-component",
};

export default Button;
