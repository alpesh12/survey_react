import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	CardContent,
	Card,
	IconButton,
	Button,
	Box,
} from "@mui/material";
import { ContentCopy, Delete, OpenInNew } from "@mui/icons-material";

import {
	selectList,
	surveyListAction,
	surveyListDestroy,
} from "../Survey.slice";
import { PaginationCustom } from "../../../components/PaginationCustom/PaginationCustom";
import { Routes } from "../../../navigation/Routes";

const SurveyList = () => {
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(0);
	const [deleteNode, setDeleteNode] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const list = useSelector(selectList);

	useEffect(() => {
		if (deleteNode) {
			setDeleteNode(false);
		}
		dispatch(surveyListAction({ page }));
	}, [dispatch, page, deleteNode]);

	const handleChange = (event, value) => {
		setPage(value);
	};

	useEffect(() => {
		if (list) {
			setPageCount(
				Math.ceil(list?.total_count / list?.item_per_page) || 0
			);
		}
	}, [list]);

	return (
		<>
			<Card component={Paper} sx={{}}>
				<CardContent>
					<Box sx={{ mb: 2 }} display="flex">
						<Button
							variant="outlined"
							sx={{ ml: "auto" }}
							onClick={() => navigate(Routes.createSurvey)}
						>
							Create Survey
						</Button>
					</Box>
					<TableContainer sx={{ mb: 3 }}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell
										align="center"
										sx={{ width: "60px" }}
									>
										No.
									</TableCell>
									<TableCell align="left">
										Survey Title
									</TableCell>
									<TableCell align="right">Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{list?.data?.map((row) => (
									<TableRow
										key={row.surveyId}
										sx={{
											"&:last-child td, &:last-child th":
												{ border: 0 },
										}}
									>
										<TableCell component="th" scope="row">
											{row.surveyId}
										</TableCell>
										<TableCell align="left">
											{row.title}
										</TableCell>
										<TableCell align="right">
											<>
												<IconButton
													aria-label="copy"
													color="secondary.light"
													onClick={() => {
														navigator.clipboard.writeText(
															`${window.location.hostname}/survey/${row.surveyId}/${row.id}`
														);
													}}
												>
													<ContentCopy />
												</IconButton>
												<IconButton
													aria-label="copy"
													color="secondary.light"
													onClick={() => {
														navigate(
															`/survey/${row.surveyId}/${row.id}`
														);
													}}
												>
													<OpenInNew />
												</IconButton>
												<IconButton
													aria-label="delete"
													color="primary"
													onClick={async () => {
														const result =
															await dispatch(
																surveyListDestroy(
																	{
																		id: row.id,
																	}
																)
															);
														if (
															result.type ===
															surveyListDestroy.fulfilled.toString()
														) {
															setDeleteNode(true);
														}
													}}
												>
													<Delete />
												</IconButton>
											</>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<PaginationCustom
						color="primary"
						className="paginationRight"
						count={pageCount}
						page={page}
						onChange={handleChange}
					/>
				</CardContent>
			</Card>
		</>
	);
};
export default SurveyList;
