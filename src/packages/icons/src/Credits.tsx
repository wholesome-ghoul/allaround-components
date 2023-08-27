import type { SVGProps } from "react";
import { isIconSize, iconSize, IconSize } from "../../../utils";
type Props = SVGProps<SVGSVGElement> & {
  size: IconSize | string,
};
const SvgCredits = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={isIconSize(props.size) ? iconSize[props.size] : props.size}
    height={isIconSize(props.size) ? iconSize[props.size] : props.size}
    fill={"currentColor"}
    viewBox={"0 0 512 512"}
    {...props}
  >
    <path d="M492.95 1023.245c-84.575-3.713-164.319-26.642-236.097-67.885-39.712-22.82-72.877-48.338-106.444-81.905-33.923-33.923-59.167-66.821-82.559-107.591C4.435 655.337-15.215 523.79 13.01 398.73c15.45-68.465 46.086-135.152 87.897-191.34 16.044-21.559 29.426-36.976 49.485-57.008 42.347-42.29 86.108-73.47 139.015-99.045 134.526-65.032 291.568-67.965 427.922-7.993 112.05 49.282 202.277 136.275 255.176 246.028 68.098 141.289 68.098 303.797 0 445.087-25.351 52.597-56.927 96.933-99.002 139.008-20.08 20.08-35.533 33.492-57.028 49.498-56.004 41.702-122.682 72.335-191.339 87.905-42.171 9.564-91.346 14.167-132.185 12.374zm3-102.37c21.073-3.325 41.248-14.927 61.5-35.367 19.956-20.141 36.453-43.509 49.485-70.093 16.875-34.423 22.94-57.829 21.51-83-2.147-37.805-12.155-65.426-31.413-86.706-27.225-30.083-77.368-41.75-119.22-27.739-10.01 3.35-31.656 14.192-39.577 19.82-14.884 10.578-29.394 26.433-35.762 39.079-6.179 12.27-8.39 25.4-6.576 39.046 2.13 16.022 8.418 24.586 24.245 33.022l5.727 3.053 4.862-2.464c8.323-4.218 16.657-5.904 29.219-5.913 17.684-.013 27.827 3.367 37.044 12.345 6.977 6.796 9.934 13.52 9.946 22.618.019 13.75-5.104 24.534-16.877 35.531-8.771 8.193-15.461 12.078-28.763 16.703-17.396 6.049-26.691 11.517-30.895 18.175-7.079 11.215-7.25 34.61-.353 48.13 8.927 17.5 38.346 28.106 65.898 23.76zm59.5-652.305c18.513-5.167 31.972-15.834 39.86-31.591 7.176-14.334 8.14-20.261 8.14-50.064 0-21.183-.31-26.818-1.827-33.287-5.812-24.782-24.604-43.574-49.386-49.386-6.438-1.51-11.858-1.814-31.287-1.754-26.577.081-32.788 1.15-47 8.086-9.256 4.517-21.019 15.884-25.713 24.848-6.61 12.623-7.543 18.15-8.02 47.493-.387 23.685-.22 27.538 1.575 36.271 5.293 25.772 20.227 42.198 44.203 48.62 11.13 2.98 10.55 2.94 37.955 2.68 20.227-.192 26.74-.588 31.5-1.916z" />
  </svg>
);
SvgCredits.defaultProps = {
  size: "small",
};
export default SvgCredits;
