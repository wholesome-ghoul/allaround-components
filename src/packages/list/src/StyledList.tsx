import styled, { css } from "styled-components";

import Props from "./types";
import { applyGridPosition } from "../../../utils";

type CSS = Pick<Props, "gridPosition" | "bulletPosition">;

const StyledList = styled.ul`
  ${({ gridPosition, bulletPosition }: CSS) => css`
    ${applyGridPosition(gridPosition)};

    list-style-position: ${bulletPosition};
  `}
`;

export default StyledList;
