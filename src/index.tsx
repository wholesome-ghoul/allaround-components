import React from "react";
import { createRoot } from "react-dom/client";

import "./index.scss";
import Input from "./packages/input";
import Container from "./packages/container";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Container noGrid>
      <Container grid="4x5">
        <Input
          size="large"
          gridPosition={{ rowPos: "1 / 2", colPos: "2 / 4" }}
          value=""
          onChange={() => {}}
        />
        <Input
          size="large"
          gridPosition={{ rowPos: "3 / 5", colPos: "2 / 4" }}
          value=""
          placeholder="OI 2"
          onChange={() => {}}
        />
      </Container>
    </Container>
  </React.StrictMode>
);
