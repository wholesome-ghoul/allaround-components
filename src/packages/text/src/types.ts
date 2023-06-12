import { BaseProps, Size } from "../../../utils";

type Props = BaseProps<HTMLParagraphElement> & {
  children?: React.ReactNode;
  size?: Size;
};

export default Props;
export type { Props };
