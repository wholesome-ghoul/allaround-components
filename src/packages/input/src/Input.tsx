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
  className,
}: Props) => {
  const styledProps = { ...gridPosition };

  return (
    <StyledInput
      className={cx(styles.input, styles[`${size}Input`], className)}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      {...styledProps}
      data-cy="input-component"
    />
  );
};

Input.defaultProps = {
  size: "small",
  type: "text",
};

export default Input;
