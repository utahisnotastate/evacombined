import React from 'react'
import { Field } from 'formik'
import { TextField } from 'formik-mui'

export default function EVATextField({ label, name, ...props }) {
	return (
		<Field
			InputProps={{ notched: true }}
			InputLabelProps={{ shrink: true }}
			label={label}
			name={name}
			component={TextField}
			{...props}
		/>
	)
}
