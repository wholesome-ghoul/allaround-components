import styled, { css } from "styled-components";

import Props from "./types";
import { applyGridPosition, stylesObjToCss } from "../../../utils";

type CSS = Pick<Props, "gridPosition" | "styles" | "minWidth">;

const StyledInput = styled.input`
  ${({ gridPosition, minWidth, styles }: CSS) => css`
    ${applyGridPosition(gridPosition)};

    min-width: ${minWidth};

    ${stylesObjToCss(styles)};
  `}
`;

export default StyledInput;
