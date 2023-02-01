import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TextField, Typography } from "@mui/material";

import { Routes } from "../../../navigation/Routes";
import { loginAction, selectLoading } from "./Login.slice";
import {
	AuthPageContainer,
	AuthBox,
	AuthButton,
} from "../../../components/AuthenticationBox/AuthenticationBox";
import LoaderCustom from "../../../components/LoaderCustom/LoaderCustom";

const Login = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loading = useSelector(selectLoading);

	const onSubmit = async (data) => {
		const result = await dispatch(loginAction(data));
		if (result.type === loginAction.fulfilled.toString()) {
			localStorage.setItem("accessUser", result.payload.token);
			navigate(Routes.surveyList);
		}
	};

	const emailValidation = () => {
		if (errors.email?.type === "required") {
			return "email is required";
		} else if (errors.email?.type === "pattern") {
			return errors.email?.message;
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
					Sign in
				</Typography>
				<form
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					sx={{ mt: 1 }}
				>
					<TextField
						{...register("email", {
							required: true,
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "invalid email address",
							},
						})}
						fullWidth
						margin="normal"
						id="email"
						label="Email Address"
						name="email"
						required
						autoComplete="new-email"
						helperText={emailValidation()}
						error={
							errors.email?.type === "required" ||
							errors.email?.type === "pattern"
						}
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
						autoComplete="current-password"
						error={errors.password?.type === "required"}
						helperText={
							errors.password?.type && "password is required"
						}
					/>
					<AuthButton
						type="submit"
						fullWidth
						variant="contained"
						size="large"
						sx={{ mt: 3, mb: 3 }}
					>
						Sign In
					</AuthButton>

					<Typography variant="body2" align="center">
						Don't have an account? &nbsp;
						<Link to={Routes.register} sx={{ ml: 1 }}>
							{"Sign Up"}
						</Link>
					</Typography>
				</form>
			</AuthBox>
			<LoaderCustom loading={loading} />
		</AuthPageContainer>
	);
};

export default Login;
