const API = {
	login: {
		post: "admin/login",
	},
	register: {
		post: "admin/register",
	},
	surveyList: {
		post: "survey/list",
	},
	surveyListDestroy: {
		delete: "survey/delete",
	},
	viewSurvey: {
		get: "survey/submitted-survey",
	},
	createSurvey: {
		post: "survey/create",
	},
	submittedSurveyList: {
		post: "survey/submitted-survey",
	},
	getSurvey: {
		get: "survey/get",
	},
	submitSurvey: {
		post: "survey/submit",
	},
};

export default API;
