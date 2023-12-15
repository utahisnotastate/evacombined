import React from 'react'
import { Formik, Form, Field } from 'formik'
import AppointmentForm from './appointmentform'
import {
	Card,
	CardContent,
	CardActionArea,
	CardActions,
	Button,
} from '@mui/material'
import { exampletranscript } from '../../api/api'
import { TextField } from 'formik-mui'

export default function MedicalAppointment({ appointment }) {
	return (
		<Formik
			initialValues={{
				appointment: '',
				note: '',
			}}>
			<Form>
				<Card>
					<CardContent>
						<Field component={TextField} name={`note`} />
					</CardContent>
					<CardActionArea>
						<CardActions>
							<Button variant={`contained`}>
								Create Appointment
							</Button>
						</CardActions>
					</CardActionArea>
				</Card>
			</Form>
		</Formik>
	)
}
