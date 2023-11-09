import React, { Component } from 'react'
// import { Input } from 'react-formik-ui';

import Card from '../Card/Card'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import Autosuggest from 'react-autosuggest'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import CardHeader from '../Card/CardHeader'
import CardBody from '../Card/CardBody'

const API_URL =
	'https://clinicaltables.nlm.nih.gov/api/procedures/v3/search?terms='

function getSuggestionValue(suggestion) {
	return suggestion[0]
}

function renderSuggestion(suggestion) {
	return <span>{suggestion}</span>
}
const classes = {
	root: {
		margin: 20,
	},
	banner: {
		marginBottom: 10,
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#0232B2',
		color: '#ffffff',
	},
	headeritem: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRight: '1px solid #888',
		width: '100%',
		height: 60,
	},
	listitem: {
		marginTop: 15,
	},
	listitemheader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#ffffff',
	},
}
class SurgicalHistory extends Component {
	constructor(props) {
		super(props)
		this.state = {
			value: '',
			selected: undefined,
			history: [],
			suggestions: [],
		}
	}

	async componentDidMount() {
		console.log(this.props)
		const result = await axios(
			`http://127.0.0.1:8000/api/patients/${this.props.match.params.id}/surgicalhistory/`
		)
		console.log(result)
		this.setState({ history: result.data })
		this.props.loadSurgicalHistory(result.data)
		console.log(this.state.history)
	}

	handleClick(item) {
		// add new surgery to database
		axios
			.post(
				`http://127.0.0.1:8000/api/patients/${this.props.match.params.id}/surgicalhistory/`,
				{
					patient: this.props.match.params.id,
					procedure: item,
					date: null,
					performed_by: null,
					additional_information: null,
				}
			)
			.then((response) => {
				// fetch updated surgical history list from database
				console.log('Response: ' + response)
				const fetchData = async () => {
					const result = await axios(
						`http://127.0.0.1:8000/api/patients/${this.props.match.params.id}/surgicalhistory/`
					)
					console.log(result.data)
					return result.data
				}
				fetchData().then((response) => {
					this.props.updateSurgicalHistory(response)
				})
			})
			.catch((error) => {
				console.log(error)
			})
	}

	onChange = (event, { newValue, method }) => {
		this.setState({
			value: newValue,
		})
	}

	onSuggestionsFetchRequested = ({ value }) => {
		fetch(`${API_URL}${value}`)
			.then((response) => response.json())
			.then((data) => this.setState({ suggestions: data[3] }))
	}

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: [],
		})
	}

	deleteItem = (item) => {
		console.log(`Delete surgery id  ${item}`)
		// this.setState({ history: this.state.history.slice(0, item).concat(this.state.history.slice(item + 1, this.state.history.length)) });
	}

	render() {
		const { value, suggestions } = this.state
		const { surgicalhistory } = this.props
		const inputProps = {
			placeholder: 'Search Medical Procedures',
			value,
			onChange: this.onChange,
		}
		return (
			<div style={{ margin: 20 }}>
				<GridContainer direction="column" justify="flex-start">
					<GridItem style={{ marginBottom: 10 }}>
						<Typography>Surgical History</Typography>
					</GridItem>
					{surgicalhistory.length === 0 ? (
						<GridItem>
							<Card>
								<CardHeader>
									Patient has no reported surgeries or
									procedures
								</CardHeader>
								<CardBody>
									Please use the form below to add a surgery
									or procedure along with any notes about it.
								</CardBody>
							</Card>
						</GridItem>
					) : (
						<div>
							<GridItem xs={12} sm={10}>
								<Card style={classes.header}>
									<GridItem style={classes.headeritem}>
										<Typography>
											Type of Surgery or Procedure
										</Typography>
									</GridItem>
									<GridItem
										style={classes.headeritem}
										border={1}>
										<Typography>Year Performed</Typography>
									</GridItem>
									<GridItem style={classes.headeritem}>
										<Typography>
											Doctor or Facility
										</Typography>
									</GridItem>
									<GridItem style={classes.headeritem}>
										<Typography>Action</Typography>
									</GridItem>
								</Card>
							</GridItem>
							<div>
								{surgicalhistory.map((surgery, index) => (
									<UpdateSurgicalHistoryItem
										surgery={surgery}
									/>
								))}
							</div>
						</div>
					)}
				</GridContainer>
				<div
					className="w3-row w3-section basic-row"
					style={{ width: '100%' }}>
					<Autosuggest
						suggestions={suggestions}
						onSuggestionsFetchRequested={
							this.onSuggestionsFetchRequested
						}
						onSuggestionsClearRequested={
							this.onSuggestionsClearRequested
						}
						getSuggestionValue={getSuggestionValue}
						renderSuggestion={renderSuggestion}
						inputProps={inputProps}
					/>
					<button
						onClick={() => {
							this.handleClick(this.state.value)
							this.setState({ value: '' })
						}}>
						Add
					</button>
				</div>
				<div>
					<button
						type="submit"
						onClick={() => console.log(this.state.history)}>
						Save
					</button>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		surgicalhistory: state.patient.surgicalhistory,
	}
}

const mapDispatchToProps = (dispatch) => ({
	loadSurgicalHistory: (surgicalhistory) =>
		dispatch({
			type: 'load_surgical_history',
			surgicalhistory: surgicalhistory,
		}),
	updateSurgicalHistory: (surgicalhistory) =>
		dispatch({
			type: 'update_surgical_history',
			surgicalhistory: surgicalhistory,
		}),
})

export default connect(mapStateToProps, mapDispatchToProps)(SurgicalHistory)

/*
{surgicalhistory.map((surgery, index) => (
                                    <GridItem key={index} xs={12} sm={10}>
                                        <Card style={classes.listitemheader}>
                                            <GridItem style={classes.headeritem}>
                                                <input name={`surgicalhistory.${index}.procedure`}
                                                       value={surgicalhistory[index].procedure}/>
                                            </GridItem>
                                            <GridItem style={classes.headeritem} border={1}>
                                                <input name={`surgicalhistory.${index}.date`}
                                                       value={surgicalhistory[index].date}/>
                                            </GridItem>
                                            <GridItem style={classes.headeritem}>
                                                <input name={`surgicalhistory.${index}.performed_by`}/>
                                            </GridItem>
                                            <GridItem style={classes.headeritem}>
                                                <Button onClick={() => this.deleteItem(surgery.id)}>X</Button>
                                            </GridItem>
                                        </Card>
                                    </GridItem>
                                ))}
 */
