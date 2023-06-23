import { mount } from "@cypress/react18";

import Tooltip from "../src/Tooltip";

describe("Tooltip", () => {
  it("renders", () => {
    mount(<Tooltip />);
  });
});
