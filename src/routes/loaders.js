import { getPatients, getPatient } from '../api/api'

export async function patientLoader({ params }) {
	const patient = await getPatient(params.patientId)
	console.log({ patient })
	return { patient }
}

export async function patientsLoader() {
	const patients = await getPatients()
	console.log({ patients })
	return { patients }
}
