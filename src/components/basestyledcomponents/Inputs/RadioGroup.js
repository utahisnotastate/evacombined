import React from 'react'
import { FormControlLabel, Radio } from '@mui/material'
import { Field } from 'formik'
import { RadioGroup } from 'formik-mui'

export default function EVARadioButtonList({ options, label, name }) {
	return (
		<Field component={RadioGroup} label={label} name={name}>
			{options && options.length > 0
				? options.map((option, index) => (
						<FormControlLabel
							control={<Radio />}
							key={index}
							label={option.label}
							value={option.value}
						/>
				  ))
				: null}
		</Field>
	)
}
