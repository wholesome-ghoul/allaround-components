import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledText from "./StyledText";

const Text = ({
  children,
  size,
  gridPosition,
  fill,
  dataCy,
  innerRef,
  className,
  ...rest
}: Props) => {
  return (
    <StyledText
      className={cx(
        styles.text,
        {
          [styles.fill]: fill,
        },
        styles[`${size}Text`],
        className
      )}
      ref={innerRef}
      gridPosition={gridPosition}
      {...rest}
      data-cy={dataCy}
    >
      {children}
    </StyledText>
  );
};

Text.defaultProps = {
  size: "small",
  dataCy: "text-component",
};

export default Text;
