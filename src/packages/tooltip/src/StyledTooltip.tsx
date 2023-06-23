import styled, { css } from "styled-components";

import type { Props, Position } from "./types";
import { applyGridPosition, stylesObjToCss } from "../../../utils";

type CSS = Pick<Props, "gridPosition" | "styles"> & {
  position: Position;
};

const StyledTooltip = styled.div`
  ${({ gridPosition, position, styles }: CSS) => css`
    ${applyGridPosition(gridPosition)};

    top: ${position.y}px;
    left: ${position.x}px;

    ${stylesObjToCss(styles)};
  `}
`;

export default StyledTooltip;
