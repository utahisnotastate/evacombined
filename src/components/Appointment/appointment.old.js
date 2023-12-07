import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {
	scheduleAppointment,
	saveAppointment,
	getAppointment,
} from '../../api/api'
import API_URL from '../../api/API_URL'
import {
	Button,
	Card,
	Typography,
	Divider,
	Stack,
	CardContent,
} from '@mui/material'

const Appointment = () => {
	const { appointmentId } = useParams()
	const [transcript, setTranscript] = useState('')
	const [gpt3Response, setGpt3Response] = useState('')
	const [appointment, setAppointment] = useState({
		id: '',
		type: '',
		status: '',
		start: '',
		end: '',
		fields: [],
		transcript: '',
		ainote: '',
		complaints: [],
		review_of_systems: [],
		assessments: [],
		plans: [],
		physical_exam: [],
		summary: '',
		patient: '',
		provider: '',
	})
	const handleSubmitToGPT3 = async (appointment) => {
		saveAppointment(appointment).then()
	}

	useEffect(() => {
		getAppointment(appointmentId).then((response) => {
			setAppointment(response)
		})
	}, [appointmentId])
	return (
		<Formik
			initialValues={appointment}
			enableReinitialize={true}
			onSubmit={handleSubmitToGPT3}>
			{({ values }) => (
				<Card>
					<CardContent>
						<div>
							<Button
								type={`variant`}
								onClick={() => {
									console.log(values)
								}}>
								<Typography gutterBottom>
									Save Appointment
								</Typography>
							</Button>
						</div>
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

export default Appointment
