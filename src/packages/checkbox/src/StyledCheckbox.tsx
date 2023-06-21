import styled, { css } from "styled-components";
import Input from "@allaround/input";

import Props from "./types";
import { applyGridPosition, stylesObjToCss } from "../../../utils";

type CSS = Pick<Props, "gridPosition" | "styles">;

const StyledCheckbox = styled(Input)`
  ${({ gridPosition, styles }: CSS) => css`
    ${applyGridPosition(gridPosition)};

    ${stylesObjToCss(styles)};
  `}
`;

export default StyledCheckbox;
