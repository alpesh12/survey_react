import { styled } from "@mui/system";
import { Box, Button } from "@mui/material";

export const AuthPageContainer = styled("div")({
	minHeight: "100vh",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "20px 0",
	boxSizing: "border-box",
	backgroundColor: "#bde5e5",
});

export const AuthBox = styled(Box)({
	maxWidth: "450px",
	width: "100%",
	backgroundColor: "#ffffff",
	margin: "0 auto",
	padding: "40px",
	borderRadius: "6px",
	boxShadow: "0 0 35px rgba(0, 0, 0, 0.2)",
	"& .error": {
		margin: "0",
		color: "#f00000",
	},
});

export const AuthButton = styled(Button)({
	padding: "15px 20px",
});
