import React from "react";
import { createRoot } from "react-dom/client";

import "./index.scss";
import Button from "./packages/button";
import Container from "./packages/container";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>

    <Container noGrid>
    <Container grid="4x5">
      <Button
        size="large"
        gridPosition={{ rowPos: "1 / 2", colPos: "2 / 4" }}
        onClick={() => {
          console.log("OI");
        }}
      >
        OI
      </Button>
      <Button
        size="large"
        gridPosition={{ rowPos: "3 / 5", colPos: "2 / 4" }}
        onClick={() => {
          console.log("OI");
        }}
      >
        OI
      </Button>
    </Container>
    </Container>
  </React.StrictMode>
);
