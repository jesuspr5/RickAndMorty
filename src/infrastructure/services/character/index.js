import { call, takeLatest, put, spawn } from "redux-saga/effects";

import { characterActions } from "application/actions/entities/character";

import api from "infrastructure/api";

const charactersReq = api(

    "https://rickandmortyapi.com/api"
);
/**
 *
 * Estas son las funciones que le pegaran al servicio directamente
 */
export function* fetchCharacters() {
    try {
        const { results, error } = yield call(charactersReq.get, '/character/?page=19');

        if (results) {
            yield put(characterActions.fetchCharactersSuccess(results));
        }
        if (error) {
            yield put(characterActions.fetchCharactersFailed(error));
        }
    } catch (err) {
        yield put(characterActions.fetchRestaurantesFailed(err));
    }
}



export function* watchFetchCharacters() {
    yield takeLatest(characterActions.fetchCharacters, fetchCharacters);
}

export default function* rootSaga() {
    yield spawn(watchFetchCharacters);

}

