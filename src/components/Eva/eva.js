import React, { useEffect } from 'react'
import {
	Box,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Toolbar,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { NavLink, Route, Routes } from 'react-router-dom'
import { getAllData } from '../../api/api'
import Appointment from '../Appointment/appointment'
import Patient from '../Patient/patient'
import Requests from '../Requests/requests'

const drawerWidth = 240

export default function Eva() {
	const dispatch = useDispatch()
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
				<Toolbar />
				<Divider />
				<List>
					<ListItem disablePadding>
						<NavLink to={`/`}>
							<ListItemButton>
								<ListItemText primary={`Home`} />
							</ListItemButton>
						</NavLink>
					</ListItem>
					<ListItem disablePadding>
						<NavLink to={`/appointment/`}>
							<ListItemButton>
								<ListItemText primary={`Appointment`} />
							</ListItemButton>
						</NavLink>
					</ListItem>
					<ListItem disablePadding>
						<NavLink to={`/patients`}>
							<ListItemButton>
								<ListItemText primary={`Patients`} />
							</ListItemButton>
						</NavLink>
					</ListItem>
					<ListItem disablePadding>
						<NavLink to={`/patient/:id`}>
							<ListItemButton>
								<ListItemText primary={`Patient`} />
							</ListItemButton>
						</NavLink>
					</ListItem>
					<ListItem disablePadding>
						<NavLink to={`/requests`}>
							<ListItemButton>
								<ListItemText primary={`Requests`} />
							</ListItemButton>
						</NavLink>
					</ListItem>

					<ListItem disablePadding>
						<NavLink to={`/scheduling`}>
							<ListItemButton>
								<ListItemText primary={`Scheduling`} />
							</ListItemButton>
						</NavLink>
					</ListItem>
				</List>
			</Drawer>
			<Box
				sx={{
					flexGrow: 1,
					bgcolor: 'background.default',
					p: 3,
				}}>
				<Routes>
					<Route path="/" element={<p>Appointments</p>} />
				</Routes>
			</Box>
		</Box>
	)
}

/*
* <Route
						path="/appointments/:appointmentId"
						element={<Appointment />}
					/>
					<Route path="/requests" element={<Requests />} />
					<Route
						path="/requests/:requestId"
						element={<p>Edit Request</p>}
					/>
					<Route path="/patients" element={<p>View Patients</p>} />
					<Route path="/patients/:patientId" element={<Patient />} />
*
* */
