import { useRef, useCallback } from "react";
import Modal from "@allaround/modal";
import type { ModalProps } from "@allaround/modal";

const useModal = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const show = () => modalRef.current?.showModal();
  const close = () => modalRef.current?.close();

  const modal = useCallback(
    (props: ModalProps) => (
      <Modal innerRef={modalRef} {...props}>
        {props.children}
      </Modal>
    ),
    []
  );

  return {
    show,
    close,
    modal,
  };
};

export default useModal;
