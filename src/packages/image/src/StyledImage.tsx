import styled, { css } from "styled-components";

import Props from "./types";
import { applyGridPosition, stylesObjToCss } from "../../../utils";

type CSS = Pick<Props, "gridPosition" | "styles" | "objectFit">;

const StyledImage = styled.img`
  ${({ gridPosition, objectFit, styles }: CSS) => css`
    ${applyGridPosition(gridPosition)};

    object-fit: ${objectFit};

    ${stylesObjToCss(styles)};
  `}
`;

export default StyledImage;
