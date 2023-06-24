import { useRef, useCallback } from "react";
import Modal from "@allaround/modal";
import type { ModalProps } from "@allaround/modal";

import useEventListener from "./use-event-listener";

type CB = () => void;

type UseModal = {
  onEsc?: CB;
};

const useModal = ({ onEsc }: UseModal = {}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const documentBodyRef = useRef(document.body);

  useEventListener(
    "keydown",
    (e) => {
      if (!modalRef?.current?.open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onEsc && onEsc();
        close();
      }
    },
    documentBodyRef
  );

  const show = (cb?: CB) => {
    cb && cb();
    modalRef.current?.showModal();
  };

  const close = (cb?: CB) => {
    cb && cb();
    modalRef.current?.close();
  };

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
