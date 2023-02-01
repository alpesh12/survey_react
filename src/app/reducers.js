import { combineReducers } from "@reduxjs/toolkit";
import registerSlice from "../features/Authentication/Register/Register.slice";
import loginSlice from "../features/Authentication/Login/Login.slice";
import surveySlice from "../features/Survey/Survey.slice";

const createRootReducer = () =>
	combineReducers({
		register: registerSlice,
		login: loginSlice,
		survey: surveySlice,
	});

export default createRootReducer;
