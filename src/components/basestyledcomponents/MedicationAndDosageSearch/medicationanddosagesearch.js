import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Autosuggest from 'react-autosuggest'

const API_URL =
	'https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=arava&ef=STRENGTHS_AND_FORMS'

function getICD10SuggestionValue(suggestion) {
	return suggestion
}

function getComplaintNameSuggestionValue(suggestion) {
	return suggestion[1]
}

function renderSuggestion(suggestion) {
	return <span>{suggestion}</span>
}

export default class MedicationAndDosageSearch extends Component {
	constructor(props) {
		super(props)
		this.state = {
			medicationsuggestions: [],
			medicationdosages: [],
			medicationname: '',
		}
	}

	onChange = (event, { newValue, method }) => {
		this.setState({
			medicationname: newValue,
		})
	}

	onSuggestionsFetchRequested = ({ value }) => {
		fetch(
			`https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=${value}&ef=RXCIUS`
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
				this.setState({ medicationsuggestions: data[1] })
			})
	}

	onSuggestionsClearRequested = () => {
		this.setState({
			medicationsuggestions: [],
		})
	}

	handleChoice = (event, { suggestion }) => {
		event.preventDefault()
		console.log(suggestion)
		this.props.dispatch({ type: 'set_medication', name: suggestion })
	}

	render() {
		const { medicationsuggestions, medicationdosages, medicationname } =
			this.state
		const { register } = this.props
		const inputProps = {
			placeholder: 'Search Medications',
			value: medicationname,
			name: 'medicationname',
			ref: register,
			onChange: this.onChange,
		}
		return (
			<div className="">
				<Grid container>
					<Grid>
						<Autosuggest
							id="medicationname"
							suggestions={medicationsuggestions}
							onSuggestionsFetchRequested={
								this.onSuggestionsFetchRequested
							}
							onSuggestionsClearRequested={
								this.onSuggestionsClearRequested
							}
							getSuggestionValue={getICD10SuggestionValue}
							renderSuggestion={renderSuggestion}
							onSuggestionSelected={this.handleChoice}
							inputProps={inputProps}
						/>
					</Grid>
					<Grid></Grid>
				</Grid>
			</div>
		)
	}
}
