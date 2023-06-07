import { mount } from "@cypress/react18";

import List from "../src/List";

describe("List", () => {
  it("renders", () => {
    mount(<List />);
  });
});
