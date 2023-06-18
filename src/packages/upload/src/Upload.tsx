import { useRef, useState } from "react";
import cx from "classnames";
import hooks from "@allaround/hooks";
import Input from "@allaround/input";
import Label from "@allaround/label";
import Icons from "@allaround/icons";

import Props from "./types";
import styles from "./style.module.scss";
import StyledUpload from "./StyledUpload";

const { useEventListener } = hooks;

const fileValidator = (file: File, accept?: string[], maxSize?: number) => {
  if (!!accept && !accept.includes(file.type)) {
    return { text: "Invalid file type", show: true };
  }

  if (maxSize !== undefined && file.size > maxSize * 1024) {
    return {
      text: "File is too big",
      show: true,
    };
  }

  return { text: "", show: false };
};

// TODO: max size
const Upload = ({
  children,
  size,
  isError,
  gridPosition,
  fill,
  dataCy,
  innerRef,
  text,
  className,
  accept,
  handleError,
  setFile,
  maxSize,
  ...rest
}: Props) => {
  const uploadRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  useEventListener(
    "dragover",
    (e: any) => {
      e.preventDefault();
    },
    uploadRef?.current!
  );

  useEventListener(
    "dragstart",
    (e: any) => {
      e.preventDefault();
    },
    uploadRef?.current!
  );

  useEventListener(
    "dragenter",
    (e: any) => {
      e.preventDefault();
      setDragging(true);
    },
    uploadRef?.current!
  );

  useEventListener(
    "dragleave",
    (e: any) => {
      e.preventDefault();
      setDragging(false);
    },
    uploadRef?.current!
  );

  useEventListener(
    "drop",
    (e: any) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];

      const { text, show } = fileValidator(file, accept, maxSize);

      if (show) {
        handleError({ text, show });
        return;
      }

      setFile(file);
    },
    uploadRef?.current!
  );

  return (
    <StyledUpload
      className={cx(
        styles.upload,
        {
          [styles.fill]: fill,
        },
        styles[`${size}Upload`],
        className
      )}
      ref={innerRef}
      gridPosition={gridPosition}
      onClick={() => {}}
      {...rest}
      data-cy={dataCy}
    >
      <Label
        innerRef={uploadRef}
        htmlFor="upload-input"
        className={cx(styles.label, {
          [styles.isError]: isError,
          [styles.active]: dragging,
        })}
      >
        <Icons.UploadIcon />
        {text}
      </Label>
      <Input
        type="file"
        onChange={(e) => {
          if (e.target.files === null) return;

          const file = e.target.files[0];
          const { text, show } = fileValidator(file, accept, maxSize);

          if (show) {
            handleError({ text, show });
            return;
          }

          setFile(file);
        }}
        value=""
        className={cx(styles.input)}
        id="upload-input"
      />
    </StyledUpload>
  );
};

Upload.defaultProps = {
  size: "small",
  dataCy: "upload-component",
  isError: false,
  maxSize: 1,
};

export default Upload;
