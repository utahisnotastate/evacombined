import API_URL from './API_URL'
import axios from 'axios'

export const getPatients = async () => {
	const result = await axios(`${API_URL}/patients/`)
	console.log(result.data)
	return result.data
}

export const getPatient = async (id) => {
	const patient = await axios(`${API_URL}/patients/${id}/`)
	const appointments = await axios(`${API_URL}/patients/${id}/appointments/`)
	const result = { patient: patient.data, appointments: appointments.data }
	console.log(result)
	return result
}

export const getPatientAppointments = async (id) => {
	const result = await axios(`${API_URL}/patients/${id}/appointments/`)
	return result.data
}

export const getRequests = async () => {
	const result = await axios(`${API_URL}/requests/`)
	return result.data
}

export const getRequest = async (id) => {
	const result = await axios(`${API_URL}/requests/${id}/`)
	return result.data
}

export const getAppointments = async () => {
	const result = await axios(`${API_URL}/appointments/`)
	return result.data
}

export const getAppointment = async (id) => {
	const result = await axios(`${API_URL}/appointments/${id}/`)
	return result.data
}

export const scheduleAppointment = async (id, appointment, hideModal) => {
	const result = await axios
		.post(`${API_URL}/appointments/${id}/`, appointment)
		.then((response) => {
			hideModal()
			return response
		})
	return result.data
}

export const saveAppointment = async (id, appointment, hideModal) => {
	const result = await axios
		.put(`${API_URL}/appointments/${id}/`, appointment)
		.then((response) => {
			hideModal()
			return response
		})
	return result.data
}
export const getProviders = async () => {
	const result = await axios(`${API_URL}/providers/`)
	return result.data
}

export const getAllData = async () => {
	try {
		const [patients, appointments, requests, providers] = await Promise.all(
			[getPatients(), getAppointments(), getRequests(), getProviders()]
		)

		return {
			patients,
			appointments,
			requests,
			providers,
		}
	} catch (error) {
		console.error('Error fetching data:', error)
		throw error
	}
}
