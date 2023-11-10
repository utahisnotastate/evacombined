import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { patientsLoader, patientLoader } from './loaders'
import Root from './root'
import Patient from '../components/Patient/patient'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		loader: patientsLoader,
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
				path: 'appointments/:a ppointmentId',
				element: <p>Appointment Detail</p>,
			},
			{
				path: 'patients',
				element: <p>Patients</p>,
			},
			{
				path: 'patients/:patientId',
				element: <Patient />,
			},
		],
	},
])

export default router
