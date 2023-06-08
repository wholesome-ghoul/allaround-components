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
  gap,
  gridPosition,
  noGrid,
  dataCy,
  minWidth,
  ...rest
}: Props) => {
  let _grid: Grid = {};

  if (!noGrid && grid) {
    if (typeof grid === "string") {
      [_grid.cols, _grid.rows] = grid.split("x").map(cellCreator); // 4x5
    } else {
      if (Number.isInteger(Math.abs(Number(grid.rows)))) {
        _grid.rows = cellCreator(grid.rows as number);
      } else {
        _grid.rows = grid.rows ?? defaultRows;
      }

      if (Number.isInteger(Math.abs(Number(grid.cols)))) {
        _grid.cols = cellCreator(grid.cols as number);
      } else {
        _grid.cols = grid.cols ?? defaultCols;
      }

      _grid.gap = gap;
    }
  }

  const styledProps = { ..._grid, ...gridPosition, noGrid, minWidth };

  return (
    <StyledContainer
      className={cx(styles.container, className)}
      {...styledProps}
      {...rest}
      data-cy={dataCy}
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
  dataCy: "container-component",
  minWidth: "auto",
};

export default Container;
