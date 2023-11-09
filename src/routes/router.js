import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Root from './root'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: 'requests/:requestId',
				element: <p>Request Detail</p>,
			},
			{
				path: 'requests',
				element: <p>Requests</p>,
			},
			{
				path: 'appointments',
				element: <p>Appointments</p>,
			},
			{
				path: 'appointments/:appointmentId',
				element: <p>Appointment Detail</p>,
			},
			{
				path: 'patients',
				element: <p>Patients</p>,
			},
			{
				path: 'patients/:patientId',
				element: <p>Patient Detail</p>,
			},
		],
	},
])

export default router
