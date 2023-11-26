import React from 'react'
import MUIDataTable from 'mui-datatables'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import CleanHandsIcon from '@mui/icons-material/CleanHands'

const columns = [
	{
		name: 'status',
		label: 'Status',
	},
	{
		name: 'start',
		label: 'Start Time',
	},
	{
		name: 'end',
		label: 'End Time',
	},
	{
		name: 'appointmentlink',
		label: 'Appointment',
		options: {
			customBodyRender: (value, tableMeta, updateValue) => {
				return (
					<NavLink to={`/appointments/${tableMeta.rowData[0]}`}>
						View Appointment
					</NavLink>
				)
			},
		},
	},
]

const options = {
	filterType: 'checkbox',
}

export default function Appointments() {
	const appointments = useSelector((state) => state.appointments)

	return (
		<MUIDataTable
			title={'Appointments'}
			data={appointments}
			columns={columns}
			options={options}
		/>
	)
}
