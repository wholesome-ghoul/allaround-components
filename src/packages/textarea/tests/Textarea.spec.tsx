import { mount } from "@cypress/react18";

import Textarea from "../src/Textarea";

describe("Textarea", () => {
  it("renders", () => {
    mount(<Textarea />);
  });
});
