import { BaseProps } from "../../../utils";

type Props = BaseProps<HTMLHeadingElement> & {
  children?: React.ReactNode;
};

export default Props;
export type { Props };
