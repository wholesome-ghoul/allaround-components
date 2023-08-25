import { BaseProps, Grid, GridList } from "../../../utils";

type Props = Omit<BaseProps<HTMLDivElement>, "fill"> &
  Pick<Grid, "gap"> & {
    children?: React.ReactNode;
    grid?: Grid | GridList | string;
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

    flex?: boolean;
  };

export default Props;
export type { Props };
