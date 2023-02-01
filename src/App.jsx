import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import Authmiddleware from "./navigation/Middleware/Authmiddleware";
import { Screens } from "./navigation/Screens";
import { theme } from "./config/theme";
import { Routes as UseRoute } from "./navigation/Routes";

const App = () => {
	const { pathname } = useLocation();

	const getRoutes = () => {
		return Object.entries(Screens).map((item, index) => {
			const [name, props] = item;
			const { path, component: Component, guard, ...optProps } = props;
			const toPath = pathname.toString().split("/");

			return (
				<React.Fragment key={index}>
					{pathname !== UseRoute.thankYou &&
					pathname !== `/survey/${toPath[2]}/${toPath[3]}` ? (
						<Authmiddleware
							key={name}
							path={path}
							guard={guard}
							Component={Component}
							{...optProps}
						/>
					) : (
						<Routes>
							<Route exact path={path} element={<Component />} />
						</Routes>
					)}
				</React.Fragment>
			);
		});
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{getRoutes()}
		</ThemeProvider>
	);
};

export default App;
