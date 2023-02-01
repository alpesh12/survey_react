import { styled } from "@mui/system";
import { CircularProgress, Box } from "@mui/material";

const LoaderCustomCmp = styled(Box)({
	minHeight: "100vh",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "0",
	boxSizing: "border-box",
	backgroundColor: "rgba(255, 255, 255, 0.8)",
	position: "fixed",
	left: "0",
	top: "0",
	right: "0",
	bottom: "0",
	zIndex: "11111",
});

const LoaderCustom = ({ loading }) => {
	return (
		<>
			{loading && (
				<LoaderCustomCmp>
					<CircularProgress color="primary" />
				</LoaderCustomCmp>
			)}
		</>
	);
};

export default LoaderCustom;
