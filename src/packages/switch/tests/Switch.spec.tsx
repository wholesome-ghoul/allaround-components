import { mount } from "@cypress/react18";

import Switch from "../src/Switch";

describe("Switch", () => {
  it("renders", () => {
    mount(<Switch />);
  });
});
