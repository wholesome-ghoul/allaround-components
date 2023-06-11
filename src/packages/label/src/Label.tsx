import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledLabel from "./StyledLabel";

const Label = ({
  children,
  size,
  gridPosition,
  fill,
  innerRef,
  dataCy,
  className,
  htmlFor,
  ...rest
}: Props) => {
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
      gridPosition={gridPosition}
      ref={innerRef}
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
