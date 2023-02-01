/* eslint-disable import/no-anonymous-default-export */
import API from "../../../constants/API";
import { axiosInterceptor } from "../../../utils/axioshttp";

const surveyList = async (payload) => {
	const uri = API.surveyList.post;
	const response = await axiosInterceptor.post(uri, payload);
	return response;
};
const surveyListDestroy = async (payload) => {
	const uri = `${API.surveyListDestroy.delete}/${payload.id}`;
	const response = await axiosInterceptor.delete(uri);
	return response;
};
const createSurvey = async (payload) => {
	const uri = API.createSurvey.post;
	const response = await axiosInterceptor.post(uri, payload);
	return response;
};

const submittedSurveyList = async (payload) => {
	const uri = API.submittedSurveyList.post;
	const response = await axiosInterceptor.post(uri, payload);
	return response;
};
const getSurvey = async (payload) => {
	const uri = `${API.getSurvey.get}/${payload.id}`;
	const response = await axiosInterceptor.get(uri, payload);
	return response;
};
const submitSurvey = async (payload) => {
	const uri = API.submitSurvey.post;
	const response = await axiosInterceptor.post(uri, payload);
	return response;
};

export default {
	surveyList,
	surveyListDestroy,
	createSurvey,
	submittedSurveyList,
	getSurvey,
	submitSurvey,
};
