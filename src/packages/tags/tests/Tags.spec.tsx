import { mount } from "@cypress/react18";

import Tags from "../src/Tags";

describe("Tags", () => {
  it("renders", () => {
    mount(<Tags />);
  });
});
