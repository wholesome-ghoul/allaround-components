import React from "react";
import { createRoot } from "react-dom/client";

import { Input } from "./packages/all";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Input>OI</Input>
  </React.StrictMode>
);
