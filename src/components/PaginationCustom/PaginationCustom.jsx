import { styled } from "@mui/system";
import { Pagination } from "@mui/material";

export const PaginationCustom = styled(Pagination)({
	"&.paginationRight": {
		".MuiPagination-ul": {
			justifyContent: "flex-end",
		},
	},
});
