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
		id: '',
		fields: [],
		details: {
			allergies: [],
			insurance: [],
			medications: [],
			demographics: {
				city: '',
				email: '',
				phone: '',
				state: '',
				address: '',
				zip_code: '',
				last_name: '',
				first_name: '',
				date_of_birth: '',
			},
			medical_history: [],
			surgical_history: [],
		},
		ssn: '',
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
