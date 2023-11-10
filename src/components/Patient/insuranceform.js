import React from 'react'
import { Field, FieldArray } from 'formik'
import { TextField } from 'formik-mui'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const InsuranceForm = () => {
	return (
		<FieldArray name="details.insurance">
			{({ push, remove, form: { values } }) => (
				<Grid container spacing={3}>
					{values.details.insurance.map((insurance, index) => (
						<Grid item xs={12} key={index}>
							<Field
								component={TextField}
								name={`details.insurance[${index}].provider`}
								label="Insurance Provider"
								fullWidth
							/>
							<Field
								component={TextField}
								name={`details.insurance[${index}].policy_number`}
								label="Policy Number"
								fullWidth
							/>
							<Field
								component={TextField}
								name={`details.insurance[${index}].memberId`}
								label="Member ID"
								fullWidth
							/>
							<Field
								component={TextField}
								name={`details.insurance[${index}].dateEffected`}
								label="Date Effected"
								type="date"
								InputLabelProps={{
									shrink: true,
								}}
								fullWidth
							/>
							<Field
								component={TextField}
								name={`details.insurance[${index}].dateTerminated`}
								label="Date Terminated"
								type="date"
								InputLabelProps={{
									shrink: true,
								}}
								fullWidth
							/>
							<Field
								component={TextField}
								name={`details.insurance[${index}].groupNumber`}
								label="Group Number"
								fullWidth
							/>
							<Button
								variant="contained"
								color="secondary"
								onClick={() => remove(index)}>
								Remove
							</Button>
						</Grid>
					))}
					<Grid item xs={12}>
						<Button
							variant="contained"
							color="primary"
							onClick={() =>
								push({
									provider: '',
									policy_number: '',
									memberId: '',
									dateEffected: '',
									dateTerminated: '',
									groupNumber: '',
								})
							}>
							Add Insurance
						</Button>
					</Grid>
				</Grid>
			)}
		</FieldArray>
	)
}

export default InsuranceForm
