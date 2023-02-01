import { Routes } from "./Routes";
import Login from "../features/Authentication/Login";
import Register from "../features/Authentication/Register";
import CreateSurvey from "../features/Survey/CreateSurvey";
import GetSurvey from "../features/Survey/GetSurvey";
import SubmittedSurvey from "../features/Survey/SubmittedSurvey";
import SurveyList from "../features/Survey/SurveyList";
import ViewSubmittedSurvey from "../features/Survey/ViewSubmittedSurvey";
import Thankyou from "../features/Thankyou";

export const Screens = {
	Login: {
		title: "Login",
		path: Routes.login,
		component: Login,
		guard: false,
	},
	register: {
		title: "Register",
		path: Routes.register,
		component: Register,
		guard: false,
	},
	SurveyList: {
		title: "Survey List",
		path: Routes.surveyList,
		component: SurveyList,
		guard: true,
	},
	SurveyCreate: {
		title: "Survey Create",
		path: Routes.createSurvey,
		component: CreateSurvey,
		guard: true,
	},
	SubmittedSurvey: {
		title: "Submitted Survey",
		path: Routes.submittedSurvey,
		component: SubmittedSurvey,
		guard: true,
	},
	ViewSubmittedSurvey: {
		title: "View Submitted Survey",
		path: Routes.ViewSubmittedSurvey,
		component: ViewSubmittedSurvey,
		guard: true,
	},
	GetSurvey: {
		title: "Get Survey",
		path: Routes.getSurvey,
		component: GetSurvey,
		guard: false,
	},
	Thankyou: {
		title: "Thank You",
		path: Routes.thankYou,
		component: Thankyou,
		guard: false,
	},
};
