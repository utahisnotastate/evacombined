import React from 'react'
import { Formik, Field, Form } from 'formik'
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@mui/material'
import { TextField } from 'formik-mui'
import moment from 'moment'

export default function ScheduleAppointmentForm({ slotToSchedule, patientId }) {
	const initialValues = {
		patient: patientId,
		provider: slotToSchedule.resourceId,
		type: '',
		status: 'scheduled',
		start: moment(slotToSchedule.start).toISOString(),
		end: moment(slotToSchedule.end).toISOString(),
	}

	const onSubmit = (values, { setSubmitting }) => {
		console.log(values)
		setSubmitting(false)
	}

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit}>
			{({ submitForm, isSubmitting }) => (
				<Form>
					<Dialog open={true}>
						<DialogTitle>Schedule appointment</DialogTitle>
						<DialogContent>
							<Field
								component={TextField}
								name="type"
								type="text"
								label="Type"
							/>
							<Field
								component={TextField}
								name="status"
								type="text"
								label="Status"
							/>
							<Field
								component={TextField}
								name="start"
								type="datetime-local"
								label="Start Time"
								InputLabelProps={{ shrink: true }}
							/>
							<Field
								component={TextField}
								name="end"
								type="datetime-local"
								label="End Time"
								InputLabelProps={{ shrink: true }}
							/>
						</DialogContent>
						<DialogActions>
							<Button
								variant="contained"
								color="primary"
								disabled={isSubmitting}
								onClick={submitForm}>
								Schedule
							</Button>
						</DialogActions>
					</Dialog>
				</Form>
			)}
		</Formik>
	)
}
