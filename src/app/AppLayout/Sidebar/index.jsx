import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
	Box,
	Drawer,
	Toolbar,
	List,
	Divider,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { Typography } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PollIcon from "@mui/icons-material/Poll";

import { Routes } from "../../../navigation/Routes";
import { drawerWidth } from "../AppLayout.constants";

const SideBarList = [
	{
		title: "Survey List",
		path: Routes.surveyList,
	},
	{
		title: "Submitted Survey",
		path: Routes.submittedSurvey,
	},
];

const SideBar = ({ handleDrawerToggle, mobileOpen }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const drawer = (
		<>
			<Toolbar>
				<Typography variant="h5">Survey demo</Typography>
			</Toolbar>
			<Divider />
			<Box sx={{ overflow: "auto" }}>
				<List>
					{SideBarList.map((text, index) => (
						<ListItem
							key={text.title}
							disablePadding
							onClick={() => navigate(text?.path)}
						>
							<ListItemButton
								selected={location.pathname === text?.path}
							>
								<ListItemIcon>
									{index % 2 === 0 ? (
										<PollIcon />
									) : (
										<PlaylistAddIcon />
									)}
								</ListItemIcon>
								<ListItemText primary={text.title} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>
		</>
	);

	return (
		<>
			<Drawer
				variant="temporary"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
				sx={{
					display: { xs: "block", sm: "none" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						width: drawerWidth,
					},
				}}
			>
				{drawer}
			</Drawer>
			<Drawer
				variant="permanent"
				sx={{
					display: { xs: "none", sm: "block" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						width: drawerWidth,
					},
				}}
				open
			>
				{drawer}
			</Drawer>
		</>
	);
};

export default SideBar;
