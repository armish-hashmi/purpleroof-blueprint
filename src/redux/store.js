import { createStore, combineReducers } from "redux";
import contactReducer from "./contactReducer";

const rootReducer = combineReducers({
  contact: contactReducer,
});

export const store = createStore(rootReducer);
