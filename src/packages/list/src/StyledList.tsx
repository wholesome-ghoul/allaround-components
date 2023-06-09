import styled, { css } from "styled-components";

import Props from "./types";
import { applyGridPosition, stylesObjToCss } from "../../../utils";

type CSS = Pick<Props, "gridPosition" | "styles" | "bulletPosition">;

const StyledList = styled.ul`
  ${({ gridPosition, bulletPosition, styles }: CSS) => css`
    ${applyGridPosition(gridPosition)};

    list-style-position: ${bulletPosition};

    ${stylesObjToCss(styles)};
  `}
`;

export default StyledList;
