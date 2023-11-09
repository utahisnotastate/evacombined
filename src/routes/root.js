import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export default function Root() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<AppBar position="static">
				<Toolbar>
					<Link to={`/`}>
						<Typography variant="h6" component="div">
							Eva
						</Typography>
					</Link>

					<Link to={`/requests`}>
						<Typography variant="h6" component="div">
							Requests
						</Typography>
					</Link>
					<Link to={`/requests/1`}>
						<Typography variant="h6" component="div">
							Edit Request
						</Typography>
					</Link>
					<Link to={`/patients`}>
						<Typography variant="h6" component="div">
							Patients
						</Typography>
					</Link>
					<Link to={`/patients/1`}>
						<Typography variant="h6" component="div">
							Edit Patient
						</Typography>
					</Link>
					<Link to={`/appointments`}>
						<Typography variant="h6" component="div">
							Appointments
						</Typography>
					</Link>
					<Link to={`/appointments/1`}>
						<Typography variant="h6" component="div">
							Edit Appointment
						</Typography>
					</Link>
				</Toolbar>
			</AppBar>
			<Outlet />
		</div>
	)
}
