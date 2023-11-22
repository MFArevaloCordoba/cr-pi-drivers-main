import { createStore, applyMiddleware, compose} from "redux";
import thunkmiddleware from "redux-thunk";
import reducer from "./reducer";

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkmiddleware))
);

export default store;