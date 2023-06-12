import { mount } from "@cypress/react18";

import Text from "../src/Text";

describe("Text", () => {
  it("renders", () => {
    mount(<Text />);
  });
});
