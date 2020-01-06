import saga, { bannerSaga } from "../src/index";
import { fork } from "redux-saga/effects";

describe("application root saga", () => {
  it("yeild fork banner", () => {
    const gen = saga();
    expect(gen.next().value).toEqual(fork(bannerSaga));
    expect(gen.next().done).toEqual(true);
  });
});
