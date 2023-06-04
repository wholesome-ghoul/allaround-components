import { mount } from "@cypress/react18";

import Label from "../src/Label";
import Container from "../../container";

describe("Label", () => {
  it("renders", () => {
    mount(<Label>label</Label>);
  });

  it("renders different sizes", () => {
    mount(
      <Container grid="1x3">
        <Label size="small" htmlFor="small">small</Label>
        <Label
          size="medium"
          htmlFor="medium"
        >medium</Label>
        <Label size="large" htmlFor="large">large</Label>
      </Container>
    );

    cy.get("[data-cy=label-component]").should(($p) => {
      expect($p).to.have.length(3);

      const placeholders = $p.map((_, el) => Cypress.$(el).attr("for"));
      expect(placeholders.get()).to.deep.eq([
        "small",
        "medium",
        "large",
      ]);
    });

    cy.compareSnapshot("label-sizes");
  });
});
