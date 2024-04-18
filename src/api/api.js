import API_URL from './API_URL'
import axios from 'axios'
import moment from 'moment'

const start = moment()
const end = moment()

export const getPatients = async () => {
	const result = await axios(`${API_URL}/patients/`)
	console.log(result.data)
	return result.data
}

export const getPatient = async (id) => {
	const patient = await axios(`${API_URL}/patients/${id}/`)
	const appointments = await axios(`${API_URL}/patients/${id}/appointments/`)
	const result = { patient: patient.data, appointments: appointments.data }
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

export const getAppointment = async (appointmentId) => {
	const result = await axios(`${API_URL}/appointments/${appointmentId}/`)
	return result.data
}

export const createNewAppointment = async (patientId) => {
	try {
		const response = await axios.post(
			`${API_URL}/appointments/create_appointment/`,
			{ patientId }
		)
		return response.data
	} catch (error) {
		console.error('Error creating new appointment:', error)
		throw error
	}
}

export const scheduleAppointment = async () => {
	const formattedStart = start.utc().format()
	const formattedEnd = end.utc().format()
	return await axios
		.post(`${API_URL}/appointments/`, {
			type: 'first_appointment',
			status: 'scheduled',
			start: formattedStart,
			end: formattedEnd,
			fields: [],
			transcript: '',
			note: '',
			complaints: [],
			review_of_systems: [],
			assessments: [],
			plans: [],
			physical_exam: [],
			summary: '',
			patient: '',
			provider: 1,
		})
		.then((response) => {
			console.log(response)
			return response.data
		})
}

/*export const saveAppointment = async (appointment) => {
	console.log(appointment)
	const result = await axios
		.patch(`${API_URL}/appointments/${appointment.id}/`, { appointment })
		.then((response) => {
			console.log(response)
		})
	return result.data
}*/
export const exampletranscript = `Dr. Thompson: Good morning, Alex. How have you been feeling since our last appointment?

Alex: Good morning, Dr. Thompson. I've been doing okay, but I've noticed some fluctuations in my blood sugar levels more frequently.

Dr. Thompson: I see. Have you been tracking your levels regularly?

Alex: Yes, I check my levels four times a day and use an insulin pump.

Dr. Thompson: Great. Can you tell me more about the fluctuations? When do they usually occur?

Alex: Mostly after meals, but sometimes they happen overnight.

Dr. Thompson: Alright. Have there been any changes in your diet or daily routine that might be affecting this?

Alex: Not that I can think of. I've been sticking to the diet plan we discussed.

Dr. Thompson: Okay. Let's review your insulin regimen. How often are you changing your infusion sites?

Alex: Every three days, as recommended.

Dr. Thompson: Good. And have you experienced any issues with the pump itself?

Alex: No, it seems to be working fine.

Dr. Thompson: Alright. I think we should do some blood work today to check your A1C levels and see if there's a need to adjust your insulin therapy. We'll also review your diet and exercise routine to ensure everything is aligned with your treatment plan.

Alex: Sounds good. I've been trying to stay active, but it's been challenging with my work schedule.

Dr. Thompson: It's important to find a balance. Even a small amount of regular exercise can make a significant difference in managing diabetes. We can discuss some strategies to incorporate more activity into your day.

Alex: That would be helpful.

Dr. Thompson: Great. Now, have you experienced any other symptoms? Any issues with vision, sensation in your feet, or anything else?

Alex: No, nothing like that.

Dr. Thompson: Excellent. It's crucial to keep an eye on these things. Remember, managing diabetes is not just about controlling blood sugar but also about preventing complications.

Alex: Understood. I'll make sure to pay attention to any changes.

Dr. Thompson: Perfect. After the blood work, we'll schedule a follow-up appointment to discuss the results and any adjustments to your treatment plan. Do you have any other concerns or questions today?

Alex: No, that covers everything. Thank you, Dr. Thompson.

Dr. Thompson: You're welcome, Alex. I'm here to support you in managing your diabetes. We'll see you after the test results are in. Take care.

Alex: Thank you. See you soon.`
export const saveAppointment = async (appointment) => {
	console.log(appointment)
	try {
		const response = await axios.put(
			`${API_URL}/appointments/${appointment.id}/`,
			appointment
		)
		console.log(response)
		return response.data
	} catch (error) {
		console.error('There was an error saving the appointment:', error)
		// Handle the error according to your needs
	}
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
