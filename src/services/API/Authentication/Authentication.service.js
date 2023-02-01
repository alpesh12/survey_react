import API from "../../../constants/API";
import { axiosInterceptor } from "../../../utils/axioshttp";

/* eslint-disable import/no-anonymous-default-export */
const doLogin = async (payload) => {
	const uri = API.login.post;
	const response = await axiosInterceptor.post(uri, payload);
	return response;
};
const doRegister = async (payload) => {
	const uri = API.register.post;
	const response = await axiosInterceptor.post(uri, payload);
	return response;
};
export default {
	doRegister,
	doLogin,
};
