import React, { useState, useEffect } from 'react'
import { getAppointment } from '../../api/api'
import { Formik, Form, Field } from 'formik'
import AsyncAPITextField from './asyncapitextfield'
import { gcpGenerateOfficeNoteFromTranscript } from '../../api/ai.gcp'
import { TextField } from 'formik-mui'
import { useParams } from 'react-router-dom'

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
		handleOpen(true)
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
			initialValues={appointment}
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
				<AsyncAPITextField name={`note`} />
			</Form>
		</Formik>
	)
}
