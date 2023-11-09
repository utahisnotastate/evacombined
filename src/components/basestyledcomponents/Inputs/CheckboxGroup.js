import React from 'react'
import { FormControl, FormGroup, FormLabel } from '@mui/material'
import { Field } from 'formik'
import { CheckboxWithLabel } from 'formik-mui'

export default function EVACheckBoxGroup({ name, label, options, ...props }) {
	//render checkbox and label with formik field and props
	return (
		<FormControl component="fieldset" style={{ display: 'flex' }}>
			<FormLabel component="legend">{label}</FormLabel>
			<FormGroup>
				{options.map((opt) => (
					<Field
						Label={{ label: opt.label }}
						component={CheckboxWithLabel}
						key={opt.value}
						name={name}
						type="checkbox"
						value={opt.value}
					/>
				))}
			</FormGroup>
		</FormControl>
	)
}
