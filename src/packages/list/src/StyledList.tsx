import styled, { css } from "styled-components";

import { GridPos } from "../../../utils";
import Props from "./types";

type CSS = GridPos & {
  bulletPosition: Props["bulletPosition"];
};

const StyledList = styled.ul`
  ${({ rowPos, colPos, bulletPosition }: CSS) => css`
    grid-row: ${rowPos};
    grid-column: ${colPos};

    list-style-position: ${bulletPosition};
  `}
`;

export default StyledList;
