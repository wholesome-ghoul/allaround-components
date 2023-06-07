import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledLabel from "./StyledLabel";

const Label = ({
  children,
  size,
  gridPosition,
  fill,
  dataCy,
  className,
  htmlFor,
  ...rest
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
      {...rest}
      data-cy={dataCy}
    >
      {children}
    </StyledLabel>
  );
};

Label.defaultProps = {
  size: "small",
  dataCy: "label-component",
};

export default Label;
