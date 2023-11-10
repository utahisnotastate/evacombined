import React from 'react'
import { Field } from 'formik'
import { TextField } from 'formik-mui'
import Grid from '@material-ui/core/Grid'

const DemographicsForm = () => {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12} sm={6}>
				<Field
					component={TextField}
					name="details.demographics.first_name"
					label="First Name"
					fullWidth
				/>
				<Field
					component={TextField}
					name="details.demographics.last_name"
					label="Last Name"
					fullWidth
				/>
				<Field
					component={TextField}
					name="details.demographics.date_of_birth"
					label="Date of Birth"
					type="date"
					InputLabelProps={{
						shrink: true,
					}}
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Field
					component={TextField}
					name="details.demographics.email"
					label="Email"
					fullWidth
				/>
				<Field
					component={TextField}
					name="details.demographics.phone"
					label="Phone"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12}>
				<Field
					component={TextField}
					name="details.demographics.address"
					label="Address"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} sm={4}>
				<Field
					component={TextField}
					name="details.demographics.city"
					label="City"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} sm={4}>
				<Field
					component={TextField}
					name="details.demographics.state"
					label="State"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} sm={4}>
				<Field
					component={TextField}
					name="details.demographics.zip_code"
					label="Zip Code"
					fullWidth
				/>
			</Grid>
		</Grid>
	)
}

export default DemographicsForm
