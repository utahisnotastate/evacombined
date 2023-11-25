import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'

export default function Appointments() {
	return (
		<div>
			<NavLink to={`/appointments/:appointmentId`}>
				<Button variant="contained">New Appointment</Button>
			</NavLink>
		</div>
	)
}
