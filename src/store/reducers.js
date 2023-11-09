import { combineReducers } from 'redux'

function Appointments(state = [], action) {
	switch (action.type) {
		case 'SET_APPOINTMENTS':
			return action.appointments
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

const rootReducer = combineReducers({
	Appointments,
	Patients,
	Requests,
})

export default rootReducer
