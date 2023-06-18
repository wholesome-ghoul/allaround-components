import styled, { css } from "styled-components";

import Props from "./types";
import { applyGridPosition, stylesObjToCss } from "../../../utils";

type CSS = Pick<Props, "gridPosition" | "styles">;

const StyledUpload = styled.div`
  ${({ gridPosition, styles }: CSS) => css`
    ${applyGridPosition(gridPosition)};

    ${stylesObjToCss(styles)};
  `}
`;

export default StyledUpload;
