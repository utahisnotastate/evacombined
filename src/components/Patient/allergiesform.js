import React from 'react'
import { FieldArray, useField } from 'formik'
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@material-ui/core'

const allAllergies = [
	'Penicillin',
	'Peanuts',
	// Add more allergies here
]

const AllergyInput = ({ name }) => {
	const [field, , helpers] = useField(name)
	return (
		<Autocomplete
			options={allAllergies}
			placeholder={'Allergy'}
			value={field.value}
			onChange={(_, value) => helpers.setValue(value)}
			renderInput={(params) => <TextField {...params} />}
		/>
	)
}

const AllergiesForm = () => (
	<FieldArray name="details.allergies">
		{({ push, remove, form: { values } }) => (
			<div>
				<button type="button" onClick={() => push('')}>
					Add Allergy
				</button>
				{values.details.allergies.map((allergy, index) => (
					<div key={index}>
						<AllergyInput name={`details.allergies.${index}`} />
						<button type="button" onClick={() => remove(index)}>
							Remove
						</button>
					</div>
				))}
			</div>
		)}
	</FieldArray>
)

export default AllergiesForm
