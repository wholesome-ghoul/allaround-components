import { mount } from "@cypress/react18";

import Link from "../src/Link";

describe("Link", () => {
  it("renders", () => {
    mount(<Link />);
  });
});
