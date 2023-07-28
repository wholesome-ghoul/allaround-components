import { BaseProps, Size } from "../../../utils";

type Props = BaseProps<HTMLParagraphElement> & {
  children?: React.ReactNode;
  size?: Size;

  oneline?: boolean;
  maxLines?: number;
  ellipsis?: boolean;

  maxWidth?: string;
};

export default Props;
export type { Props };
