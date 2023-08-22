import styled, { css } from "styled-components";

import {
  Grid,
  GridList,
  applyGridPosition,
  applyGrid,
  stylesObjToCss,
} from "../../../utils";
import Props from "./types";

type CSS = Grid &
  Pick<
    Props,
    "noGrid" | "minWidth" | "gridPosition" | "grid" | "styles" | "gap"
  >;

const StyledContainer = styled.div`
  ${({ grid, gridPosition, gap, noGrid, minWidth, styles }: CSS) => css`
    ${!noGrid && "display: grid;"}

    ${applyGrid(grid as Grid | GridList)};
    ${applyGridPosition(gridPosition)};
    ${gap && `gap: ${gap};`}

    min-width: ${minWidth};

    ${stylesObjToCss(styles)};
  `}
`;

export default StyledContainer;
