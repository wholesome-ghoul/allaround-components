import { BaseProps, Size } from "../../../utils";

type Props = BaseProps<HTMLParagraphElement> & {
  children?: React.ReactNode;
  size?: Size;

  oneline?: boolean;
  ellipsis?: boolean;
};

export default Props;
export type { Props };
