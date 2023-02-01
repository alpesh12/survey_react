import React from "react";
import { useLocation } from "react-router-dom";

import { Typography, Card, CardContent, Paper, Box } from "@mui/material";

const ViewSubmittedSurvey = () => {
	const loction = useLocation();

	return (
		<Card component={Paper} sx={{}}>
			<CardContent>
				<Box sx={{ pb: 2 }}>
					<Typography variant="h5">
						Name:{" "}
						{`${loction?.state?.firstName} ${loction?.state?.lastName}`}
					</Typography>
					<Typography variant="body2" sx={{ fontWeight: "500" }}>
						Email: {`${loction?.state?.email}`}
					</Typography>
				</Box>
				{loction.state?.answers?.length &&
					loction.state?.answers?.map((obj, index) => (
						<React.Fragment key={index}>
							<Box
								key={index}
								sx={{
									py: 2,
									borderBottom: "1px dashed #d4d4d4",
								}}
							>
								<Typography variant="h6">
									Q{index + 1}. {obj?.question}
								</Typography>
								<Typography variant="body1">
									Ans{index + 1}. {obj?.answer}
								</Typography>
							</Box>
						</React.Fragment>
					))}
			</CardContent>
		</Card>
	);
};

export default ViewSubmittedSurvey;
