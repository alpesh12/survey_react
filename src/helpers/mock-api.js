import MockAdapter from "axios-mock-adapter";
import API from "../constants/API";
import { axiosInterceptor } from "../utils/axioshttp";

const ACCESS_TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

const Users = [
	{
		uid: 1,
		password: "12345",
		email: "reactexpress@logistic.com",
	},
];

const MockAPI = () => {
	// This sets the mock adapter on the default instance
	const mock = new MockAdapter(axiosInterceptor);
	let surveyList = [];
	let deleteNode = false;

	mock.onPost(API.login.post).reply((config) => {
		const user = JSON.parse(config.data);
		const validUser = Users.filter(
			(usr) => usr.email === user.email && usr.password === user.password
		);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (validUser.length === 1) {
					// You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
					const token = ACCESS_TOKEN;

					// JWT AccessToken
					const tokenObj = { accessToken: token }; // Token Obj
					const userObj = {
						uid: validUser[0].uid,
						email: validUser[0].email,
					};
					const validUserObj = { ...userObj, ...tokenObj }; // validUser Obj

					resolve([
						200,
						{
							success: true,
							results: validUserObj,
						},
					]);
				} else {
					reject(
						new Error(
							"Email and password are invalid. Please enter correct email and password"
						)
					);
				}
			});
		});
	});

	mock.onPost(API.register.post).reply((config) => {
		const user = JSON.parse(config.data);
		const uidObj = {
			uid: 2,
			role: "admin",
		};
		const userObj = { ...user, ...uidObj };
		Users.push(userObj);
		return new Promise((resolve, reject) => {
			if (resolve) {
				setTimeout(() => {
					resolve([
						200,
						{
							success: true,
							results: userObj,
						},
					]);
				});
			} else {
				reject(
					new Error(
						"Email and password are invalid. Please enter correct email and password"
					)
				);
			}
		});
	});

	mock.onGet(API.surveyList.post).reply((config) => {
		if (deleteNode) {
			surveyList = surveyList;
		} else if (config?.params?.page === 1) {
			surveyList = [
				{ no: 1, title: "Gingerbread" },
				{ no: 2, title: "abc" },
				{ no: 3, title: "gfd" },
				{ no: 4, title: "gfd" },
				{ no: 5, title: "gfd" },
				{ no: 6, title: "gfd" },
				{ no: 7, title: "gfd" },
				{ no: 8, title: "gfd" },
				{ no: 9, title: "gfd" },
				{ no: 10, title: "gfd" },
			];
		} else if (config?.params?.page === 2) {
			surveyList = [
				{ no: 11, title: "Gingerbread" },
				{ no: 12, title: "abc" },
				{ no: 13, title: "gfd" },
				{ no: 14, title: "gfd" },
				{ no: 15, title: "gfd" },
			];
		}
		return new Promise((resolve, reject) => {
			if (resolve) {
				setTimeout(() => {
					resolve([
						200,
						{
							success: true,
							results: {
								item_per_page: 10,
								total_count: 15,
								surveyList,
							},
						},
					]);
				});
			} else {
				reject(
					new Error(
						"Email and password are invalid. Please enter correct email and password"
					)
				);
			}
		});
	});

	mock.onDelete(API.surveyListDestroy.delete).reply((config) => {
		surveyList = surveyList.filter((obj) => obj.no !== config.params?.id);
		deleteNode = true;
		return new Promise((resolve, reject) => {
			if (resolve) {
				setTimeout(() => {
					resolve([
						200,
						{
							success: true,
							results: surveyList,
						},
					]);
				});
			} else {
				reject(
					new Error(
						"Email and password are invalid. Please enter correct email and password"
					)
				);
			}
		});
	});
	mock.onGet(API.viewSurvey.get).reply((config) => {
		let viewData = {};
		if (config.params.id === "1") {
			viewData = {
				firstName: "Chhatrapati",
				lastName: "Sivaji",
				email: "Sivaji@hindswaraj.com",
				title: "Azadi",
				QuesAns: [
					{
						Q: "Hind Swaraj or Indian Home Rule is a book written by Mohandas K. Gandhi in 1909. ... In it he expresses his views on Swaraj, modern civilization",
						ans: "Hind Swaraj or Indian Home Rule is a book written by Mohandas K. Gandhi in 1909. ... In it he expresses his views on Swaraj, modern civilization",
					},
					{
						Q: "Hind Swaraj or Indian Home Rule is a book written by Mohandas K. Gandhi in 1909. ... In it he expresses his views on Swaraj, modern civilization",
						ans: "Hind Swaraj or Indian Home Rule is a book written by Mohandas K. Gandhi in 1909. ... In it he expresses his views on Swaraj, modern civilization",
					},
				],
			};
		} else {
			viewData = {
				firstName: "sangeet",
				lastName: "dolasia",
				email: "Sivaji@hindswaraj.com",
				title: "Azadi",
				QuesAns: [
					{
						Q: "In it he expresses his views on Swaraj, modern civilization",
						ans: "In it he expresses his views on Swaraj, modern civilization",
					},
					{
						Q: "In it he expresses his views on Swaraj, modern civilization",
						ans: "In it he expresses his views on Swaraj, modern civilization",
					},
				],
			};
		}

		return new Promise((resolve, reject) => {
			if (resolve) {
				setTimeout(() => {
					resolve([
						200,
						{
							success: true,
							results: viewData,
						},
					]);
				});
			} else {
				reject(
					new Error(
						"Email and password are invalid. Please enter correct email and password"
					)
				);
			}
		});
	});
};

export default MockAPI;
