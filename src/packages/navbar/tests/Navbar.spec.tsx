import { mount } from "@cypress/react18";

import Navbar from "../src/Navbar";

describe("Navbar", () => {
  it("renders", () => {
    mount(<Navbar />);
  });
});
