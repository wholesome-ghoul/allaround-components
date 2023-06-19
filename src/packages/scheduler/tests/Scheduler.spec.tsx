import { mount } from "@cypress/react18";

import Scheduler from "../src/Scheduler";

describe("Scheduler", () => {
  it("renders", () => {
    mount(<Scheduler />);
  });
});
