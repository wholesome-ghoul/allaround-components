import { BaseProps, Size } from "../../../utils";

type Props = BaseProps &
  Pick<HTMLLabelElement, "htmlFor"> & {
    children?: React.ReactNode;
    size?: Size;
  };

export default Props;
