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
} from "@mui/material";
import { Visibility } from "@mui/icons-material";

import {
	selectSubmittedSurveyData,
	submittedSurveyList,
} from "../Survey.slice";
import { PaginationCustom } from "../../../components/PaginationCustom/PaginationCustom";
import { Routes } from "../../../navigation/Routes";

const SubmittedSurvey = () => {
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(0);
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const list = useSelector(selectSubmittedSurveyData);

	useEffect(() => {
		dispatch(submittedSurveyList({ page }));
	}, [dispatch, page]);

	useEffect(() => {
		if (list) {
			setPageCount(
				Math.ceil(list?.total_count / list?.item_per_page) || 0
			);
		}
	}, [list]);

	const handleChange = (_, value) => {
		setPage(value);
	};
	return (
		<Card component={Paper} sx={{}}>
			<CardContent>
				<TableContainer sx={{ mb: 3 }}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="left" sx={{ width: "50px" }}>
									No.
								</TableCell>
								<TableCell align="left">Name</TableCell>
								<TableCell align="left">Email</TableCell>
								<TableCell align="right">Action</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{list?.data?.map((row, index) => (
								<TableRow
									key={index}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}
								>
									<TableCell
										component="th"
										scope="row"
										align="center"
									>
										{row.id}
									</TableCell>
									<TableCell align="left">
										{`${row.firstName} ${row.lastName}`}
									</TableCell>
									<TableCell align="left">
										{`${row.email}`}
									</TableCell>
									<TableCell align="right">
										<IconButton
											aria-label="copy"
											color="success"
											onClick={() =>
												navigate(
													Routes.ViewSubmittedSurvey.replace(
														":id",
														row.id
													),
													{ state: row }
												)
											}
										>
											<Visibility />
										</IconButton>
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
	);
};

export default SubmittedSurvey;
