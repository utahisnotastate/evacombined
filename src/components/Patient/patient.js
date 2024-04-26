import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { getPatient } from '../../api/api'
import Appointments from './appointments'

const Patient = () => {
	const { patientId } = useParams()
	const dispatch = useDispatch()

	//useEffect that when the component loads, it fetches the patient data from the API using the :patientID. Additionally, it should set the initial values of the form to the data returned from the API. The state.patient from the redux store should be used to populate the form.

	useEffect(() => {
		const fetchPatient = async () => {
			try {
				const patientData = await getPatient(patientId)
				dispatch({ type: 'SET_PATIENT', patient: patientData })
			} catch (error) {
				console.error('Failed to fetch patient data:', error)
				// Implement error handling UI or state update
			}
		}

		fetchPatient()
	}, [patientId, dispatch])

	return (
		<Card>
			<CardContent>
				<Appointments patientId={patientId} />
			</CardContent>
		</Card>
	)
}

export default Patient
