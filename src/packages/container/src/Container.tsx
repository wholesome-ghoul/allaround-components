import React from "react";
import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledContainer from "./StyledContainer";
import { BaseProps, Grid } from "../../../utils";

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
  autoVer,
  autoHor,
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

  const styledProps = { ..._grid, noGrid, minWidth };

  return (
    <StyledContainer
      className={cx(styles.container, className)}
      gridPosition={gridPosition}
      {...styledProps}
      {...rest}
      data-cy={dataCy}
    >
      {!noGrid && (autoVer || autoHor)
        ? React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(
                child as React.ReactElement<BaseProps>,
                {
                  gridPosition: {
                    rowPos: autoHor ? index + 1 : undefined,
                    colPos: autoVer ? index + 1 : undefined,
                  },
                }
              );
            }

            return child;
          })
        : children}
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
  autoVer: false,
  autoHor: false,
};

export default Container;
