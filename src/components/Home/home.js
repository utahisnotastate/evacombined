import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import {
	List,
	Typography,
	Container,
	Card,
	Box,
	Grid,
	Divider,
	CardContent,
	CardHeader,
} from '@mui/material'
import Appointment from '../Appointment/appointment'

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
						<SideNav side_nav_items={side_nav_items} />
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
