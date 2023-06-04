import React from "react";
import { createRoot } from "react-dom/client";

import "./index.scss";
import Button from "./packages/button";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Button
      onClick={() => {
        console.log("OI");
      }}
    >
      OI
    </Button>
  </React.StrictMode>
);
