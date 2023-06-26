import { TooltipProps } from "@allaround/tooltip";
import type { UploadProps } from "@allaround/upload";

import { BaseProps, Size } from "../../../utils";

type Props = BaseProps<HTMLVideoElement> &
  Partial<Omit<UploadProps, "setIsError">> & {
    children?: React.ReactNode;
    size?: Size;

    file?: File | null;
    width?: string;
    height?: string;

    maxDuration?: number;

    setIsError?: (isError: boolean) => void;

    /**
     * enables icon and calls user handler
     */
    clickHandler?: () => void;
    icon?: React.ReactNode;
    iconPosition?: "center" | "topRight" | "topLeft" | "bottom" | "top";
    editable?: boolean;
    clickHandlerTooltip?: TooltipProps;

    uploadSetIsError?: UploadProps["setIsError"];
  };

export default Props;
export type { Props };
