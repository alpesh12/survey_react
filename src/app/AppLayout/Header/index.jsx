import * as React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import LoaderCustom from "../../../components/LoaderCustom/LoaderCustom";
import { ButtonWhite } from "../../../components/ButtonWhite/ButtonWhite";
import { drawerWidth } from "../AppLayout.constants";
import { Routes } from "../../../navigation/Routes";
import { selectLoading } from "../../../features/Survey/Survey.slice";

const Header = ({ handleDrawerToggle }) => {
	const { id } = useParams();
	const location = useLocation();
	const navigate = useNavigate();

	const loading = useSelector(selectLoading);

	return (
		<>
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: 1 }}
					>
						{location.pathname === Routes.surveyList &&
							"Survey List"}
						{location.pathname === Routes.submittedSurvey &&
							"Submitted Survey"}
						{location.pathname ===
							Routes.ViewSubmittedSurvey.replace(":id", id) &&
							"List Of Q&A"}
						{location.pathname === Routes.createSurvey &&
							"Create Survey"}
						{location.pathname ===
							Routes.getSurvey.replace(":id", id) && "Get Survey"}
					</Typography>
					<ButtonWhite
						onClick={() => {
							localStorage.removeItem("accessUser");
							navigate(Routes.login);
						}}
					>
						Logout
					</ButtonWhite>
				</Toolbar>
			</AppBar>
			<LoaderCustom loading={loading} />
		</>
	);
};

export default Header;
