import { BaseProps, Size } from "../../../utils";

type Props = BaseProps &
  Pick<HTMLAnchorElement, "href"> & {
    children?: React.ReactNode;
    size?: Size;
  };

export default Props;
export type { Props };
