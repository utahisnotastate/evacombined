import React, { useState, useEffect } from 'react'
import { getAppointment, saveAppointment } from '../../api/api'
import { Formik, Form, Field } from 'formik'
import AsyncAPITextField from './asyncapitextfield'
import { gcpGenerateOfficeNoteFromTranscript } from '../../api/ai.gcp'
import { TextField } from 'formik-mui'
import { useParams } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import axios from 'axios'

export default function MedicalAppointment() {
	const { appointmentId } = useParams()
	const [open, setOpen] = useState(false)
	const [appointment, setAppointment] = useState({
		type: 'regular',
		status: 'scheduled',
		start: '',
		end: '',
		transcript: '',
		note: '',
		textC: '',
	})

	const handleClose = () => {
		setOpen(false)
	}
	const handleOpen = () => {
		setOpen(true)
		gcpGenerateOfficeNoteFromTranscript().then((response) => {
			console.log(response)
			setOpen(false)
		})
	}

	const handleSubmit = async (values) => {
		saveAppointment(values).then((updatedAppointment) => {
			console.log(updatedAppointment)
			setAppointment(updatedAppointment)
		})
	}

	//when the component mounts, get the appointments details from the api using the getAppointment function, also run the getAppointment function with the appointment id paramater changes
	useEffect(() => {
		getAppointment(appointmentId).then((response) => {
			console.log(response)
			setAppointment(response)
		})
	}, [appointmentId])

	return (
		<Paper>
			<Formik
				initialValues={appointment}
				onSubmit={(values) => handleSubmit(values)}
				enableReinitialize={true}>
				<Form>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
							flex: 1,
						}}>
						<Field
							component={TextField}
							name="transcript"
							multiline
							fullWidth
							minRows={8}
							label="Transcript"
						/>
						<Field
							component={TextField}
							name="cleaneduptranscript"
							multiline
							fullWidth
							minRows={8}
							label="Cleaned Up Transcript"
						/>
						<AsyncAPITextField name={`note`} fullWidth />
						<Field
							component={TextField}
							name="claim"
							multiline
							fullWidth
							minRows={8}
							label="Claim"
						/>
					</div>
					<input type={`submit`} />
				</Form>
			</Formik>
		</Paper>
	)
}
