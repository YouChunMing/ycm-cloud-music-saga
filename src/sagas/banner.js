import { takeLatest, put, call } from "redux-saga/effects";
import { banner as Banner_Redux } from "ycm-cloud-music-redux";
import { banner as Banner_Api } from "ycm-cloud-music-api";

export function* getHomeData(action) {
  try {
    const { data } = yield call(Banner_Api.getHomeData);
    yield put(Banner_Redux.actions.getHomeDataSuccess(data));
  } catch (error) {
    yield put(Banner_Redux.actions.getHomeDataFailure(error));
  }
}

export default function* saga() {
  yield takeLatest(Banner_Redux.types.GET_HOME_DATA_REQUEST, getHomeData);
}
