import type { SVGProps } from "react";
import { isIconSize, iconSize, IconSize } from "../../../utils";
type Props = SVGProps<SVGSVGElement> & {
  size: IconSize | string,
};
const SvgEdit = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={isIconSize(props.size) ? iconSize[props.size] : props.size}
    height={isIconSize(props.size) ? iconSize[props.size] : props.size}
    fill={"currentColor"}
    viewBox={"0 0 512 512"}
    {...props}
  >
    <path d="M9.926 502.61c-2.51-2.508-4.592-7.212-4.628-10.452-.038-3.241 10.654-37.111 23.757-75.267C52.88 347.516 52.88 347.516 173.07 227.35l120.192-120.166 55.613 56.452c30.587 31.049 55.612 57.34 55.612 58.423 0 1.084-53.454 55.356-118.786 120.604-118.787 118.633-118.787 118.633-186.025 141.57-69.23 23.619-81.913 26.216-89.75 18.378Zm351.672-351.923L305.5 94.495l45.094-44.539C375.396 25.46 398.61 5.417 402.178 5.417c13.089 0 28.22 11.68 66.157 51.067 51.72 53.698 51.817 50.926-3.769 107.266-23.404 23.72-43.524 43.13-44.711 43.13-1.187 0-27.403-25.287-58.257-56.193z" />
  </svg>
);
SvgEdit.defaultProps = {
  size: "small",
};
export default SvgEdit;
