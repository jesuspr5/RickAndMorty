
import { fork } from "redux-saga/effects";
// Sagas
import character from "./character";

// General forking sagas.
export default function* rootSaga() {
    yield fork(character);
}
