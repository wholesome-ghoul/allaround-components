import { BaseProps, Size } from "../../../utils";

type Props = BaseProps<HTMLLabelElement> &
  Partial<Pick<HTMLLabelElement, "htmlFor">> & {
    children?: React.ReactNode;
    size?: Size;
  };

export default Props;
export type { Props };
