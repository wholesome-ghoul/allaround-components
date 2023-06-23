type GridGap = {
  row?: string;
  col?: string;
};

type Grid = {
  rows?: string | number;
  cols?: string | number;
  gap?: GridGap | string;
  /**
   * Breakpoint for grid position
   *
   * used for @media (min-width: ${bp}) { ... }
   */
  bp?: string | number;
};

type GridBpRequired = Pick<Grid, "rows" | "cols" | "gap"> &
  Required<Pick<Grid, "bp">>;
type GridList = GridBpRequired[];

type GridPos = {
  rowPos?: string | number;
  colPos?: string | number;
  /**
   * Breakpoint for grid position
   *
   * used for @media (min-width: ${bp}) { ... }
   */
  bp?: string | number;
};

type GridPosBpRequired = Pick<GridPos, "rowPos" | "colPos"> &
  Required<Pick<GridPos, "bp">>;
type GridPosList = GridPosBpRequired[];

type Size = "small" | "medium" | "large" | "xlarge";
const iconSize = {
  small: "1.2rem",
  medium: "1.5rem",
  large: "2rem",
  xlarge: "3rem",
} as const;
type IconSize = keyof typeof iconSize;
const isIconSize = (size: string): size is IconSize => size in iconSize;

type BaseProps<Elem> = {
  className?: string;
  gridPosition?: GridPos | GridPosList;
  fill?: boolean;
  id?: string;
  dataCy?: string;
  styles?: React.CSSProperties;
  innerRef?: React.RefObject<Elem>;
  ref?: React.RefObject<Elem>;
  onClick?: (e: React.MouseEvent<Elem>) => void;
};

export type {
  BaseProps,
  GridPos,
  Grid,
  GridGap,
  GridPosList,
  GridList,
  GridBpRequired,
  Size,
  IconSize,
};
export { isIconSize, iconSize };
