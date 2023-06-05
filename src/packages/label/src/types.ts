import { BaseProps, Size } from "../../../utils";

type Props = BaseProps &
  Partial<Pick<HTMLLabelElement, "htmlFor">> & {
    children?: React.ReactNode;
    size?: Size;
  };

export default Props;
