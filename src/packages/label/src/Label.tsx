import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledLabel from "./StyledLabel";

const Label = ({
  children,
  size,
  gridPosition,
  fill,
  className,
  htmlFor,
}: Props) => {
  const styledProps = { ...gridPosition };

  return (
    <StyledLabel
      className={cx(
        styles.label,
        {
          [styles.fill]: fill,
        },
        styles[`${size}Label`],
        className
      )}
      htmlFor={htmlFor}
      {...styledProps}
      data-cy="label-component"
    >
      {children}
    </StyledLabel>
  );
};

Label.defaultProps = {
  size: "small",
};

export default Label;
