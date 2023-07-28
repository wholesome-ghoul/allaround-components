import styled, { css } from "styled-components";

import Props from "./types";
import { applyGridPosition, stylesObjToCss } from "../../../utils";

type CSS = Pick<Props, "gridPosition" | "styles" | "maxWidth" | "maxLines">;

const styleMaxLines = (maxLines: number) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${maxLines};
  -webkit-box-orient: vertical;
`;

const StyledText = styled.p`
  ${({ gridPosition, styles, maxWidth, maxLines }: CSS) => css`
    ${applyGridPosition(gridPosition)};

    max-width: ${maxWidth};
    ${styleMaxLines(maxLines ?? 0)};

    ${stylesObjToCss(styles)};
  `}
`;

export default StyledText;
