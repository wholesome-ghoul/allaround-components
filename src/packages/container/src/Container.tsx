import React from "react";
import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledContainer from "./StyledContainer";
import { BaseProps, Grid, GridList, GridBpRequired } from "../../../utils";

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
  innerRef,
  ...rest
}: Props) => {
  let _grid: Grid | GridList = {};

  if (!noGrid && grid) {
    if (typeof grid === "string") {
      [_grid.cols, _grid.rows] = grid.split("x").map(cellCreator); // 4x5
    } else if (!Array.isArray(grid)) {
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

      _grid.bp = grid.bp;
      _grid.gap = grid.gap || gap;
    } else {
      _grid = grid.map((g) => {
        const result: GridBpRequired = { bp: 0 };

        if (Number.isInteger(Math.abs(Number(g.rows)))) {
          result.rows = cellCreator(g.rows as number);
        } else {
          result.rows = g.rows ?? defaultRows;
        }

        if (Number.isInteger(Math.abs(Number(g.cols)))) {
          result.cols = cellCreator(g.cols as number);
        } else {
          result.cols = g.cols ?? defaultCols;
        }

        result.gap = g.gap;
        result.bp = g.bp;
        return result;
      });
    }
  }

  const styledProps = { noGrid, minWidth };

  return (
    <StyledContainer
      className={cx(styles.container, className)}
      gridPosition={gridPosition}
      grid={_grid}
      ref={innerRef}
      {...styledProps}
      {...rest}
      data-cy={dataCy}
    >
      {!noGrid && (autoVer || autoHor)
        ? React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              const childGridPosition = child.props.gridPosition;
              let rowPos = childGridPosition?.rowPos;
              let colPos = childGridPosition?.colPos;

              if (autoHor) rowPos = index + 1;
              if (autoVer) colPos = index + 1;

              return React.cloneElement(
                child as React.ReactElement<BaseProps<typeof child.type>>,
                {
                  gridPosition: {
                    rowPos,
                    colPos,
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
