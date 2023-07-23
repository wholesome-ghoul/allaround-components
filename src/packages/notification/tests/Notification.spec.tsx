import { mount } from "@cypress/react18";

import Notification from "../src/Notification";

describe("Notification", () => {
  it("renders", () => {
    mount(<Notification />);
  });
});
