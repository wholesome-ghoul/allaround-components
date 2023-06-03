import { mount } from "@cypress/react18";
import Input from "../src/Input";

describe("Input", () => {
  it("renders", () => {
    mount(<Input />);
  });
});
