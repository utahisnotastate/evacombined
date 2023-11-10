import React, { useState, useEffect } from 'react'
import {
	Scheduler,
	WeekView,
	MonthView,
	DayView,
	Appointments,
	Resources,
	AppointmentTooltip,
	AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui'
import { useDispatch, useSelector } from 'react-redux'

export default function Scheduling() {
	const appointments = useSelector((state) => state.appointments)
	const providers = useSelector((state) => state.providers)

	return (
		<Scheduler data={appointments}>
			<WeekView startDayHour={9} endDayHour={19} />
			<MonthView />
			<DayView />
			<Appointments />
			<Resources data={providers} />
			<AppointmentTooltip showCloseButton showOpenButton />
			<AppointmentForm />
		</Scheduler>
	)
}
