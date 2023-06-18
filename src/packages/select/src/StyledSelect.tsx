import styled, { css } from "styled-components";

import Props from "./types";
import { applyGridPosition, stylesObjToCss } from "../../../utils";

type CSS = Pick<Props, "gridPosition" | "styles" | "maxHeight"> & {
  direction: "up" | "down";
};

const StyledSelect = styled.div`
  ${({ gridPosition, maxHeight, direction, styles }: CSS) => css`
    ${applyGridPosition(gridPosition)};

    & > div {
      max-height: ${maxHeight};
      top: ${direction === "down" && "110%"};
      bottom: ${direction === "up" && "110%"};
    }

    ${stylesObjToCss(styles)};
  `}
`;

export default StyledSelect;
