import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledPlaceholder from "./StyledPlaceholder";
import Media from "./Media";
import Circle from "./Circle";
import Square from "./Square";
import Paragraph from "./Paragraph";
import Line from "./Line";
import Group from "./Group";

const Placeholder = ({
  children,
  gridPosition,
  dataCy,
  innerRef,
  className,
  ...rest
}: Props) => {
  return (
    <StyledPlaceholder
      className={cx(styles.placeholder, className)}
      ref={innerRef}
      gridPosition={gridPosition}
      {...rest}
      data-cy={dataCy}
    >
      {children}
    </StyledPlaceholder>
  );
};

Placeholder.defaultProps = {
  size: "small",
  dataCy: "placeholder-component",
};

Placeholder.Line = Line;
Placeholder.Square = Square;
Placeholder.Circle = Circle;
Placeholder.Media = Media;
Placeholder.Paragraph = Paragraph;
Placeholder.Group = Group;

export default Placeholder;
