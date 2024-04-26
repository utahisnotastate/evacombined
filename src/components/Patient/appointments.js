import * as React from 'react'
import MUIDataTable from 'mui-datatables'
import { Button, CircularProgress, Tooltip, IconButton } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { createNewAppointment, getPatient } from '../../api/api'

export default function Appointments({ patientId }) {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [loading, setLoading] = React.useState(false)
	const appointments = useSelector((state) => state.patient.appointments)

	const handleCreateNewAppointment = async () => {
		setLoading(true)
		const result = await createNewAppointment(patientId)
		if (result.success) {
			const patientData = await getPatient(patientId)
			dispatch({ type: 'SET_PATIENT', patient: patientData })
			setLoading(false)
			navigate(`/appointments/${result.data.id}`)
		} else {
			setLoading(false)
			alert('Failed to create appointment. Please try again.')
		}
	}

	const columns = [
		{ name: 'type', label: 'Type' },
		{
			name: 'start',
			label: 'Start Time',
			options: {
				customBodyRenderLite: (dataIndex) =>
					moment(appointments[dataIndex].start).format(
						'MM-DD-YYYY HH:mm'
					),
				setCellProps: () => ({
					style: { minWidth: '130px', color: '#4a148c' },
				}),
			},
		},
		{
			name: 'end',
			label: 'End Time',
			options: {
				customBodyRenderLite: (dataIndex) =>
					appointments[dataIndex].end
						? moment(appointments[dataIndex].end).format(
								'MM-DD-YYYY HH:mm'
						  )
						: 'N/A',
				setCellProps: () => ({
					style: { minWidth: '130px', color: '#1a237e' },
				}),
			},
		},
		{
			name: 'Info',
			options: {
				sort: false,
				empty: true,
				customBodyRenderLite: (dataIndex) => {
					return (
						<Tooltip title="More Info" placement="top">
							<IconButton
								onClick={() =>
									navigate(
										`/appointments/${appointments[dataIndex].id}`
									)
								}>
								<InfoIcon color="primary" />
							</IconButton>
						</Tooltip>
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
		customToolbar: () => (
			<Button
				onClick={handleCreateNewAppointment}
				variant="contained"
				color="primary"
				disabled={loading}>
				{loading ? (
					<CircularProgress size={24} />
				) : (
					'Create New Appointment'
				)}
			</Button>
		),
		rowHover: true,
		setRowProps: (row, dataIndex, rowIndex) => {
			const style = {}
			if (appointments[dataIndex].status === 'scheduled') {
				style.background = '#e8f5e9'
			}
			return { style }
		},
	}
	return (
		<>
			<MUIDataTable
				title={'Appointments'}
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
