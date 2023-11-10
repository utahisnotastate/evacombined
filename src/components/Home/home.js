import React, { useEffect } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Container,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Toolbar,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import Appointment from '../Appointment/appointment'
import Patient from '../Patient/patient'
import Requests from '../Requests/requests'
import Grid from '@material-ui/core/Grid'
import Typography from '@mui/material/Typography'

const drawerWidth = 240

export default function Home({ title, children, side_nav_items }) {
	return (
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				py: 8,
			}}>
			<Container maxWidth="lg">
				<Typography sx={{ mb: 3 }} variant="h4">
					{title}
				</Typography>
				<Grid container spacing={3}>
					<Grid item lg={4} md={6} xs={12}>
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
					</Grid>
					<Grid item lg={8} md={6} xs={12}>
						<Card>
							<CardHeader subheader="" title="" />
							<Divider />
							<CardContent>
								<Appointment />
							</CardContent>
							<Divider />
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'flex-end',
									p: 2,
								}}>
								<Button color="primary" variant="contained">
									Save details
								</Button>
							</Box>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</Box>
	)
}
