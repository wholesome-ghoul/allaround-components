import { mount } from "@cypress/react18";

import Container from "../src/Container";
import Button from "../../button";

describe("Container", () => {
  it("renders", () => {
    mount(<Container>container</Container>);
  });

  it("should NOT display as a grid", () => {
    mount(<Container noGrid>noGrid container</Container>);

    cy.get("[data-cy=container-component]").should("not.have.css", "display", "grid");
  });

  it("should display as a grid", () => {
    mount(<Container grid="4x5">container</Container>);

    cy.get("[data-cy=container-component]")
      .should("have.css", "display")
      .and("equal", "grid");
    cy.get("[data-cy=container-component").should("have.css", "grid-column");
    cy.get("[data-cy=container-component").should("have.css", "grid-row");

    cy.get("[data-cy=container-component").should("have.css", "grid-template-columns");
    cy.get("[data-cy=container-component").should("have.css", "grid-template-rows");
  });

  it("renders with children", () => {
    mount(
      <Container grid="4x5">
        <Button
          onClick={() => {}}
          gridPosition={{ rowPos: "3", colPos: "2 / 4" }}
        >
          click
        </Button>
      </Container>
    );
  });
});
