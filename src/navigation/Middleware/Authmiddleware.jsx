import React, { useEffect } from "react";
import {
	Routes,
	Route,
	useLocation,
	useNavigate,
	Navigate,
} from "react-router-dom";
import { Routes as UserRoutes } from "../Routes";
import AppLayout from "../../app/AppLayout";

const PrivateRoute = ({ children }) => {
	if (localStorage.getItem("accessUser")) {
		return <AppLayout>{children}</AppLayout>;
	} else {
		return <Navigate to="/login" />;
	}
};

const PublicRoute = (props) => {
	if (localStorage.getItem("accessUser")) {
		return <Navigate to="/" />;
	} else {
		return props.children;
	}
};
const Authmiddleware = (props) => {
	const { path, Component, guard } = props;
	const { pathname } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (pathname === UserRoutes.home) {
			navigate(UserRoutes.surveyList);
		}
	}, [pathname, navigate]);

	return (
		<>
			<Routes>
				<Route
					exact
					path={path}
					element={
						guard ? (
							<PrivateRoute>
								<Component />
							</PrivateRoute>
						) : (
							<PublicRoute>
								<Component />
							</PublicRoute>
						)
					}
				/>
			</Routes>
		</>
	);
};

export default Authmiddleware;
