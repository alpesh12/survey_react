import { styled } from "@mui/system";
import { Button } from "@mui/material";
import { theme } from "../../config/theme";

export const ButtonWhite = styled(Button)({
	backgroundColor: "#ffffff",
	color: theme.palette.primary.main,
	"&:hover": {
		backgroundColor: "#ffffff",
		color: theme.palette.primary.main,
	},
});
