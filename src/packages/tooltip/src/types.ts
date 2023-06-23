import { BaseProps, Size } from "../../../utils";

type Position = {
  x: number;
  y: number;
};

type Props<Elem extends HTMLElement = HTMLDivElement> =
  BaseProps<HTMLDivElement> & {
    children?: React.ReactNode;
    size?: Size;
    componentRef: React.RefObject<Elem>;

    preferredPosition: "top" | "bottom" | "left" | "right";
  };

export default Props;
export type { Props, Position };
