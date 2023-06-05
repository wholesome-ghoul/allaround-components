import { BaseProps, Grid } from "../../../utils";

type Props = BaseProps & {
  children: React.ReactNode;
  grid?: Grid | string;
  gap?: Grid["gap"];
  /**
   * determines if container is a grid or grid item
   */
  noGrid?: boolean;
};

export default Props;
