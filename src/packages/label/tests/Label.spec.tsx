import { mount } from "@cypress/react18";
import Label from "../src/Label";

describe("Label", () => {
  it("renders", () => {
    mount(<Label />);
  });
});
