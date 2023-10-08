import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootSagas from "../../infrastructure/services";
import reducer from "../actions";

const sagaMiddleware = createSagaMiddleware();

const middleware = [
    ...getDefaultMiddleware({
        thunk: true,
        immutableCheck: false,
        serializableCheck: false,
    }),
    sagaMiddleware,
];

const store = configureStore({
    middleware,
    reducer,
    devTools: false,
});

sagaMiddleware.run(rootSagas);

export default store;
