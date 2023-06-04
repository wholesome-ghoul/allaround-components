import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledContainer from "./StyledContainer";
import { Grid } from "../../../utils";

const cellCreator = (n: number | string) => `repeat(${n}, minmax(0, 1fr))`;

const defaultRows = cellCreator(8);
const defaultCols = cellCreator(8);

const Container = ({
  children,
  className,
  grid,
  gridPosition,
  noGrid,
  ...rest
}: Props) => {
  let _grid: Grid = {};

  if (!noGrid && grid) {
    if (typeof grid === "string") {
      [_grid.cols, _grid.rows] = grid.split("x").map(cellCreator); // 4x5
    } else {
      _grid.rows = grid.rows || defaultRows;
      _grid.cols = grid.cols || defaultCols;
    }
  }

  const styledProps = { ..._grid, ...gridPosition, noGrid };

  return (
    <StyledContainer
      className={cx(styles.container, className)}
      {...styledProps}
      {...rest}
      data-cy="container-component"
    >
      {children}
    </StyledContainer>
  );
};

Container.defaultProps = {
  grid: {
    rows: defaultRows,
    cols: defaultCols,
  },
  noGrid: false,
};

export default Container;
