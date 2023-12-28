import React from 'react'
import { useField, useFormikContext, Field } from 'formik'
import TextField from '@mui/material/TextField'
import { gcpGenerateOfficeNoteFromTranscript } from '../../api/ai.gcp'

async function convertTranscriptToOfficeNote(transcript) {
	return await gcpGenerateOfficeNoteFromTranscript(transcript)
}

export default function AsyncAPITextField(props) {
	const {
		values: { transcript },
		setFieldValue,
	} = useFormikContext()
	const [field, meta] = useField(props)

	React.useEffect(() => {
		let isCurrent = true
		// your business logic around when to fetch goes here.
		if (transcript.trim() !== '') {
			convertTranscriptToOfficeNote(transcript).then((converted_text) => {
				if (isCurrent) {
					// prevent setting old values
					setFieldValue(props.name, converted_text)
				}
			})
		}
		return () => {
			isCurrent = false
		}
	}, [transcript, setFieldValue, props.name])

	return (
		<TextField
			multiline
			label={`Generated Office Note`}
			fullWidth
			rows={10}
			cols={50}
			{...field}
			{...props}
		/>
	)
}


/*
* 	export default function AsyncAPITextField(props) {
	const {
		values: { transcript },
		setFieldValue,
	} = useFormikContext()
	const [field, meta] = useField(props)

	React.useEffect(() => {
		let isCurrent = true
		// your business logic around when to fetch goes here.
		if (transcript.trim() !== '') {
			convertTranscriptToOfficeNote(transcript).then((converted_text) => {
				if (isCurrent) {
					// prevent setting old values
					setFieldValue(props.name, converted_text)
				}
			})
		}
		return () => {
			isCurrent = false
		}
	}, [transcript, setFieldValue, props.name])

	return (
		<>
			<textarea rows={10} cols={50} {...props} {...field} />
			{!!meta.touched && !!meta.error && <div>{meta.error}</div>}
		</>
	)
}
* */
