import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
    Box,
    Card,
    CardContent,
    Checkbox,
    FormControl,
    FormControlLabel,
    Typography,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";
import { AuthButton } from "../../../components/AuthenticationBox/AuthenticationBox";
import { getSurvey, selectGetSurveyData, submitSurvey } from "../Survey.slice";
import { Routes } from "../../../navigation/Routes";
import { selectLoading } from "../../Survey/Survey.slice";
import LoaderCustom from "../../../components/LoaderCustom/LoaderCustom";

/* eslint-disable array-callback-return */
const GetSurvey = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const getSurveyData = useSelector(selectGetSurveyData);
	const loading = useSelector(selectLoading);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    useEffect(() => {
        dispatch(getSurvey({ id: id }));
    }, [id, dispatch]);

    const emailValidation = () => {
        if (errors.email?.type === "required") {
            return "email is required";
        } else if (errors.email?.type === "pattern") {
            return "invalid email";
        }
    };

	const onSubmit = async (data) => {
		let finalObj = {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			surveyId: getSurveyData.survey.id,
		};
		let finalAns = [];

        getSurveyData?.survey?.questions.map((obj) => {
            data?.singleChoice.map((singleData, index) => {
                if (obj.id === index) {
                    finalAns = [
                        ...finalAns,
                        {
                            surveyId: getSurveyData.survey.id,
                            questionId: index,
                            question: obj.question,
                            answerType: obj.answerType,
                            answer: singleData,
                            options: [
                                {
                                    answer: singleData,
                                    optionId: data?.singleChoiceId[index],
                                },
                            ],
                        },
                    ];
                }
            });

            data?.options?.map((multipleChoice, index) => {
                if (obj.id === index) {
                    const qus = multipleChoice.filter(
                        (data) => data.answer !== false
                    );
                    let objOfQues = [];
                    const queAns = qus.map(
                        (d) =>
                            (objOfQues = {
                                ...objOfQues,
                                answer: d.answer,
                                optionId: data?.optionsId[index],
                            })
                    );
                    finalAns = [
                        ...finalAns,
                        {
                            surveyId: getSurveyData.survey.id,
                            questionId: index,
                            question: obj.question,
                            answerType: obj.answerType,
                            answer: objOfQues.toString(),
                            options: queAns,
                        },
                    ];
                }
            });

			data?.description?.map((description, index) => {
				if (obj.id === index) {
					finalAns = [
						...finalAns,
						{
							surveyId: getSurveyData.survey.id,
							questionId: index,
							question: obj.question,
							answerType: obj.answerType,
							answer: description.answer,
							options: [],
						},
					];
				}
			});
		});
		finalObj = {
			...finalObj,
			answers: finalAns,
		};
		const result = await dispatch(submitSurvey(finalObj));
		if (result.type === submitSurvey.fulfilled.toString()) {
			navigate(Routes.thankYou);
		}
	};

    return (
        <Grid
            spacing={2}
            sx={{ maxWidth: "1440px", margin: "0 auto", padding: "20px" }}
        >
            <Card component={Paper} sx={{}}>
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ pb: 2 }}>
                        <Typography variant="h5" sx={{ mb: 3 }}>
                            {getSurveyData?.survey?.title}
                        </Typography>
                        <form
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <Grid container spacing={2} sx={{ mb: 5 }}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        {...register("firstName", {
                                            required: true,
                                        })}
                                        margin="none"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        name="firstName"
                                        autoComplete="firstName"
                                        autoFocus
                                        error={
                                            errors.firstName?.type ===
                                            "required"
                                        }
                                        helperText={
                                            errors.firstName?.type &&
                                            "first name is required"
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        {...register("lastName", {
                                            required: true,
                                        })}
                                        margin="none"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lastName"
                                        error={
                                            errors.lastName?.type === "required"
                                        }
                                        helperText={
                                            errors.lastName?.type &&
                                            "last name is required"
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        {...register("email", {
                                            required: true,
                                            pattern:
                                                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        })}
                                        margin="none"
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
                                </Grid>
                            </Grid>

                            <Typography
                                variant="h5"
                                sx={{ mb: 3, fontWeight: "500" }}
                            >
                                Please give answers for below questions
                            </Typography>

                            {getSurveyData?.survey?.questions.map(
                                (obj, index) => {
                                    return (
                                        <Box
                                            key={index}
                                            sx={{
                                                py: 2,
                                                borderBottom:
                                                    "1px dashed #d4d4d4",
                                            }}
                                        >
                                            <Typography variant="h6">
                                                {obj.question}
                                            </Typography>
                                            {obj.answerType ===
                                                "description" && (
                                                <TextField
                                                    {...register(
                                                        `description.${obj?.id}.answer`
                                                    )}
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="description"
                                                    label="Description"
                                                    name={`description.${obj?.id}.answer`}
                                                    autoComplete="description"
                                                />
                                            )}

                                            {obj.answerType ===
                                                "multipleChoice" &&
                                            obj?.options?.length
                                                ? obj?.options.map(
                                                      (obj, index) => (
                                                          <FormControl
                                                              key={index}
                                                          >
                                                              <>
                                                                  <input
                                                                      type="hidden"
                                                                      {...register(
                                                                          `optionsId.${obj.questionId}`
                                                                      )}
                                                                      value={
                                                                          obj.id
                                                                      }
                                                                  />
                                                                  <FormControlLabel
                                                                      control={
                                                                          <Checkbox
                                                                              row
                                                                              color="primary"
                                                                              {...register(
                                                                                  `options.${obj.questionId}.${index}.answer`
                                                                              )}
                                                                              value={
                                                                                  obj?.option
                                                                              }
                                                                          />
                                                                      }
                                                                      label={
                                                                          obj?.option
                                                                      }
                                                                  />
                                                              </>
                                                          </FormControl>
                                                      )
                                                  )
                                                : ""}
                                            {obj.answerType ===
                                                "singleChoice" && (
                                                <FormControl>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                    >
                                                        {obj?.options?.length
                                                            ? obj?.options.map(
                                                                  (
                                                                      obj,
                                                                      index
                                                                  ) => (
                                                                      <React.Fragment
                                                                          key={
                                                                              index
                                                                          }
                                                                      >
                                                                          <input
                                                                              type="hidden"
                                                                              {...register(
                                                                                  `singleChoiceId.${obj.questionId}`
                                                                              )}
                                                                              value={
                                                                                  obj.id
                                                                              }
                                                                          />
                                                                          <FormControlLabel
                                                                              {...register(
                                                                                  `singleChoice.${obj.questionId}`
                                                                              )}
                                                                              key={
                                                                                  index
                                                                              }
                                                                              value={
                                                                                  obj?.option
                                                                              }
                                                                              control={
                                                                                  <Radio />
                                                                              }
                                                                              label={
                                                                                  obj?.option
                                                                              }
                                                                          />
                                                                      </React.Fragment>
                                                                  )
                                                              )
                                                            : ""}
                                                    </RadioGroup>
                                                </FormControl>
                                            )}
                                        </Box>
                                    );
                                }
                            )}

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
				</Box>
			</CardContent>
			<LoaderCustom loading={loading} />
		</Card>
        </Grid>
	);
        
};

export default GetSurvey;
