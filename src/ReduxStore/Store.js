
import {createStore, applyMiddleware, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import UserReducer from "./UserReducer";
import ChatReducer from "./ChatStore/ChatReducer";
const middleware = [thunk];

const AppReducer = combineReducers({
    user:UserReducer,
    chat:ChatReducer,
})
const store = createStore(AppReducer,composeWithDevTools(applyMiddleware(...middleware)));
export default store;
