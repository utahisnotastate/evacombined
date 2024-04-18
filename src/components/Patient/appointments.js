import * as React from 'react'
import MUIDataTable from 'mui-datatables'
import { Button } from '@mui/material'
import { createNewAppointment } from '../../api/api'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

export default function Appointments({ appointments, patientId }) {
	const navigate = useNavigate()

	const handleCreateAppointment = async () => {
		try {
			// Assuming the createNewAppointment function requires patientId and returns the new appointment ID
			const newAppointment = await createNewAppointment(patientId)
			navigate(`/appointments/${newAppointment.id}`)
		} catch (error) {
			console.error('Error creating new appointment:', error)
			// Optionally add error handling UI feedback here
		}
	}

	const columns = [
		{
			name: 'type',
			label: 'Type',
		},
		{
			name: 'start',
			label: 'Start time',
			options: {
				customBodyRenderLite: (dataIndex) => {
					return moment(appointments[dataIndex].start).format(
						'MM-DD-YYYY HH:mm'
					)
				},
			},
		},
		{
			name: 'end',
			label: 'End time',
			options: {
				customBodyRenderLite: (dataIndex) => {
					return moment(appointments[dataIndex].end).format(
						'MM-DD-YYYY HH:mm'
					)
				},
			},
		},
	]
	const options = {
		selectableRows: 'none',
		onRowClick: (rowData, rowMeta) => {
			navigate(`/appointments/${appointments[rowMeta.dataIndex].id}`)
		},
		customToolbar: () => {
			return (
				<Button
					variant="contained"
					color="primary"
					onClick={handleCreateAppointment}>
					Start New Appointment
				</Button>
			)
		},
	}
	return (
		<>
			<MUIDataTable
				data={appointments}
				columns={columns}
				options={options}
			/>
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
