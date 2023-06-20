import SvgDel from "./Del";
import type { SVGProps } from "react";
import { IconSize } from "../../../utils";

type Props = SVGProps<SVGSVGElement> & {
  size: IconSize | string;
};

const SvgPlus = (props: Props) => {
  return <SvgDel style={{ transform: "rotate(45deg)" }} {...props} />;
};

SvgPlus.defaultProps = {
  size: "small",
};

export default SvgPlus;
