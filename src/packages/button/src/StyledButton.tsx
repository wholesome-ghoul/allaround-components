import styled, { css } from "styled-components";

import Props from "./types";
import { applyGridPosition } from "../../../utils";

type CSS = Pick<Props, "gridPosition">;

const StyledButton = styled.button`
  ${({ gridPosition }: CSS) => css`
    ${applyGridPosition(gridPosition)};
  `}
`;

export default StyledButton;
