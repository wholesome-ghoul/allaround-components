import { mount } from "@cypress/react18";

import Video from "../src/Video";

describe("Video", () => {
  it("renders", () => {
    mount(<Video />);
  });
});
