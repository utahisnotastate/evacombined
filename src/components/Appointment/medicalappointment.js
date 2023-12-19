import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import AppointmentForm from './appointmentform'
import {
	Backdrop,
	CircularProgress,
	Card,
	CardContent,
	CardActionArea,
	CardActions,
	Button,
} from '@mui/material'
import AsyncAPITextField from './asyncapitextfield'
import { getAppointment } from '../../api/api'
import { gcpGenerateOfficeNoteFromTranscript } from '../../api/ai.gcp'
import { TextField } from 'formik-mui'
import { useParams } from 'react-router-dom'

export default function MedicalAppointment() {
	const initialValues = {
		transcript: 'This is the transcript',
		note: 'This is the note',
		textC: '',
	}
	const { appointmentId } = useParams()
	const [open, setOpen] = useState(false)
	const [appointment, setAppointment] = useState({})

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

	const handleSubmit = (values) => {
		console.log(values)
	}

	//when the component mounts, get the appointments details from the api using the getAppointment function, also run the getAppointment function with the appointment id paramater changes
	useEffect(() => {
		getAppointment(appointmentId).then((response) => {
			console.log(response)
			setAppointment(response)
		})
	}, [appointmentId])
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			enableReinitialize={true}>
			<Form>
				<Field
					component={TextField}
					name="transcript"
					multiline
					fullWidth
					minRows={8}
					label="Transcript"
				/>
				<AsyncAPITextField name={`note`} type={`textarea`} />
			</Form>
		</Formik>
	)
}
