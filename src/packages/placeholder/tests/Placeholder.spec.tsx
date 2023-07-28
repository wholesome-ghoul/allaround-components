import { mount } from "@cypress/react18";

import Placeholder from "../src/Placeholder";

describe("Placeholder", () => {
  it("renders", () => {
    mount(<Placeholder />);
  });
});
