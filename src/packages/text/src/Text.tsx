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
  oneline,
  ellipsis,
  ...rest
}: Props) => {
  return (
    <StyledText
      className={cx(
        styles.text,
        {
          [styles.fill]: fill,
          [styles.oneline]: oneline,
          [styles.ellipsis]: ellipsis,
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
