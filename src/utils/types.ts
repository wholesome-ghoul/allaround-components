type GridGap = {
  row?: string;
  col?: string;
}

type Grid = {
  rows?: string | number;
  cols?: string | number;
  gap?: GridGap | string;
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
  id?: string;
  dataCy?: string;
};

export type { BaseProps, GridPos, Grid, GridGap, Size };
export { IconSize };
