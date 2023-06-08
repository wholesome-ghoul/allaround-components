import styled, { css } from "styled-components";

import Props from "./types";
import { applyGridPosition } from "../../../utils";

type CSS = Pick<Props, "gridPosition">;

const StyledLabel = styled.label`
  ${({ gridPosition }: CSS) => css`
    ${applyGridPosition(gridPosition)};
  `}
`;

export default StyledLabel;
