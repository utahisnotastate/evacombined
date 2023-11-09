import React from 'react'
import { Field } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'

export default function EVACheckBoxAndLabel({
	name,
	label,
	helperText,
	...props
}) {
	//render checkbox and label with formik field and props
	return (
		<Field
			Label={{ label: label }}
			component={CheckboxWithLabel}
			name={name}
			type="checkbox"
		/>
	)
}
