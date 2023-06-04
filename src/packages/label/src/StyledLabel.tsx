import styled, { css } from "styled-components";

import { GridPos } from "../../../utils";

const StyledLabel = styled.label`
  ${({ rowPos, colPos }: GridPos) => css`
    grid-row: ${rowPos};
    grid-column: ${colPos};
  `}
`;

export default StyledLabel;
