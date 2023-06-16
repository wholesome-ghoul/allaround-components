import styled, { css } from "styled-components";

import {
  Grid,
  GridGap,
  GridList,
  applyGridPosition,
  applyGrid,
  stylesObjToCss,
} from "../../../utils";
import Props from "./types";

type CSS = Grid &
  Pick<Props, "noGrid" | "minWidth" | "gridPosition" | "grid" | "styles">;

const StyledContainer = styled.div`
  ${({ grid, gridPosition, noGrid, minWidth, styles }: CSS) => css`
    ${!noGrid && "display: grid;"}

    ${applyGrid(grid as Grid | GridList)};
    ${applyGridPosition(gridPosition)};

    min-width: ${minWidth};

    ${stylesObjToCss(styles)};
  `}
`;

export default StyledContainer;
