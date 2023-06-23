import { mount } from "@cypress/react18";

import Modal from "../src/Modal";

describe("Modal", () => {
  it("renders", () => {
    mount(<Modal />);
  });
});
