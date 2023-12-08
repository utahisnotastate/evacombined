import * as React from 'react'
import moment from 'moment'
import AppointmentForm from '../Appointment/appointmentform'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Grid from '@mui/material/Grid'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function Appointments({ appointments }) {
	const [appointment, setAppointment] = React.useState({
		id: 104,
		type: 'first_appointment',
		status: 'scheduled',
		start: '2023-10-05T13:30:00Z',
		end: '2023-10-05T15:00:00Z',
		fields: [],
		transcript: 'dfgdfgdfgdfg',
		cleanedtranscript: 'cleaned transcript',
		note: 'w34w343434',
		complaints: 'erer',
		review_of_systems: '',
		assessments: '',
		plans: '',
		physical_exam: '',
		summary: '',
		patient: 136,
		provider: 4,
	})
	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={1}>
					<List dense>
						{appointments && appointments.length > 0 ? (
							appointments.map((appointment, index) => (
								<ListItem
									key={index}
									secondaryAction={
										<KeyboardArrowRightIcon
											onClick={() =>
												console.log(appointment)
											}
										/>
									}>
									<ListItemText>
										{moment(appointment.start).format(
											'MM-DD-YYYY'
										)}
									</ListItemText>
								</ListItem>
							))
						) : (
							<ListItem>
								<ListItemText>
									No Appointment History
								</ListItemText>
							</ListItem>
						)}
					</List>
				</Grid>
				<Grid item xs={8}>
					<AppointmentForm appointment={appointment} />
				</Grid>
			</Grid>
			<Button variant={`contained`}>Create Appointment</Button>
		</>
	)
}

/*
* <Box
			sx={{
				flexGrow: 1,
				bgcolor: 'background.paper',
				display: 'flex',
				height: '100vh',
			}}>
			<Tabs
				orientation="vertical"
				variant="scrollable"
				value={value}
				onChange={handleChange}
				aria-label="Vertical tabs example"
				sx={{ borderRight: 1, borderColor: 'divider' }}>
				{appointments && appointments.length > 0 ? (
					appointments.map((appointment, index) => (
						<Tab
							key={index}
							label={moment(appointment.start).format(
								'MM-DD-YYYY'
							)}
						/>
					))
				) : (
					<Typography>Patient has not been seen before</Typography>
				)}
			</Tabs>

			<div>
				<MedicalAppointment />
				<Button variant={`contained`}>Create Appointment</Button>
			</div>
		</Box>
*
* */
