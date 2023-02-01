import { configureStore } from "@reduxjs/toolkit";
import createRootReducer from "./reducers";

export const store = configureStore({
	reducer: createRootReducer(),
});
