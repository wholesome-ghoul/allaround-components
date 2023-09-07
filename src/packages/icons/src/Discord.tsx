import type { SVGProps } from "react";
import { isIconSize, iconSize, IconSize } from "../../../utils";
type Props = SVGProps<SVGSVGElement> & {
  size: IconSize | string,
};
const SvgDiscord = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={isIconSize(props.size) ? iconSize[props.size] : props.size}
    height={isIconSize(props.size) ? iconSize[props.size] : props.size}
    fill={"currentColor"}
    viewBox={"0 0 512 512"}
    {...props}
  >
    <path
      d="M78.926 113.647c.188-.076.497-.076.685 0 .189.076.035.138-.342.138-.378 0-.532-.062-.343-.138zm11.52 0c.188-.076.497-.076.685 0 .189.076.035.138-.342.138-.378 0-.532-.062-.343-.138zm78.832-10.79c0-.377.062-.531.138-.343.076.189.076.497 0 .686-.076.189-.138.034-.138-.343zM.318 101.486c0-.377.062-.532.138-.343.076.188.076.497 0 .686-.076.188-.138.034-.138-.343zm169.265-4.115c0-.678.054-.956.12-.617.065.34.065.895 0 1.235-.066.339-.12.061-.12-.618zM.105 92.297c0-1.81.045-2.515.098-1.566.054.949.054 2.43 0 3.291-.055.862-.099.085-.098-1.725zm169.478-4.8c0-.679.054-.956.12-.617.065.34.065.895 0 1.234-.066.34-.12.062-.12-.617zM.318 83.383c0-.377.062-.532.138-.343.076.189.076.497 0 .686-.076.188-.138.034-.138-.343Zm71.62-12.617c0-.68.053-.957.118-.617.066.339.066.894 0 1.234-.065.34-.118.062-.118-.617zm-30.457 0c0-.528.056-.744.125-.48.07.264.07.696 0 .96-.069.264-.125.048-.125-.48zM56.16 53.84c.34-.066.895-.066 1.234 0 .34.065.062.119-.617.119s-.956-.054-.617-.12zm56.229 0c.339-.066.894-.066 1.234 0 .34.065.062.119-.617.119-.68 0-.957-.054-.617-.12zM92.366 8.047c.188-.076.497-.076.685 0 .189.076.035.138-.342.138-.378 0-.532-.062-.343-.138z"
      transform="matrix(3.02052 0 0 3.02052 -.526 61.257)"
    />
    <path
      d="M80.16 113.64c.264-.07.696-.07.96 0 .264.068.048.125-.48.125s-.744-.056-.48-.126zm9.057-.002c.267-.069.637-.065.823.01.185.076-.033.133-.486.127-.452-.006-.604-.067-.337-.136zm80.06-11.878c0-.377.063-.531.139-.343.076.189.076.497 0 .686-.076.188-.138.034-.138-.343zM.328 100.251c.006-.452.068-.604.137-.337.07.267.065.637-.01.823-.075.185-.132-.033-.126-.486zm169.29-7.817c0-2.187.043-3.082.095-1.988a50.62 50.62 0 0 1 0 3.977c-.052 1.094-.094.199-.094-1.989zM.328 84.617c.006-.452.068-.604.137-.337.07.266.065.637-.01.822-.075.186-.132-.032-.126-.485zm102.376-1.303-.806-.891.892.805c.83.751 1.017.978.805.978-.047 0-.448-.401-.891-.892zm66.575-.205c0-.378.062-.532.138-.343.076.188.076.497 0 .685-.076.189-.138.035-.138-.342zM41.46 72.137c0-.377.063-.531.139-.343.076.189.076.497 0 .686-.076.189-.139.034-.139-.343zm25.466-13.851c-.667-.68-1.15-1.235-1.074-1.235.075 0 .682.556 1.348 1.235s1.15 1.234 1.074 1.234c-.075 0-.682-.555-1.348-1.234zm-20.572 0c.512-.528.992-.96 1.068-.96.075 0-.282.432-.793.96-.512.528-.993.96-1.068.96-.075 0 .282-.432.793-.96zM95.383 8.32c.188-.076.497-.076.686 0 .188.076.034.139-.343.139s-.532-.063-.343-.139zm-17.686-.283c.267-.069.637-.064.823.01.185.076-.033.133-.486.127-.452-.005-.604-.067-.337-.137zm13.44 0c.267-.069.637-.064.823.01.185.076-.033.133-.486.127-.452-.005-.604-.067-.337-.137z"
      transform="matrix(3.02052 0 0 3.02052 -.526 61.257)"
    />
    <path
      d="M39.223 127.162C27.29 123.08 16.81 117.889 6.446 110.93c-2.565-1.722-4.866-3.29-5.114-3.485C.21 106.563-.04 87.18.952 77.897 3.398 55.042 10.976 34.272 24.48 13.412l1.528-2.36L28.57 9.93C37.7 5.93 48.622 2.58 58.679.7c1.85-.347 2.36-.364 2.55-.087.132.191 1.171 2.23 2.31 4.53 1.14 2.3 2.157 4.183 2.26 4.183.105 0 1.604-.183 3.332-.405 9.88-1.273 21.492-1.263 31.798.028 2.736.342 3.443.358 3.536.08.129-.388 4.158-8.57 4.284-8.7.15-.156 8.5 1.606 12.211 2.576 4.981 1.302 11.353 3.401 16.183 5.33 7.015 2.803 6.33 2.322 8.9 6.257 13.598 20.823 21.359 43.425 23.21 67.589.32 4.185.189 20.73-.19 23.843-.154 1.276-.177 1.3-3.123 3.368-7.413 5.205-17.941 11.008-26.184 14.43-3.841 1.596-11.436 4.348-13.082 4.742-.69.165-.88-.047-3.338-3.733-1.435-2.15-3.479-5.446-4.543-7.326l-1.935-3.419 2.394-.951c3.047-1.21 11.65-5.557 11.776-5.949.053-.163-.638-.872-1.534-1.577l-1.63-1.28-2.286.986c-6.47 2.789-13.562 5.049-20.11 6.407-21.182 4.395-42.644 1.92-63.102-7.28-.272-.122-3.47 2.176-3.631 2.61-.164.44 8.736 4.899 12.887 6.457l1.291.485-.71 1.407c-1.85 3.665-8.083 13.362-8.566 13.327-.09-.007-2.076-.666-4.414-1.466zm21.084-39.789c2.598-.692 4.455-1.808 6.619-3.981 2.27-2.28 3.449-4.254 4.426-7.415.901-2.916.903-7.5.002-10.423-1.64-5.33-5.07-9.114-9.91-10.936-2.517-.947-6.485-.984-9.103-.085-8.585 2.95-13.105 13.557-9.681 22.715 2.366 6.33 7.915 10.503 13.98 10.513 1.207.002 2.857-.172 3.667-.388zm56.872-.146c3.867-1.194 7.187-4.131 9.152-8.096 3.57-7.202 2.368-15.539-3.009-20.854-4.881-4.825-11.023-5.803-16.934-2.697-2.531 1.33-5.35 4.301-6.655 7.013-4.727 9.828-.251 21.53 9.433 24.661 2.12.686 5.745.673 8.013-.027z"
      transform="matrix(3.02052 0 0 3.02052 -.526 61.257)"
    />
  </svg>
);
SvgDiscord.defaultProps = {
  size: "small",
};
export default SvgDiscord;
