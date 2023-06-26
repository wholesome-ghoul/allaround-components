import { TooltipProps } from "@allaround/tooltip";
import type { UploadProps } from "@allaround/upload";

import { BaseProps, Size } from "../../../utils";

type Props = BaseProps<HTMLImageElement> &
  Pick<React.CSSProperties, "objectFit"> &
  Partial<UploadProps> & {
    children?: React.ReactNode;
    size?: Size;
    src?: string | File | any;
    alt?: string;
    width?: string;
    height?: string;

    icon?: React.ReactNode;
    iconPosition?: "center" | "topRight" | "topLeft" | "bottom" | "top";

    /**
     * enables icon and calls user handler
     */
    clickHandler?: () => void;

    editable?: boolean;
    inheritBorderColor?: boolean;

    clickHandlerTooltip?: TooltipProps;

    variant?: "youtube-thumbnail";
  };

export default Props;
export type { Props };
