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
  className,
  ...rest
}: Props) => {
  const styledProps = { bulletPosition, ...gridPosition };

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
      {...styledProps}
      {...rest}
      data-cy="list-component"
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
};

export default List;
