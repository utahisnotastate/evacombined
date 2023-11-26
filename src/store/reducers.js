import { combineReducers } from 'redux'

function Appointments(state = [], action) {
	switch (action.type) {
		case 'SET_APPOINTMENTS':
			return action.appointments
		default:
			return state
	}
}

function patient(
	state = {
		id: 136,
		fields: [
			{
				name: 'additional_info_1',
				value: 'Some additional information',
			},
			{
				name: 'additional_info_2',
				value: 'Some more additional information',
			},
		],
		details: {
			allergies: ['Penicillin', 'Peanuts'],
			insurance: [
				{
					provider: 'HealthInsuranceCo',
					policy_number: 'ABC1234567',
				},
			],
			medications: ['Aspirin', 'Tylenol'],
			demographics: {
				city: 'Springfield',
				email: 'john.doe@example.com',
				phone: '123-456-7890',
				state: 'IL',
				address: '123 Main St.',
				zip_code: '12345',
				last_name: 'Doe',
				first_name: 'John',
				date_of_birth: '1980-01-01',
			},
			medical_history: ['Asthma', 'High blood pressure'],
			surgical_history: ['Appendectomy', 'Tonsillectomy'],
		},
		ssn: 123456789,
	},
	action
) {
	switch (action.type) {
		case 'SET_PATIENT':
			return action.patient
		default:
			return state
	}
}

function Patients(state = [], action) {
	switch (action.type) {
		case 'SET_PATIENTS':
			return action.patients
		default:
			return state
	}
}

function Requests(state = [], action) {
	switch (action.type) {
		case 'SET_REQUESTS':
			return action.requests
		default:
			return state
	}
}

function Providers(state = [], action) {
	switch (action.type) {
		case 'SET_PROVIDERS':
			return action.providers
		default:
			return state
	}
}

const rootReducer = combineReducers({
	Appointments,
	Providers,
	Patients,
	patient,
	Requests,
})

export default rootReducer
