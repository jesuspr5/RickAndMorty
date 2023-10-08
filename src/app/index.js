
import { Provider } from "react-redux";
import store from "../store/store";
import storeSaga from "application/config";
import Characters from "../screens/characterScreen/Characters";

export default function App() {
    return (
        <Provider store={storeSaga}>
            <Characters />
        </Provider>
    );
}
