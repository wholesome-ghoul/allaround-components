import { BaseProps, Size } from "../../../utils";

type Props = BaseProps<HTMLTextAreaElement> & {
  children?: React.ReactNode;
  size?: Size;
  resize?: string;
  width?: string;
  height?: string;
  placeholder?: string;

  htmlFor?: string;
  label?: string;

  max?: number;
  value?: string;

  isError?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default Props;
export type { Props };
