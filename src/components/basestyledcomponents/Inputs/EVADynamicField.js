import React from 'react'
import EVATextField from './TextField'
import EVASelect from './Select'
import EVAFieldArray from './EVAFieldArray'

export default function EVADynamicField({
	name,
	label,
	value,
	placeholder,

	type,
	options,
	helperText,
	...rest
}) {
	switch (type) {
		case 'text':
			return (
				<EVATextField
					label={label}
					name={name}
					helperText={helperText}
					placeholder={placeholder}
					{...rest}
				/>
			)
		case 'select':
			return (
				<EVASelect
					name={name}
					label={label}
					placeholder={placeholder}
					options={options}
					{...rest}
				/>
			)
		case 'fieldarray':
			return <EVAFieldArray label={label} name={name} />


		default:
			return (
				<EVATextField
					label={label}
					name={name}
					helperText={helperText}
					placeholder={placeholder}
				/>
			)
	}
}

/*
export default function EVADynamicField({
	name,
	label,
	value,
	type,
	options,
	helperText,
	...props
}) {
	switch (type) {
		case 'text':
			return <EVATextField label={label} name={name} {...props} />
		default:
			return <EVATextField label={label} name={name} {...props} />
	}
}

 */
