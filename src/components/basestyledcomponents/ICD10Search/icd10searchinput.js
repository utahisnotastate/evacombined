import React from 'react'
import { useField } from 'formik'
import Grid from '@material-ui/core/Grid'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'

const API_URL =
	'https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?sf=primary_name,consumer_name,icd10cm_codes,word_synonyms,synonyms&df=primary_name,consumer_name,icd10cm_codes&terms='

const ICD10SearchInput = ({ label, name }) => {
	const [field, meta, helpers] = useField(name)
	const { value } = field
	const { setValue } = helpers
	const { error, touched } = meta

	const fetchSuggestions = async (value) => {
		try {
			const response = await axios.get(`${API_URL}${value}`)
			const data = response.data[3]
			return data.map((item) => ({
				icd10assessmentcode: item[2],
				assessment_description: item[1],
			}))
		} catch (error) {
			console.error(error)
			return []
		}
	}

	const handleChoice = (event, value) => {
		if (value) {
			setValue(value.icd10assessmentcode)
		} else {
			setValue('')
		}
	}

	const handleInputChange = (event, newValue) => {
		setValue(newValue)
	}

	return (
		<Grid container direction="column">
			<Grid item>
				<Autocomplete
					options={fetchSuggestions(value)}
					getOptionLabel={(option) =>
						`${option.icd10assessmentcode} - ${option.assessment_description}`
					}
					renderInput={(params) => (
						<TextField
							{...params}
							label={label}
							placeholder={label}
							value={value}
							name={name}
							onChange={handleInputChange}
							error={touched && error}
							helperText={touched && error}
						/>
					)}
					onChange={handleChoice}
				/>
			</Grid>
			<Grid item>
				<Typography>Other Assessment</Typography>
			</Grid>
		</Grid>
	)
}

export default ICD10SearchInput
