import React, { useState, useEffect } from 'react'
import AppointmentForm from './appointmentform'
import { Card, CardContent } from '@mui/material'

export default function MedicalAppointment() {
	return (
		<Card>
			<CardContent>
				<AppointmentForm />
			</CardContent>
		</Card>
	)
}
