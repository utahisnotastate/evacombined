import * as React from 'react'
import MUIDataTable from 'mui-datatables'

export default function Appointments({ appointments, patientId }) {
	const columns = [
		{
			name: 'type',
			label: 'Type',
		},
		{
			name: 'start',
			label: 'Start',
			options: {
				filter: true,
				sort: false,
			},
		},
		{
			name: 'end',
			label: 'End',
			options: {
				filter: true,
				sort: false,
			},
		},
		{
			name: 'view',
			label: 'State',
			options: {
				filter: true,
				sort: false,
			},
		},
	]

	return (
		<>
			<MUIDataTable data={appointments} columns={columns} />
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
