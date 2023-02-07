import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthenticationService from "../../../services/API/Authentication";

export const registerAction = createAsyncThunk(
    "register/registerAction",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await AuthenticationService.doRegister(payload);
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
                message: err.response.data.data.message,
            });
        }
    }
);

const initialState = {
    loading: false,
    error: null,
};

export const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerAction.fulfilled, () => initialState)
            .addCase(registerAction.rejected, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.error = action.payload;
                } else {
                    state.error = action.error;
                }
            });
    },
});

export const selectLoading = (state) => state.register.loading;
export const selectError = (state) => state.register.error;

export default registerSlice.reducer;
