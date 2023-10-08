import { createSlice, createAction } from "@reduxjs/toolkit";
import initialState from "../../../../domain/entities/character";

// ---------------- Saga's response ----------------
/**
 *
 * Estas son las acciones o reducer que modifican la data almacenada en el store
 * o tambien llamada la fuente de la verdad
 */
function fetchCharactersSuccess(state, action) {
    state.character.data = action.payload;
    state.character.error = null;
    state.character.success = true;
    state.character.loading = false;
}


function fetchCharactersFailed(state, action) {
    state.character.data = [];
    state.character.error = action.payload;
    state.character.success = false;
    state.character.loading = false;
}

/**
 * Acá deberían de ir las acciones que no van a interactuar con el store
 * directamente. De preferencia son las acciones que se comunicaran con la saga es decir las que le pegan a los servicios
 */
const fetchCharacters = createAction("fetchCharacters");


// ------------- connection -------------
/**
 * Aqui se hace la conexión con redux  asi podras utulizarlo donde sea que lo llames
 */
const characterReducer = createSlice({
    name: "character",
    initialState,
    reducers: {
        fetchCharactersSuccess,
        fetchCharactersFailed
    },
});

/**
 * aquí  se hace disponible todos los métodos
 */
export const characterActions = {
    ...characterReducer.actions,
    fetchCharacters
};

/**
 * aquí se export el reducer para que sea combinado con los demás y luego pasar al store
 */
export default characterReducer.reducer;
