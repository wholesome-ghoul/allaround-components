import { mount } from "@cypress/react18";

import Heading from "../src/Heading";

describe("Heading", () => {
  it("renders", () => {
    mount(<Heading />);
  });
});
