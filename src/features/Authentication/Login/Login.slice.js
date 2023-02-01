import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthenticationService from "../../../services/API/Authentication/Authentication.service";

/**
 * Login
 */
export const loginAction = createAsyncThunk(
	"login/loginAction",
	async (payload, { rejectWithValue }) => {
		try {
			const response = await AuthenticationService.doLogin(payload);
			if (response.data.status) {
				return response.data.data;
			}
			return rejectWithValue({
				message: response.message,
			});
		} catch (err) {
			if (!err.response) {
				throw err;
			}
			return rejectWithValue({
				message: err.response,
			});
		}
	}
);

const initialState = {
	loading: false,
	error: null,
};

export const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loginAction.pending, (state) => {
				state.loading = true;
			})
			.addCase(loginAction.fulfilled, () => initialState)
			.addCase(loginAction.rejected, (state, action) => {
				state.loading = false;
				if (action.payload) {
					state.error = action.payload;
				} else {
					state.error = action.error;
				}
			});
	},
});

export const selectLoading = (state) => state.login.loading;
export const selectError = (state) => state.login.error;

export default loginSlice.reducer;
