import { css } from "styled-components";

import { GridPos, GridPosList } from "./types";

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

export { capitalize, applyGridPosition };

export * from "./types";
