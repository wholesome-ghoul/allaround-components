import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledInput from "./StyledInput";

const Input = ({
  type,
  value,
  onChange,
  size,
  gridPosition,
  placeholder,
  fill,
  isError,
  minWidth,
  dataCy,
  className,
  ...rest
}: Props) => {
  const styledProps = { ...gridPosition, minWidth };

  return (
    <StyledInput
      className={cx(
        styles.input,
        {
          [styles.fill]: fill,
          [styles.isError]: isError,
        },
        styles[`${size}Input`],
        className
      )}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      {...styledProps}
      {...rest}
      data-cy={dataCy}
    />
  );
};

Input.defaultProps = {
  size: "small",
  type: "text",
  dataCy: "input-component",
  minWidth: "auto",
};

export default Input;
