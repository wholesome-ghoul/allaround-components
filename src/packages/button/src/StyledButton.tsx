import styled, { css } from "styled-components";

import { GridPos } from "../../../utils";

const StyledButton = styled.button`
  ${({ rowPos, colPos }: GridPos) => css`
    grid-row: ${rowPos};
    grid-column: ${colPos};
  `}
`;

export default StyledButton;
