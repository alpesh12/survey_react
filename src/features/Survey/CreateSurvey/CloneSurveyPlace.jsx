import React, { useEffect } from "react";
import { useFieldArray } from "react-hook-form";

import { Add, Clear } from "@mui/icons-material";
import { Grid, TextField } from "@mui/material";

import { AuthButton } from "../../../components/AuthenticationBox/AuthenticationBox";

const CloneSurveyPlace = ({ nestIndex, control, register }) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name: `questions[${nestIndex}].options`,
	});

	useEffect(() => {
		if (!fields.length) {
			append({ option: [] });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Grid container item spacing={3}>
				<Grid item xs={10}>
					<Grid container spacing={2}>
						{fields.map((item, indexKey) => {
							return (
								<React.Fragment key={indexKey}>
									<Grid item xs={10}>
										<TextField
											{...register(
												`questions[${nestIndex}].options[${indexKey}].option`
											)}
											margin="none"
											required
											label="Op"
											sx={{ width: "100%" }}
										/>
									</Grid>
									<Grid item xs={2}>
										<AuthButton
											type="button"
											fullWidth
											variant="outlined"
											color="error"
											startIcon={<Clear />}
											onClick={() => remove(indexKey)}
										>
											Delete
										</AuthButton>
									</Grid>
								</React.Fragment>
							);
						})}
					</Grid>
				</Grid>
				<Grid
					item
					xs={2}
					display="flex"
					sx={{ alignItems: "flex-end" }}
				>
					<AuthButton
						type="button"
						variant="outlined"
						fullWidth
						color="success"
						startIcon={<Add />}
						onClick={() => {
							append({ option: [] });
						}}
					>
						Add Option
					</AuthButton>
				</Grid>
			</Grid>
		</>
	);
};

export default CloneSurveyPlace;
