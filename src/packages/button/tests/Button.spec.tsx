import { mount } from "@cypress/react18";

import Button from "../src/Button";
import Container from "../../container";

describe("Button", () => {
  it("renders", () => {
    mount(<Button onClick={() => {}}>Submit</Button>);
    cy.get("button").contains("Submit");
  });

  it("renders different sizes", () => {
    mount(
      <Container grid="1x4">
        <Button size="small" onClick={() => {}}>
          small
        </Button>
        <Button size="medium" onClick={() => {}}>
          medium
        </Button>
        <Button size="large" onClick={() => {}}>
          large
        </Button>
        <Button size="medium" onClick={() => {}} fill>
          fill
        </Button>
      </Container>
    );

    cy.get("[data-cy=button-component]").should(
      "have.text",
      ["small", "medium", "large", "fill"].join("")
    );

    cy.compareSnapshot("button-sizes");
  });

  it("calls onClick when clicked", () => {
    const onClick = cy.spy().as("onClick");
    mount(<Button onClick={onClick}>Submit</Button>);
    cy.get("button").click();

    cy.get("@onClick").should("have.been.calledOnce");
  });
});
