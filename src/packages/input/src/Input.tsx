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
  dataCy,
  className,
  ...rest
}: Props) => {
  const styledProps = { ...gridPosition };

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
};

export default Input;
