import React from 'react'
import API_URL from '../../api/API_URL'
import axios from 'axios'
import MUIDataTable from 'mui-datatables'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { Button, Divider, Stack, Typography } from '@mui/material'
import IconButton from '@material-ui/core/IconButton'
import CleanHandsIcon from '@mui/icons-material/CleanHands'
import { Field, Form, Formik } from 'formik'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { saveAppointment } from '../../api/api'

export default function Appointments() {
	const { patientId } = useParams()
	const saveAppointment = async (id, appointment) => {
		const result = await axios
			.put(`${API_URL}/appointments/${id}/`, appointment)
			.then((response) => {
				return response
			})
		return result.data
	}

	return (
		<Formik
			initialValues={{
				id: 104,
				type: 'first_appointment',
				status: 'scheduled',
				start: '2023-10-05T13:30:00Z',
				end: '2023-10-05T15:00:00Z',
				fields: [],
				transcript: null,
				ainote: '',
				complaints: [],
				review_of_systems: [],
				assessments: [],
				plans: [],
				physical_exam: [],
				summary: '',
				patient: 136,
				provider: 4,
			}}
			onSubmit={saveAppointment}>
			{({ values }) => (
				<Card>
					<CardContent>
						<Button
							onClick={() => {
								//saveAppointment(104, values)
							}}>
							Save
						</Button>
					</CardContent>
					<CardContent>
						<Form>
							<Stack
								direction="row"
								divider={
									<Divider orientation="vertical" flexItem />
								}
								spacing={2}>
								<div>
									<Field
										name="transcript"
										component="textarea"
										placeholder="Transcript"
									/>
									<Button type="submit" variant="contained">
										Generate Note
									</Button>
								</div>
								<div>
									<Typography>Medical Office Note</Typography>
									<Field
										name="ainote"
										component="textarea"
										placeholder="Note"
									/>
								</div>
							</Stack>
						</Form>
					</CardContent>
				</Card>
			)}
		</Formik>
	)
}
