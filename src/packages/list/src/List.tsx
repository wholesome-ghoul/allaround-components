import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledList from "./StyledList";

const List = ({
  children,
  size,
  gridPosition,
  fill,
  items,
  bulletPosition,
  innerRef,
  dataCy,
  className,
  ...rest
}: Props) => {
  const styledProps = { bulletPosition };

  return (
    <StyledList
      className={cx(
        styles.list,
        {
          [styles.fill]: fill,
        },
        styles[`${size}List`],
        className
      )}
      gridPosition={gridPosition}
      ref={innerRef}
      {...styledProps}
      {...rest}
      data-cy={dataCy}
    >
      {(children ?? items)?.map((child, index) => (
        <li key={index}>{child}</li>
      ))}
    </StyledList>
  );
};

List.defaultProps = {
  size: "small",
  bulletPosition: "outside",
  dataCy: "list-component",
};

export default List;
