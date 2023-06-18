import { mount } from "@cypress/react18";

import Upload from "../src/Upload";

describe("Upload", () => {
  it("renders", () => {
    mount(<Upload />);
  });
});
