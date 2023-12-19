import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, NavLink } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Appointments from './appointments'

const Patient = () => {
	const { patientId } = useParams()
	const appointments = useSelector((state) => state.patientappointments)

	//useEffect that when the component loads, it fetches the patient data from the API using the :patientID. Additionally, it should set the initial values of the form to the data returned from the API. The state.patient from the redux store should be used to populate the form.

	return (
		<Card>
			<CardContent>
				<Appointments
					appointments={appointments}
					patientId={patientId}
				/>
			</CardContent>
		</Card>
	)
}

export default Patient
