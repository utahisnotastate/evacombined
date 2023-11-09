import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'
import { makeStyles } from '@material-ui/core/styles'
//import "./newcomplaint.css";
import { Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
//import Button from "../../../../../../basestyledcomponents/Button";
import { useParams } from 'react-router-dom'

// https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&df=code,name

//old api https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?sf=primary_name,consumer_name,icd10cm&terms=
// https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&df=code,name&terms=
const API_URL =
	'https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?sf=DISPLAY_NAME,STRENGTHS_AND_FORMS&df=DISPLAY_NAME,STRENGTHS_AND_FORMS&terms='

const EVA_URL = 'http://127.0.0.1:8000/api'

function getComplaintNameSuggestionValue(suggestion) {
	return `${suggestion[0]} ${suggestion[1]}`
}

function renderSuggestion(suggestion) {
	return <span>{suggestion}</span>
}

const useStyles = makeStyles((theme) => ({
	searchcontainer: {
		boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
		margin: '10px',
	},
	searchlabel: {
		color: theme.palette.primary.main,
	},
	searchinput: {
		padding: '15px',
		width: '100%',
		zIndex: 900,
		opacity: 0.99,
	},
}))

function MedicationDosages(props) {
	const handleSelect = (event) => {
		console.log(event.target.value)
		props.setDosage(event.target.value)
	}
	return (
		<div>
			{props.dosages.length > 0 ? (
				<select
					value={props.dosage}
					name="dosages"
					onChange={handleSelect}>
					<option value={``}>Please Select a Dosage</option>
					{props.dosages.map((dosage) => (
						<option key={dosage} value={dosage}>
							{dosage}
						</option>
					))}
				</select>
			) : null}
		</div>
	)
}

export default function NewMedication(props) {
	let { id } = useParams()
	//let dispatch = useDispatch();
	//const { register, getValues, setValue, control, watch } = useFormContext();
	const classes = useStyles()
	const [suggestions, setSuggestions] = useState([])
	const [dosages, setDosages] = useState([])
	const [buttondisabled, setButtonDisabled] = useState(true)
	const [dosage, setDosage] = useState('')
	const [frequency, setFrequency] = useState('')
	// const clinical_complaint = useSelector(state => state.appointment.complaints.inputfields.patient_complaint)
	const [complaint_name, setComplaintName] = useState('')
	const onComplaintNameChange = (event, { newValue, method }) => {
		setComplaintName(newValue)
	}
	const onSuggestionsFetchRequested = ({ value }) => {
		fetch(`${API_URL}${value}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
				//setSuggestions([...suggestions, ...data[3]]);
				setSuggestions(data[3])
			})
	}
	const onComplaintNameSuggestionSelected = (
		event,
		{ suggestion, suggestionValue }
	) => {
		// event.preventDefault();
		const medication = {
			name: suggestion[0],
			dosages: suggestion[1].split(','),
		}
		//console.log(suggestion);
		console.log(medication)
		setDosages(medication.dosages)
		//props.addAssessment(suggestion);
		/*addNewPatientDiagnosis(props.patientId, newdiagnosis).then((response) => {
		  console.log(
			"After diagnosis creation response is " + JSON.stringify(response)
		  );
		  setComplaintName("");
		});*/

		/*props.append({
				  icd10assessmentcode: suggestion[0],
				  icd_description: suggestion[1],
				});*/
		// setValue("complaint_name", suggestionValue);
		setComplaintName(medication.name)
	}
	const onSuggestionsClearRequested = () => {
		setSuggestions([])
	}
	const inputComplaintNameDescriptionProps = {
		placeholder: 'Search Medications',
		value: complaint_name,
		className: classes.searchinput,
		onChange: onComplaintNameChange,
	}

	const addMedicationHandler = (medication) => {
		//console.log(medication);
		props.addMedication(medication)
		setComplaintName('')
		setDosages([])
		setDosage('')
	}

	const handleFrequencyChange = (event) => {
		setFrequency(event.target.value)
	}
	return (
		<Grid
			container
			className={classes.searchcontainer}
			direction="row"
			spacing={2}>
			<Grid item>
				<Typography variant={`h6`} color={`primary`}>
					{props.label ? props.label : 'Add New Medication'}
				</Typography>
			</Grid>
			<Grid item>
				<Autosuggest
					suggestions={suggestions}
					onSuggestionsFetchRequested={onSuggestionsFetchRequested}
					onSuggestionsClearRequested={onSuggestionsClearRequested}
					getSuggestionValue={getComplaintNameSuggestionValue}
					renderSuggestion={renderSuggestion}
					onSuggestionSelected={onComplaintNameSuggestionSelected}
					inputProps={inputComplaintNameDescriptionProps}
				/>
			</Grid>
			<Grid item>
				<MedicationDosages dosages={dosages} setDosage={setDosage} />
			</Grid>
			<Grid item>
				{dosage === '' ? null : (
					<input
						type="text"
						value={frequency}
						onChange={handleFrequencyChange}
						placeholder={`Enter frequency`}
					/>
				)}
			</Grid>
			<Grid item>
				{dosage === '' || frequency === '' ? null : (
					<Grid container direction="row">
						<Grid item>
							<Button
								color="primary"
								variant="contained"
								onClick={() =>
									addMedicationHandler({
										name: complaint_name,
										dosage: dosage,
										frequency: frequency,
									})
								}>
								Add Medication
							</Button>
						</Grid>
					</Grid>
				)}
			</Grid>
		</Grid>
	)
}

/*
<CardContent>
        <Grid container direction="column">
          <Grid item className={classes.newcomplaintcontainer} xs={12}>
            <Typography>Search ICD codes</Typography>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getComplaintNameSuggestionValue}
              renderSuggestion={renderSuggestion}
              onSuggestionSelected={onComplaintNameSuggestionSelected}
              inputProps={inputComplaintNameDescriptionProps}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
 */
