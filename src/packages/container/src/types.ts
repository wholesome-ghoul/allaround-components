import { BaseProps, Grid } from "../../../utils";

type Props = Omit<BaseProps, "fill"> &
  Pick<Grid, "gap"> & {
    children: React.ReactNode;
    grid?: Grid | string;
    /**
     * determines if container is a grid or grid item
     */
    noGrid?: boolean;
    minWidth?: string;
    /**
     * automatically positions grid container's children
     */
    autoVer?: boolean;
    autoHor?: boolean;
  };

export default Props;
export type { Props };
