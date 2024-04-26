import { combineReducers } from 'redux'

function appointments(state = [], action) {
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
		appointments: [],
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

function patients(state = [], action) {
	switch (action.type) {
		case 'SET_PATIENTS':
			return action.patients
		default:
			return state
	}
}

function requests(state = [], action) {
	switch (action.type) {
		case 'SET_REQUESTS':
			return action.requests
		default:
			return state
	}
}

function providers(state = [], action) {
	switch (action.type) {
		case 'SET_PROVIDERS':
			return action.providers
		default:
			return state
	}
}

const rootReducer = combineReducers({
	appointments,
	providers,
	patients,
	patient,
	requests,
})

export default rootReducer
