import { BaseProps, Size } from "../../../utils";

type Props = BaseProps & {
  children?: React.ReactNode[];
  size?: Size;
  items?: Array<string | number>;
  bulletPosition?: "inside" | "outside";
};

export default Props;
export type { Props };
