import axios from "axios";

export const axiosInterceptor = axios.create({
	baseURL: process.env.REACT_APP_CORE_API_SERVER,
});

// Add a request interceptor
axiosInterceptor.interceptors.request.use(
	function (config) {
		if (localStorage.getItem("accessUser")) {
			config.headers["x-access-token"] = `${localStorage.getItem(
				"accessUser"
			)}`;
		}
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
axiosInterceptor.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		const errorCatch =
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500;

		if (!errorCatch) {
			console.error("somethimg went Wrong please try again sometime");
		}
		return Promise.reject(error);
	}
);
