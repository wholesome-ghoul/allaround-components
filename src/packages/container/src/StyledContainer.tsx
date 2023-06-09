import styled, { css } from "styled-components";

import {
  Grid,
  GridGap,
  applyGridPosition,
  stylesObjToCss,
} from "../../../utils";
import Props from "./types";

type CSS = Grid &
  Pick<Props, "noGrid" | "minWidth" | "gridPosition" | "styles">;

const StyledContainer = styled.div`
  ${({ rows, cols, gridPosition, noGrid, gap, minWidth, styles }: CSS) => css`
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

    ${stylesObjToCss(styles)};
  `}
`;

export default StyledContainer;
