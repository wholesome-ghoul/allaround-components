import styled, { css } from "styled-components";

import { Grid, GridPos, GridGap } from "../../../utils";
import Props from "./types";

type CSS = Grid & GridPos & Pick<Props, "noGrid">;

const StyledContainer = styled.div`
  ${({ rows, cols, rowPos, colPos, noGrid, gap }: CSS) => css`
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
    grid-row: ${rowPos};
    grid-column: ${colPos};
  `}
`;

export default StyledContainer;
