type Grid = {
  rows?: string;
  cols?: string;
};

type GridPos = {
  rowPos?: string | number;
  colPos?: string | number;
};

type Size = "small" | "medium" | "large" | "xlarge";
const IconSize = {
  small: "1.2rem",
  medium: "1.5rem",
  large: "2rem",
  xlarge: "3rem",
};

type BaseProps = {
  className?: string;
  gridPosition?: GridPos;
  fill?: boolean;
};

export type { BaseProps, GridPos, Grid, Size };
export { IconSize };
