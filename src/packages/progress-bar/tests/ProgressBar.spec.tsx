import { mount } from "@cypress/react18";

import ProgressBar from "../src/ProgressBar";

describe("ProgressBar", () => {
  it("renders", () => {
    mount(<ProgressBar />);
  });
});
