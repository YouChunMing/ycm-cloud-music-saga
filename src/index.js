import bannerSaga from './sagas/banner';
import {fork} from 'redux-saga/effects';

export {
    bannerSaga
}

export default function* saga(){
    const bannerTask = yield fork(bannerSaga);
}


