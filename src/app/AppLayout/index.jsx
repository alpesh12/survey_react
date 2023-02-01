import React from "react";
import { Box, Toolbar } from "@mui/material";
import LoaderCustom from "../../components/LoaderCustom/LoaderCustom";

import Footer from "./Footer";
import SideBar from "./Sidebar";
import { drawerWidth } from "./AppLayout.constants";
import Header from "./Header";

const AppLayout = ({ children }) => {
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<>
			<LoaderCustom />
			<Box sx={{ display: "flex" }} height="100vh">
				<Header handleDrawerToggle={handleDrawerToggle} />
				<Box
					component="nav"
					sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
					aria-label="mailbox folders"
				>
					<SideBar
						handleDrawerToggle={handleDrawerToggle}
						mobileOpen={mobileOpen}
					/>
				</Box>
				<Box
					component="main"
					display="flex"
					flexDirection="column"
					sx={{
						flexGrow: 1,
						width: { sm: `calc(100% - ${drawerWidth}px)` },
					}}
				>
					<Toolbar />
					<Box sx={{ p: 3 }} flex="1">
						{children}
					</Box>
					<Footer />
				</Box>
			</Box>
		</>
	);
};

export default AppLayout;
