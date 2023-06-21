import { mount } from "@cypress/react18";

import Checkbox from "../src/Checkbox";

describe("Checkbox", () => {
  it("renders", () => {
    mount(<Checkbox />);
  });
});
