import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Container from "@allaround/container";
import Button from "@allaround/button";

type Text = {
  prompt: string;
  confirm: string;
  cancel: string;
};

const useConfirm = (
  cb: any,
  { prompt, confirm, cancel }: Text,
  deps: any[] = []
): [() => void, JSX.Element | null] => {
  const [confirmed, setConfirmed] = useState(false);
  const confirmPromptRef = useRef<HTMLDivElement | null>(null);

  const openPrompt = () => {
    if (!confirmPromptRef.current) {
      confirmPromptRef.current = document.getElementById(
        "prompt-confirmation-hook"
      ) as HTMLDivElement;
    }

    const promptContainer = confirmPromptRef.current
      .children[0] as HTMLDivElement;
    const confirmButton = confirmPromptRef.current
      .children[1] as HTMLButtonElement;
    const cancelButton = confirmPromptRef.current
      .children[2] as HTMLButtonElement;

    promptContainer.innerText = prompt;
    confirmButton.innerText = confirm;
    cancelButton.innerText = cancel;

    confirmButton.onclick = () => setConfirmed(true);
    cancelButton.onclick = () => setConfirmed(false);
  };

  useEffect(() => {
    if (confirmed) {
      cb();
    }
  }, [...deps, confirmed]);

  return [
    openPrompt,
    createPortal(
      <Container
        id="prompt-confirmation-hook"
        innerRef={confirmPromptRef}
        noGrid
      >
        <Container>{prompt}</Container>
        <Button onClick={() => {}}>{confirm}</Button>
        <Button onClick={() => {}}>{cancel}</Button>
      </Container>,
      document.body
    ),
  ];
};

export default useConfirm;
