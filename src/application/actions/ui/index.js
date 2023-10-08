import { combineReducers } from "redux";

// Entities
import character from "../entities/character";
// UI
import modalInfo from "../ui/modalInfo";

/**
 * aquí se hace la combinacion de todos los reducer o se le puede llamar mapeo de todos los reducer
 */
const reducer = combineReducers({
    entities: combineReducers({
        character,
    }),
    ui: combineReducers({
        modalInfo,
    }),
});

const rootReducer = (state, action) => {
    if (action.type === "CLEAR_STATE") {
        state = undefined;
    }

    return reducer(state, action);
};

export default rootReducer;
