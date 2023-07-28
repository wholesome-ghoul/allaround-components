import styled, { css } from "styled-components";

import Props from "./types";
import { applyGridPosition, stylesObjToCss } from "../../../utils";

type CSS = Pick<Props, "gridPosition" | "styles" | "objectFit" | "ratio">;

const StyledImage = styled.img`
  ${({ gridPosition, objectFit, styles, ratio }: CSS) => css`
    ${applyGridPosition(gridPosition)};

    object-fit: ${objectFit};
    aspect-ratio: ${ratio};

    ${stylesObjToCss(styles)};
  `}
`;

export default StyledImage;
