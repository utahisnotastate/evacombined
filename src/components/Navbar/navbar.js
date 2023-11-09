import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'

const Navbar = () => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" style={{ flexGrow: 1 }}>
					App Name
				</Typography>
				<Button color="inherit">
					<NavLink
						to="/home"
						style={{ color: 'white', textDecoration: 'none' }}>
						Home
					</NavLink>
				</Button>
				<Button color="inherit">
					<NavLink
						to="/appointment"
						style={{ color: 'white', textDecoration: 'none' }}>
						Appointment
					</NavLink>
				</Button>
				<Button color="inherit">
					<NavLink
						to="/patient"
						style={{ color: 'white', textDecoration: 'none' }}>
						Patient
					</NavLink>
				</Button>
				<Button color="inherit">
					<NavLink
						to="/requests"
						style={{ color: 'white', textDecoration: 'none' }}>
						Requests
					</NavLink>
				</Button>
				<Button color="inherit">
					<NavLink
						to="/scheduling"
						style={{ color: 'white', textDecoration: 'none' }}>
						Scheduling
					</NavLink>
				</Button>
			</Toolbar>
		</AppBar>
	)
}

export default Navbar
