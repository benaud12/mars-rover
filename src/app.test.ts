import { run } from "./app";

describe("app", () => {
  describe("run", () => {
    it("should do something...", () => {
      expect(run()).toEqual("HIYA!");
    });
  });
});
