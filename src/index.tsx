import React from "react";
import { createRoot } from "react-dom/client";

import CommonScss from "./packages/common-scss";
CommonScss.reset().common()
import Label from "./packages/label";
import Container from "./packages/container";
import Input from "./packages/input";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Container noGrid>
      <Container grid="4x5">
        <Label
          size="large"
          gridPosition={{ rowPos: "1 / 2", colPos: "2 / 4" }}
          htmlFor="tmp"
        >
          Email
        </Label>
        <Input value="" onChange={() => {}} isError />
        <Label
          size="large"
          gridPosition={{ rowPos: "3", colPos: "2 / 4" }}
          htmlFor="tmp"
        >
          Password
        </Label>
      </Container>
    </Container>
  </React.StrictMode>
);
