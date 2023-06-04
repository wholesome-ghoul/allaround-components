import styled, { css } from "styled-components";

import { GridPos } from "../../../utils";

const StyledInput = styled.input`
  ${({ rowPos, colPos }: GridPos) => css`
    grid-row: ${rowPos};
    grid-column: ${colPos};
  `}
`;

export default StyledInput;
