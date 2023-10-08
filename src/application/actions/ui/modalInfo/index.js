import { createSlice } from "@reduxjs/toolkit";
import initialState from "../../../../domain/ui/modalInfo";

function setShow(state, actions) {
    state.show = actions.payload;
}

function setText(state, actions) {
    state.text = actions.payload;
}
function closeModal(state) {
    state.show = false;
    state.text = "";
}

const modalInfoReducer = createSlice({
    name: "modalInfo",
    initialState,
    reducers: {
        setShow,
        setText,
        closeModal,
    },
});

/**
 * aquí  se hace disponible todos los métodos
 */
export const modalInfoActions = {
    ...modalInfoReducer.actions,
};

/**
 * aquí se export el reducer para que sea combinado con los demás y luego pasar al store
 */
export default modalInfoReducer.reducer;
