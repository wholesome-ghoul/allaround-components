import type { SVGProps } from "react";
import { isIconSize, iconSize, IconSize } from "../../../utils";
type Props = SVGProps<SVGSVGElement> & {
  size: IconSize | string,
};
const SvgSuccess = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={isIconSize(props.size) ? iconSize[props.size] : props.size}
    height={isIconSize(props.size) ? iconSize[props.size] : props.size}
    fill={"currentColor"}
    viewBox={"0 0 512 512"}
    {...props}
  >
    <path d="M195.22 504.553c-92.19-24.047-158.564-88.748-185.147-180.482-15.316-52.853-10.089-121.96 13.049-172.499 29.945-65.41 83.115-113.167 153.15-137.562 23.455-8.17 35.781-10.337 65.715-11.56 43.705-1.784 71.83 2.515 106.466 16.275 80.377 31.929 138.811 101.3 156.163 185.388 8.05 39.013 8.026 65.645-.096 105.207-7.481 36.446-28.545 81.853-49.859 107.483-30.55 36.737-74.478 66.971-120.539 82.964-23.096 8.02-32.129 9.29-71.104 10.006-34.623.635-49.845-.537-67.798-5.22zM336.55 280.33c113.7-113.7 114.978-115.128 114.978-128.534 0-24.482-23.403-41.138-43.472-30.94-4.284 2.178-49.082 45.085-99.551 95.35l-91.762 91.391-42.18-41.774c-23.198-22.975-45.43-43.423-49.403-45.439-12.423-6.303-24.105-4.263-34.37 6.003-7.666 7.666-9.667 12.59-9.667 23.788 0 13.932.877 15.003 65.208 79.627 35.864 36.028 67.465 65.506 70.225 65.506 2.759 0 56.757-51.74 119.994-114.978z" />
  </svg>
);
SvgSuccess.defaultProps = {
  size: "small",
};
export default SvgSuccess;
