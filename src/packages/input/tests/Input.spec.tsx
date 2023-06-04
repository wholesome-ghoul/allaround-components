import { mount } from "@cypress/react18";

import Input from "../src/Input";
import Container from "../../container";

describe("Input", () => {
  it("renders", () => {
    mount(<Input value="" onChange={() => {}} />);
  });

  it("renders different sizes", () => {
    mount(
      <Container grid="1x4">
        <Input size="small" value="" onChange={() => {}} placeholder="small" />
        <Input
          size="medium"
          value=""
          onChange={() => {}}
          placeholder="medium"
        />
        <Input size="large" value="" onChange={() => {}} placeholder="large" />
        <Input size="fill" value="" onChange={() => {}} placeholder="fill" />
      </Container>
    );

    cy.get("[data-cy=input-component]").should(($p) => {
      expect($p).to.have.length(4);

      const placeholders = $p.map((_, el) => Cypress.$(el).attr("placeholder"));
      expect(placeholders.get()).to.deep.eq([
        "small",
        "medium",
        "large",
        "fill",
      ]);
    });

    cy.compareSnapshot("input-sizes");
  });

  it("correctly calls onChange", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    mount(<Input value="" onChange={onChangeSpy} />);

    cy.get("[data-cy=input-component]").type("test");
    cy.get("@onChangeSpy").its("callCount").should("eq", 4);
  });
});
