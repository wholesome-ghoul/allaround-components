import { mount } from "@cypress/react18";

import Dropdown from "../src/Dropdown";

describe("Dropdown", () => {
  it("renders", () => {
    mount(<Dropdown />);
  });
});
