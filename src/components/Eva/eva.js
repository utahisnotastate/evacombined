import React, { useEffect } from 'react'
import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Toolbar,
	Divider,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { NavLink, Routes, Route } from 'react-router-dom'
import { getAllData } from '../../api/api'
import MedicalAppointment from '../Appointment/medicalappointment'
import Appointments from '../Patient/appointments'
import Patient from '../Patient/patient'
import Requests from '../Requests/requests'
import Scheduling from '../Scheduling/scheduling'
import PatientSearch from './patientsearch'

const drawerWidth = 240

export default function Eva() {
	const dispatch = useDispatch()

	useEffect(() => {
		getAllData()
			.then((data) => {
				dispatch({ type: 'SET_PATIENTS', patients: data.patients })
				dispatch({
					type: 'SET_APPOINTMENTS',
					appointments: data.appointments,
				})
				dispatch({ type: 'SET_REQUESTS', requests: data.requests })
				dispatch({ type: 'SET_PROVIDERS', providers: data.providers })
			})
			.catch((error) => console.error('Error fetching data:', error))
	}, [dispatch])
	return (
		<Box sx={{ display: 'flex' }}>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
				variant="permanent"
				anchor="left">
				<Toolbar>
					<PatientSearch />
				</Toolbar>
				<Divider />
				<List>
					{['Home', 'Requests'].map((text, index) => (
						<ListItem key={text} disablePadding>
							<NavLink to={`/${text.toLowerCase()}`}>
								<ListItemButton>
									<ListItemText primary={text} />
								</ListItemButton>
							</NavLink>
						</ListItem>
					))}
				</List>
			</Drawer>
			<Box
				component="main"
				sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
				<Routes>
					<Route path="/" element={<Scheduling />} />
					<Route
						path="/appointments/:appointmentId"
						element={<MedicalAppointment />}
					/>
					<Route path="/patients/:patientId" element={<Patient />} />
					<Route path="/requests/:requestId" element={<Requests />} />
				</Routes>
			</Box>
		</Box>
	)
}

/*
* const dispatch = useDispatch()
	useEffect(() => {
		getAllData()
			.then((data) => {
				console.log(data)
				dispatch({ type: 'SET_PATIENTS', patients: data.patients })
				dispatch({
					type: 'SET_APPOINTMENTS',
					appointments: data.appointments,
				})
				dispatch({ type: 'SET_REQUESTS', requests: data.requests })
				dispatch({ type: 'SET_PROVIDERS', providers: data.providers })
			})
			.catch((error) => {
				console.error('Error fetching data:', error)
			})
	}, [])
* */
