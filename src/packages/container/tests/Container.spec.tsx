import { mount } from "@cypress/react18";
import Container from "../src/Container";

describe("Container", () => {
  it("renders", () => {
    mount(<Container>container</Container>);
  });
});
