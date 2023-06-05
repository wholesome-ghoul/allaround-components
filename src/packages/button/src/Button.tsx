import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledButton from "./StyledButton";

const Button = ({
  children,
  size,
  gridPosition,
  onClick,
  icon,
  transparent,
  disabled,
  active,
  fill,
  className,
  ...rest
}: Props) => {
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
        data-cy="button-component"
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
      data-cy="button-component"
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
};

export default Button;
