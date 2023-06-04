import { mount } from "@cypress/react18";
import Button from "../src/Button";

describe("Button", () => {
  it("renders", () => {
    mount(<Button onClick={() => {}}>Submit</Button>);
    cy.get("button").contains("Submit");
  });
});
