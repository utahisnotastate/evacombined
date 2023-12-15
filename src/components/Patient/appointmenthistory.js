import React from 'react'
import { List, ListItem, ListItemText } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import moment from 'moment'

export default function AppointmentHistory({ appointments, setAppointment }) {
	return (
		<List dense>
			{appointments && appointments.length > 0 ? (
				appointments.map((appointment, index) => (
					<ListItem
						key={index}
						secondaryAction={
							<KeyboardArrowRightIcon
								onClick={() => setAppointment(appointment)}
							/>
						}>
						<ListItemText>
							{moment(appointment.start).format('MM-DD-YYYY')}
						</ListItemText>
					</ListItem>
				))
			) : (
				<ListItem>
					<ListItemText>No Appointment History</ListItemText>
				</ListItem>
			)}
		</List>
	)
}
