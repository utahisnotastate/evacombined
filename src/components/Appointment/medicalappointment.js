import React, { useState, useEffect } from 'react'
import AppointmentForm from './appointmentform'
import {
	Card,
	CardContent,
	CardActionArea,
	CardActions,
	Button,
} from '@mui/material'

export default function MedicalAppointment({ appointment }) {
	return (
		<Card>
			<CardContent>
				<AppointmentForm appointment={appointment} />
			</CardContent>
			<CardActionArea>
				<CardActions>
					<Button variant={`contained`}>Create Appointment</Button>
				</CardActions>
			</CardActionArea>
		</Card>
	)
}
