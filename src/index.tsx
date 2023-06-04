import React from "react";
import { createRoot } from "react-dom/client";

import "./index.scss";
import Label from "./packages/label";
import Container from "./packages/container";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Container noGrid>
      <Container grid="4x5">
        <Label size="large" gridPosition={{ rowPos: "1 / 2", colPos: "2 / 4" }} htmlFor="tmp">
          Email
        </Label>
        <Label size="large" gridPosition={{ rowPos: "3", colPos: "2 / 4" }} htmlFor="tmp">
          Password
        </Label>
      </Container>
    </Container>
  </React.StrictMode>
);
