import saga, { getHomeData } from "../../src/sagas/banner";
import { takeLatest, call, put } from "redux-saga/effects";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { banner as Banner_Redux } from "ycm-cloud-music-redux";
import { banner as Banner_Api } from "ycm-cloud-music-api";

describe("banner root saga", () => {
  it("yeild fork getHomeData", () => {
    const gen = saga();
    expect(gen.next().value).toEqual(
      takeLatest(Banner_Redux.types.GET_HOME_DATA_REQUEST, getHomeData)
    );
    expect(gen.next().done).toEqual(true);
  });
});

describe("banner getHomeData saga", () => {
  const gen = cloneableGenerator(getHomeData)();

  it("yeild call getHomeData Api", () => {
    expect(gen.next().value).toEqual(call(Banner_Api.getHomeData));
  });

  it("if getHomeData Api success, yeild put getHomeDataSuccess action", () => {
    const clone = gen.clone();
    const response = {
      data: {}
    };
    expect(clone.next(response).value).toEqual(
      put(Banner_Redux.actions.getHomeDataSuccess(response["data"]))
    );
    expect(clone.next().done).toEqual(true);
  });

  it("if getHomeData Api failure, yeild put getHomeDataSuccess action", () => {
    const clone = gen.clone();
    const error = {};
    expect(clone.throw(error).value).toEqual(
      put(Banner_Redux.actions.getHomeDataFailure(error))
    );
    expect(clone.next().done).toEqual(true);
  });
});
