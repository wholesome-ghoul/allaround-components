import { useCallback, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
  if (!file) {
    return { text: "", show: false };
  }

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
  icon,
  noBorder,
  ...rest
}: Props) => {
  const uploadRef = useRef<HTMLLabelElement | null>(null);
  const [isOnUpload, setIsOnUpload] = useState(false);
  const inputId = useMemo(() => uuidv4(), []);
  const handleDrop = useCallback(
    (e: any) => {
      e.preventDefault();
      setIsOnUpload(false);

      const file = e.dataTransfer.files[0];

      const { text, show } = fileValidator(file, accept, maxSize);

      if (show) {
        handleError({ text, show });
        return;
      } else {
        handleError({ text: "", show: false });
      }

      setFile(file);
    },
    [accept, maxSize, setFile, handleError]
  );

  useEventListener(
    "dragover",
    (e: any) => {
      e.preventDefault();
    },
    uploadRef
  );

  useEventListener(
    "dragstart",
    (e: any) => {
      e.preventDefault();
    },
    uploadRef
  );

  useEventListener(
    "dragenter",
    (e: any) => {
      e.preventDefault();
      setIsOnUpload(true);
    },
    uploadRef
  );

  useEventListener(
    "dragleave",
    (e: any) => {
      e.preventDefault();
      setIsOnUpload(false);
    },
    uploadRef
  );

  useEventListener("drop", handleDrop, uploadRef);

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
        htmlFor={inputId}
        className={cx(styles.label, {
          [styles.isError]: isError,
          [styles.active]: isOnUpload,
          [styles.noBorder]: noBorder,
        })}
      >
        {icon ? icon : <Icons.UploadIcon />}
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
          } else {
            handleError({ text: "", show: false });
          }

          setFile(file);
        }}
        accept={accept?.join(",")}
        className={cx(styles.input)}
        id={inputId}
      />
    </StyledUpload>
  );
};

Upload.defaultProps = {
  size: "small",
  dataCy: "upload-component",
  isError: false,
  maxSize: 1,
  noBorder: false,
};

export default Upload;
