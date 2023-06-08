import styled, { css } from "styled-components";

import Props from "./types";
import { GridPos } from "../../../utils";

type CSS = GridPos & Pick<Props, "minWidth">;

const StyledInput = styled.input`
  ${({ rowPos, colPos, minWidth }: CSS) => css`
    grid-row: ${rowPos};
    grid-column: ${colPos};

    min-width: ${minWidth};
  `}
`;

export default StyledInput;
