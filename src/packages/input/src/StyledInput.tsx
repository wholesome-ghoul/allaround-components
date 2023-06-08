import styled, { css } from "styled-components";

import Props from "./types";
import { applyGridPosition } from "../../../utils";

type CSS = Pick<Props, "minWidth" | "gridPosition">;

const StyledInput = styled.input`
  ${({ gridPosition, minWidth }: CSS) => css`
    ${applyGridPosition(gridPosition)};

    min-width: ${minWidth};
  `}
`;

export default StyledInput;
