import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Container from "@allaround/container";
import Text from "@allaround/text";
import Button from "@allaround/button";

import useEventListener from "./use-event-listener";

type Props = {
  prompt: string;
  confirm: string;
  cancel: string;
  injectText?: boolean;
  enableSkip?: boolean;
};

const defaultText: Props = {
  prompt: "Are you sure?",
  confirm: "Confirm",
  cancel: "Cancel",
  injectText: false,
  enableSkip: false,
};

type CB = any;

const replace = (text: string, injectText: string) =>
  text.replace(/#INJECT_NAME#/, injectText);

/**
 * @param {function} cb - Callback function to be called when the user confirms the prompt
 * @param {object} options - Options for the prompt
 * @param {string} options.prompt - Prompt text
 * @param {string} options.confirm - Confirm button text
 * @param {string} options.cancel - Cancel button text
 * @param {boolean} options.injectText - Whether to inject text into the prompt
 * @param {boolean} options.enableSkip - Whether to enable skipping the prompt
 * @param {array} deps - Dependencies for the callback function
 *
 * @returns {[function, JSX.Element]} - Returns a tuple with the confirm handler and the prompt component
 *
 * @example
 * ```tsx
 * const [confirm, Prompt] = useConfirm(
 *  (...args) => ...,
 *  {
 *    prompt: "Do you want to delete #INJECT_NAME#?",
 *    confirm: "Confirm",
 *    cancel: "Cancel",
 *    injectText: true,
 *    enableSkip: true,
 *  });
 *
 * Put anywhere:
 *  <Prompt />
 * ```
 *
 * Call anywhere:
 *  confirm(..args).injectText("someAccountName").skip(false)
 *
 * `useConfirm` can be used multiple times in a component. Putting <Prompt />
 * once in the dom is enough, so no need to access it during the call more than
 * once.
 */
const useConfirm = (
  cb: any,
  { prompt, confirm, cancel, injectText, enableSkip }: Props = defaultText,
  deps: any[] = []
): [CB, JSX.Element | null] => {
  const [confirmed, setConfirmed] = useState(false);
  const confirmPromptRef = useRef<HTMLDivElement | null>(null);
  const [args, setArgs] = useState<any>([]);
  const documentBodyRef = useRef<HTMLDivElement | null>(null);

  function openPrompt(_args: any) {
    if (!confirmPromptRef.current) {
      confirmPromptRef.current = document.getElementById(
        "prompt-confirmation-hook"
      ) as HTMLDivElement;
    }

    const promptParent = confirmPromptRef.current as HTMLDivElement;
    promptParent.style.display = "flex";

    const promptContainer = promptParent.children[0] as HTMLDivElement;
    const children = promptContainer.children;

    const promptText = children[0] as HTMLParagraphElement;
    const confirmButton = children[1] as HTMLButtonElement;
    const cancelButton = children[2] as HTMLButtonElement;

    if (!injectText) promptText.innerText = prompt;
    confirmButton.innerText = confirm;
    cancelButton.innerText = cancel;

    confirmButton.onclick = () => closeAndConfirm(true);
    cancelButton.onclick = () => closeAndConfirm(false);

    setArgs(_args);
  }

  function confirmHandler() {
    const inject: any = {};
    const _arguments = arguments;

    if (injectText) {
      inject.injectText = (toInject: string) => {
        const promptParent = confirmPromptRef.current as HTMLDivElement;
        const promptContainer = promptParent.children[0] as HTMLDivElement;
        const promptText = promptContainer.children[0] as HTMLParagraphElement;
        promptText.innerText = replace(prompt, toInject);

        return inject;
      };
    }

    if (enableSkip) {
      inject.skip = (_skip: boolean) => {
        if (!_skip) {
          openPrompt(_arguments);
        } else {
          setArgs(_arguments);
          setConfirmed(true);
        }

        return inject;
      };
    } else {
      openPrompt(_arguments);
    }

    return inject;
  }

  const closeAndConfirm = (_confirmed: boolean) => {
    if (confirmPromptRef.current) {
      confirmPromptRef.current.style.display = "none";
    }

    setConfirmed(_confirmed);
  };

  useEventListener(
    "keydown",
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAndConfirm(false);
      }
    },
    documentBodyRef
  );

  useEffect(() => {
    if (confirmed) {
      cb(...args);

      setConfirmed(false);
    }
  }, [...deps, args, confirmed]);

  return [
    confirmHandler,
    createPortal(
      <Container
        id="prompt-confirmation-hook"
        innerRef={confirmPromptRef}
        styles={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          display: "none",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 999,
        }}
        noGrid
      >
        <Container
          grid={{ cols: "1fr 1fr", rows: "4fr 1fr", gap: "16px" }}
          styles={{
            width: "unset",
            height: "unset",
            maxWidth: "300px",
            border: "1px solid var(--fg-color)",
            borderRadius: "8px",
            backgroundColor: "var(--bg-color)",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <Text
            gridPosition={{ rowPos: 1, colPos: "1/3" }}
            styles={{ width: "100%" }}
            size="medium"
          >
            {prompt}
          </Text>
          <Button onClick={() => {}} gridPosition={{ rowPos: 2, colPos: 1 }}>
            {confirm}
          </Button>
          <Button onClick={() => {}} gridPosition={{ rowPos: 2, colPos: 2 }}>
            {cancel}
          </Button>
        </Container>
      </Container>,
      document.body
    ),
  ];
};

export default useConfirm;
