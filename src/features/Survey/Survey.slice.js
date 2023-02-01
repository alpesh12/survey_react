import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import SurveyListService from "../../services/API/Survey";

export const surveyListAction = createAsyncThunk(
	"survey/surveyListAction",
	async (payload, { rejectWithValue }) => {
		try {
			const response = await SurveyListService.surveyList(payload);
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

export const surveyListDestroy = createAsyncThunk(
	"survey/surveyListDestroyAction",
	async (payload, { rejectWithValue }) => {
		try {
			const response = await SurveyListService.surveyListDestroy(payload);
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

export const viewSurvey = createAsyncThunk(
	"survey/viewSurveyAction",
	async (payload, { rejectWithValue }) => {
		try {
			const response = await SurveyListService.viewSurvey(payload);
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
export const createSurvey = createAsyncThunk(
	"survey/createSurveyAction",
	async (payload, { rejectWithValue }) => {
		try {
			const response = await SurveyListService.createSurvey(payload);
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
export const submittedSurveyList = createAsyncThunk(
	"survey/submittedSurveyListAction",
	async (payload, { rejectWithValue }) => {
		try {
			const response = await SurveyListService.submittedSurveyList(
				payload
			);
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

export const getSurvey = createAsyncThunk(
	"survey/getSurveyAction",
	async (payload, { rejectWithValue }) => {
		try {
			const response = await SurveyListService.getSurvey(payload);
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
export const submitSurvey = createAsyncThunk(
	"survey/submitSurveyAction",
	async (payload, { rejectWithValue }) => {
		try {
			const response = await SurveyListService.submitSurvey(payload);
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
	surveyList: {},
	viewSurveyData: {},
	getSurveyData: {},
};

export const surveySlice = createSlice({
	name: "survey",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(surveyListAction.pending, (state) => {
				state.loading = true;
			})
			.addCase(surveyListAction.fulfilled, (state, action) => {
				state.loading = false;
				state.surveyList = action.payload;
			})
			.addCase(surveyListAction.rejected, (state, action) => {
				state.loading = false;
				if (action.payload) {
					state.error = action.payload;
				} else {
					state.error = action.error;
				}
			})
			.addCase(viewSurvey.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(viewSurvey.fulfilled, (state, action) => {
				state.loading = false;
				state.viewSurveyData = action.payload;
			})
			.addCase(viewSurvey.rejected, (state, action) => {
				state.loading = false;
				if (action.payload) {
					state.error = action.payload;
				} else {
					state.error = action.error;
				}
			})
			.addCase(submittedSurveyList.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(submittedSurveyList.fulfilled, (state, action) => {
				state.loading = false;
				state.submittedSurveyData = action.payload;
			})
			.addCase(submittedSurveyList.rejected, (state, action) => {
				state.loading = false;
				if (action.payload) {
					state.error = action.payload;
				} else {
					state.error = action.error;
				}
			})
			.addCase(getSurvey.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getSurvey.fulfilled, (state, action) => {
				state.loading = false;
				state.getSurveyData = action.payload;
			})
			.addCase(getSurvey.rejected, (state, action) => {
				state.loading = false;
				if (action.payload) {
					state.error = action.payload;
				} else {
					state.error = action.error;
				}
			})
			.addCase(submitSurvey.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(submitSurvey.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(submitSurvey.rejected, (state, action) => {
				state.loading = false;
				if (action.payload) {
					state.error = action.payload;
				} else {
					state.error = action.error;
				}
			})
			.addCase(createSurvey.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(createSurvey.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(createSurvey.rejected, (state, action) => {
				state.loading = false;
				if (action.payload) {
					state.error = action.payload;
				} else {
					state.error = action.error;
				}
			})
			.addCase(surveyListDestroy.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(surveyListDestroy.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(surveyListDestroy.rejected, (state, action) => {
				state.loading = false;
				if (action.payload) {
					state.error = action.payload;
				} else {
					state.error = action.error;
				}
			});
	},
});

export const selectLoading = (state) => state.survey.loading;
export const selectError = (state) => state.survey.error;
export const selectList = (state) => state.survey.surveyList;
export const selectViewSurveyData = (state) => state.survey.viewSurveyData;
export const selectSubmittedSurveyData = (state) =>
	state.survey.submittedSurveyData;
export const selectGetSurveyData = (state) => state.survey.getSurveyData;

export default surveySlice.reducer;
