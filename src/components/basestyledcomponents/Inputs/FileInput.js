import React from 'react'
import { Field } from 'formik'
import { SimpleFileUpload } from 'formik-mui'

export default function EVAFileInput({ label, name, ...props }) {
	return (
		<Field component={SimpleFileUpload} label={label} name={name} {...props} />
	)
}
