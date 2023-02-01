import React from "react";
import { Paper, CardContent, Card, Typography, Box } from "@mui/material";

const Thankyou = () => {
	return (
		<Box
			sx={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Card component={Paper} sx={{}}>
				<CardContent>
					<Typography
						variant="h4"
						sx={{ p: 3, textAlign: "center", fontWeight: 600 }}
						color="primary"
					>
						Thank you for submiting your feedback.
					</Typography>
				</CardContent>
			</Card>
		</Box>
	);
};

export default Thankyou;
