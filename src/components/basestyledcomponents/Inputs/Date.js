import React from 'react'
import { Field } from 'formik'
import { DatePicker } from 'formik-mui-lab'

export default function EVADateField({ name, label, ...props }) {
	return (
		<Field
			component={DatePicker}
			format="MM/dd/yyyy"
			fullWidth
			label={label}
			margin="normal"
			name={name}
			{...props}
		/>
	)
}
