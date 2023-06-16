import styled, { css } from "styled-components";

import Props from "./types";
import { applyGridPosition, stylesObjToCss } from "../../../utils";

type CSS = Pick<
  Props,
  "gridPosition" | "styles" | "resize" | "height" | "width"
>;

const StyledTextarea = styled.textarea`
  ${({ gridPosition, resize, height, width, styles }: CSS) => css`
    ${applyGridPosition(gridPosition)};

    resize: ${resize};
    height: ${height};
    width: ${width};

    ${stylesObjToCss(styles)};
  `}
`;

export default StyledTextarea;
