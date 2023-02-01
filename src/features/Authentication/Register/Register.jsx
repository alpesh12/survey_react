import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from "@mui/material";
import { registerAction, selectLoading } from "./Register.slice";
import { Routes } from "../../../navigation/Routes";
import {
	AuthPageContainer,
	AuthBox,
	AuthButton,
} from "../../../components/AuthenticationBox/AuthenticationBox";
import LoaderCustom from "../../../components/LoaderCustom/LoaderCustom";

const Register = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		control,
	} = useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loading = useSelector(selectLoading);
	const onSubmit = async (data) => {
		const result = await dispatch(registerAction(data));
		if (result.type === registerAction.fulfilled.toString()) {
			navigate(Routes.login);
		}
	};

	const emailValidation = () => {
		if (errors.email?.type === "required") {
			return "email is required";
		} else if (errors.email?.type === "pattern") {
			return "invalid email";
		}
	};

	return (
		<AuthPageContainer>
			<AuthBox
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography component="h1" variant="h5" sx={{ mb: 3 }}>
					Sign up
				</Typography>
				<form
					component="form"
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					sx={{ mt: 1 }}
				>
					<TextField
						{...register("firstName", { required: true })}
						margin="normal"
						required
						fullWidth
						id="firstName"
						label="First Name"
						name="firstName"
						autoComplete="firstName"
						autoFocus
						error={errors.firstName?.type === "required"}
						helperText={
							errors.firstName?.type && "first name is required"
						}
					/>
					<TextField
						{...register("lastName", { required: true })}
						margin="normal"
						required
						fullWidth
						id="lastName"
						label="Last Name"
						name="lastName"
						autoComplete="lastName"
						error={errors.lastName?.type === "required"}
						helperText={
							errors.lastName?.type && "last name is required"
						}
					/>
					<TextField
						{...register("email", {
							required: true,
							pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
						})}
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						error={
							errors.email?.type === "required" ||
							errors.email?.type === "pattern"
						}
						helperText={emailValidation()}
					/>
					<TextField
						{...register("password", { required: true })}
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="password"
						error={errors.password?.type === "required"}
						helperText={
							errors.password?.type && "password is required"
						}
					/>
					<FormControl component="fieldset">
						<FormLabel component="legend">Gender</FormLabel>
						<Controller
							rules={{ required: true }}
							control={control}
							name="gender"
							defaultValue="male"
							render={({ field }) => {
								return (
									<RadioGroup {...field} row>
										<FormControlLabel
											value="male"
											control={<Radio />}
											label="Male"
										/>
										<FormControlLabel
											value="female"
											control={<Radio />}
											label="Female"
										/>

										<FormControlLabel
											value="other"
											control={<Radio />}
											label="Other"
										/>
									</RadioGroup>
								);
							}}
						/>
					</FormControl>
					<AuthButton
						type="submit"
						fullWidth
						variant="contained"
						size="large"
						sx={{ mt: 3, mb: 3 }}
					>
						Sign Up
					</AuthButton>
					<Typography variant="body2" align="center">
						Already have you account? &nbsp;
						<Link to={Routes.login} variant="body2">
							Login Now
						</Link>
					</Typography>
				</form>
			</AuthBox>
			<LoaderCustom loading={loading} />
		</AuthPageContainer>
	);
};

export default Register;
