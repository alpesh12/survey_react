import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Add, Clear } from "@mui/icons-material";
import {
	MenuItem,
	TextField,
	Paper,
	CardContent,
	Card,
	Grid,
	Typography,
} from "@mui/material";

import { AuthButton } from "../../../components/AuthenticationBox/AuthenticationBox";
import { createSurvey } from "../Survey.slice";
import CloneSurveyPlace from "./CloneSurveyPlace";
import { Routes } from "../../../navigation/Routes";

const CreateSurvey = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { register, control, handleSubmit } = useForm({
		defaultValues: {
			questions: [
				{ question: "", answerType: "description", options: [] },
			],
		},
	});
	const { fields, append, remove } = useFieldArray({
		control,
		name: "questions",
	});

	const [dropdownChange, setDropdownChange] = useState({
		0: { option: "description" },
	});

	const onSubmit = (data) => {
		const result = dispatch(createSurvey(data));
		if (result.type === createSurvey.fulfilled.toString()) {
			navigate(Routes.surveyList);
		}
	};

	const answer = [
		{
			value: "singleChoice",
			label: "Single Choice",
		},
		{
			value: "multipleChoice",
			label: "Multiple Choice",
		},
		{
			value: "description",
			label: "Description",
		},
	];

	useEffect(() => {
		fields.map((item, index) =>
			setDropdownChange({
				...dropdownChange,
				[index]: {
					option: item?.answerType,
				},
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fields]);

	return (
		<Card component={Paper} sx={{}}>
			<CardContent>
				<Typography variant="h5">Create Survey</Typography>

				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								{...register("title", { required: true })}
								margin="normal"
								required
								label="Title"
								sx={{ width: "100%" }}
							/>
						</Grid>
						{fields.map((item, index) => {
							return (
								<React.Fragment key={index}>
									<Grid
										container
										item
										spacing={3}
										key={item.id}
									>
										<Grid item xs={12} md={5}>
											<TextField
												{...register(
													`questions.${index}.question`,
													{
														required: true,
													}
												)}
												margin="none"
												required
												label="Question"
												sx={{ width: "100%" }}
											/>
										</Grid>
										<Grid item xs={12} md={5}>
											<TextField
												{...register(
													`questions.${index}.answerType`,
													{
														required: true,
													}
												)}
												sx={{ width: "100%" }}
												select
												label="Answer Type"
												defaultValue="description"
												onChange={(e) =>
													setDropdownChange({
														...dropdownChange,
														[index]: {
															option: e.target
																.value,
														},
													})
												}
											>
												{answer.map((option) => (
													<MenuItem
														key={option.value}
														value={option.value}
													>
														{option.label}
													</MenuItem>
												))}
											</TextField>
										</Grid>

										<Grid item xs>
											<AuthButton
												type="button"
												fullWidth
												variant="outlined"
												color="error"
												startIcon={<Clear />}
												onClick={() => remove(index)}
											>
												Delete
											</AuthButton>
										</Grid>
									</Grid>
									{dropdownChange[index]?.option !==
										"description" && (
										<CloneSurveyPlace
											nestIndex={index}
											{...{ control, register }}
										/>
									)}
								</React.Fragment>
							);
						})}
						<Grid item xs={4}>
							<AuthButton
								type="button"
								variant="outlined"
								color="success"
								startIcon={<Add />}
								onClick={() => {
									append({
										question: "",
										answerType: "description",
									});
								}}
							>
								Add Row
							</AuthButton>
						</Grid>
					</Grid>

					<AuthButton
						type="submit"
						fullWidth
						variant="contained"
						size="large"
						sx={{ mt: 3 }}
					>
						Submit
					</AuthButton>
				</form>
			</CardContent>
		</Card>
	);
};

export default CreateSurvey;
