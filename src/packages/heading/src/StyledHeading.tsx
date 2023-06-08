import styled, { css } from "styled-components";

import Props from "./types";
import { applyGridPosition } from "../../../utils";

type CSS = Pick<Props, "gridPosition">;

const StyledHeading = styled.h1`
  ${({ gridPosition }: CSS) => css`
    ${applyGridPosition(gridPosition)};
  `}
`;

export default StyledHeading;
