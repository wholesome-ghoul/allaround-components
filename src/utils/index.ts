import { css } from "styled-components";
import kebabCase from "lodash/kebabCase";

import { GridPos, GridPosList, Grid, GridList, GridGap } from "./types";

const capitalize = (str: string | undefined) => {
  return str && str.charAt(0).toUpperCase() + str.slice(1);
};

// extract number from px,em,rem,%,...
const numFromBp = (bp: string | number) => {
  if (typeof bp === "number") return bp;

  return Number(bp.replace(/\D/g, "")); // 768px -> 768
};

const mediaMinWidth = ({ bp, rowPos, colPos }: GridPos) => css`
  @media (min-width: ${bp}) {
    ${gridPositionFields({ rowPos, colPos })};
  }
`;

const gridPositionFields = ({ rowPos, colPos }: GridPos) => css`
  grid-row: ${rowPos};
  grid-column: ${colPos};
`;

const mediaMinWidthGrid = ({ bp, rows, cols, gap }: Grid) => css`
  @media (min-width: ${bp}) {
    ${gridFields({ rows, cols, gap })};
  }
`;

const gridFields = ({ rows, cols, gap }: Grid) => css`
  grid-template-rows: ${rows};
  grid-template-columns: ${cols};

  ${`grid-gap: ${gap};`}
  ${(gap as GridGap)?.row && `grid-row-gap: ${(gap as GridGap).row};`}
  ${(gap as GridGap)?.col && `grid-column-gap: ${(gap as GridGap).col};`}
`;

const applyGridPosition = (gridPosition?: GridPos | GridPosList) => {
  if (!gridPosition) return;

  if (Array.isArray(gridPosition)) {
    return gridPosition
      .sort((pos1, pos2) => numFromBp(pos1.bp) - numFromBp(pos2.bp))
      .map(mediaMinWidth);
  }

  if (!gridPosition.bp) {
    return gridPositionFields(gridPosition);
  }

  return mediaMinWidth(gridPosition);
};

const applyGrid = (grid?: Grid | GridList) => {
  if (!grid) return;

  if (Array.isArray(grid)) {
    return grid
      .sort((grid1, grid2) => numFromBp(grid1.bp) - numFromBp(grid2.bp))
      .map(mediaMinWidthGrid);
  }

  if (!grid.bp) {
    return gridFields(grid);
  }

  return mediaMinWidthGrid(grid);
};

const stylesObjToCss = (styles?: React.CSSProperties): string => {
  if (!styles) return "";

  return Object.entries(styles).reduce((acc, [key, value]) => {
    return `${acc}${kebabCase(key)}: ${value};\n`;
  }, "");
};

export { capitalize, applyGridPosition, stylesObjToCss, applyGrid };

export * from "./types";
