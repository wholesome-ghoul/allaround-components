import React from "react";
import { createRoot } from "react-dom/client";

import Button from "./packages/button";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Button onClick={() => {}}>OI</Button>
  </React.StrictMode>
);
