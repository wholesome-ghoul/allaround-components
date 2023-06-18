import { mount } from "@cypress/react18";

import Select from "../src/Select";

describe("Select", () => {
  it("renders", () => {
    mount(<Select />);
  });
});
