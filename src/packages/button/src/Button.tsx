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
  className,
}: Props) => {
  const styledProps = { ...gridPosition };

  if (icon) {
    return (
      <StyledButton
        className={cx(
          styles.button,
          styles.icon,
          {
            [styles.transparent]: transparent,
            [styles.disabled]: disabled,
            [styles.active]: active,
          },
          className
        )}
        onClick={onClick}
        {...styledProps}
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
          [styles.transparent]: transparent,
          [styles.disabled]: disabled,
          [styles.active]: active,
        },
        className
      )}
      onClick={onClick}
      {...styledProps}
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
