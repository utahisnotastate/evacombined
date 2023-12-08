import * as React from 'react'
import moment from 'moment'
import Appointment from '../Appointment/appointment'
import MedicalAppointment from '../Appointment/medicalappointment'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	}
}

export default function Appointments({ appointments }) {
	const [value, setValue] = React.useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	return (
		<Box
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
				<Tab label={`New Appointment`} value={0} />
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
			<Appointment />
		</Box>
	)
}
