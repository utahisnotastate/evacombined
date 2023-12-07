import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Paper from '@mui/material/Paper'
import { ViewState } from '@devexpress/dx-react-scheduler'
import {
	Scheduler,
	Appointments,
	AppointmentForm,
	AppointmentTooltip,
	WeekView,
	AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui'

const Scheduling = () => {
	const appointments = useSelector((state) => state.appointments)
	const [currentDate, setCurrentDate] = useState('2018-06-27')
	const [addedAppointment, setAddedAppointment] = useState({})
	const [appointmentChanges, setAppointmentChanges] = useState({})
	const [editingAppointment, setEditingAppointment] = useState(undefined)

	return (
		<Paper>
			<Scheduler data={appointments} height={660}>
				<ViewState currentDate={currentDate} />
				<WeekView startDayHour={9} endDayHour={17} />
				<AllDayPanel />
				<Appointments />
				<AppointmentTooltip showOpenButton showDeleteButton />
				<AppointmentForm />
			</Scheduler>
		</Paper>
	)
}

export default Scheduling
