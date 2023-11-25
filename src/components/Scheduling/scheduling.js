import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Paper from '@mui/material/Paper'
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler'
import {
	Scheduler,
	Appointments,
	AppointmentForm,
	AppointmentTooltip,
	WeekView,
	EditRecurrenceMenu,
	AllDayPanel,
	ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui'

const Scheduling = () => {
	const appointments = useSelector((state) => state.appointments)
	const [currentDate, setCurrentDate] = useState('2018-06-27')
	const [addedAppointment, setAddedAppointment] = useState({})
	const [appointmentChanges, setAppointmentChanges] = useState({})
	const [editingAppointment, setEditingAppointment] = useState(undefined)

	const commitChanges = ({ added, changed, deleted }) => {
		setData((prevData) => {
			let updatedData = [...prevData]

			if (added) {
				const startingAddedId =
					prevData.length > 0
						? prevData[prevData.length - 1].id + 1
						: 0
				updatedData = [
					...updatedData,
					{ id: startingAddedId, ...added },
				]
			}

			if (changed) {
				updatedData = updatedData.map((appointment) =>
					changed[appointment.id]
						? { ...appointment, ...changed[appointment.id] }
						: appointment
				)
			}

			if (deleted !== undefined) {
				updatedData = updatedData.filter(
					(appointment) => appointment.id !== deleted
				)
			}

			return updatedData
		})
	}

	return (
		<Paper>
			<Scheduler data={appointments} height={660}>
				<ViewState currentDate={currentDate} />
				<EditingState
					onCommitChanges={commitChanges}
					addedAppointment={addedAppointment}
					onAddedAppointmentChange={setAddedAppointment}
					appointmentChanges={appointmentChanges}
					onAppointmentChangesChange={setAppointmentChanges}
					editingAppointment={editingAppointment}
					onEditingAppointmentChange={setEditingAppointment}
				/>
				<WeekView startDayHour={9} endDayHour={17} />
				<AllDayPanel />
				<EditRecurrenceMenu />
				<ConfirmationDialog />
				<Appointments />
				<AppointmentTooltip showOpenButton showDeleteButton />
				<AppointmentForm />
			</Scheduler>
		</Paper>
	)
}

export default Scheduling
