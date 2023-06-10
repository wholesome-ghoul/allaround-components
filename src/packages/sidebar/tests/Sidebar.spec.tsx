import { mount } from "@cypress/react18";

import Sidebar from "../src/Sidebar";

describe("Sidebar", () => {
  it("renders", () => {
    mount(<Sidebar />);
  });
});
