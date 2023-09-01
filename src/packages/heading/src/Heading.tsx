import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledHeading from "./StyledHeading";

const CommonHeading = (props: Props) => {
  const { fill, className, gridPosition, dataCy, children, innerRef, ...rest } =
    props;

  return (
    <StyledHeading
      className={cx(
        styles.heading,
        {
          [styles.fill]: fill,
        },
        className
      )}
      gridPosition={gridPosition}
      ref={innerRef}
      {...rest}
      data-cy={dataCy}
      styles={props.styles}
    >
      {children}
    </StyledHeading>
  );
};

const createHeadingElement =
  (headingStyle: any) =>
  ({ className, children, ...rest }: Props) => {
    return (
      <CommonHeading className={cx(headingStyle, className)} {...rest}>
        {children}
      </CommonHeading>
    );
  };

const Heading = {
  h1: createHeadingElement(styles.h1),
  h2: createHeadingElement(styles.h2),
  h3: createHeadingElement(styles.h3),
  h4: createHeadingElement(styles.h4),
  h5: createHeadingElement(styles.h5),
  h6: createHeadingElement(styles.h6),
};

export default Heading;
