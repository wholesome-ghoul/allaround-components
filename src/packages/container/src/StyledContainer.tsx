import styled, { css } from "styled-components";

import { Grid, GridPos, GridGap, GridPosList } from "../../../utils";
import Props from "./types";

// extract number from px,em,rem,%,...
const numFromBp = (bp: string | number) => {
  if (typeof bp === "number") return bp;

  return Number(bp.replace(/\D/g, "")); // 768px -> 768
};

const mediaMinWidth = ({ bp, rowPos, colPos }: GridPos) => css`
  @media (min-width: ${bp}) {
    grid-row: ${rowPos};
    grid-column: ${colPos};
  }
`;

const applyGridPosition = (gridPosition?: GridPos | GridPosList) => {
  if (!gridPosition) return;

  if (Array.isArray(gridPosition)) {
    return gridPosition
      .sort((pos1, pos2) => numFromBp(pos1.bp) - numFromBp(pos2.bp))
      .map(mediaMinWidth);
  }

  if (!gridPosition.bp) {
    return css`
      grid-row: ${gridPosition.rowPos};
      grid-column: ${gridPosition.colPos};
    `;
  }

  return mediaMinWidth(gridPosition);
};

type CSS = Grid & Pick<Props, "noGrid" | "minWidth" | "gridPosition">;

const StyledContainer = styled.div`
  ${({ rows, cols, gridPosition, noGrid, gap, minWidth }: CSS) => css`
    ${!noGrid && "display: grid;"}

    ${!noGrid && `grid-gap: ${gap};`}
    ${!noGrid &&
    (gap as GridGap)?.row &&
    `grid-row-gap: ${(gap as GridGap).row};`}
    ${!noGrid &&
    (gap as GridGap)?.col &&
    `grid-column-gap: ${(gap as GridGap).col};`}

    grid-template-columns: ${cols};
    grid-template-rows: ${rows};

    ${applyGridPosition(gridPosition)};

    min-width: ${minWidth};
  `}
`;

export default StyledContainer;
