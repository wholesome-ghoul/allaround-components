import { mount } from "@cypress/react18";

import Image from "../src/Image";

describe("Image", () => {
  it("renders", () => {
    mount(<Image />);
  });
});
