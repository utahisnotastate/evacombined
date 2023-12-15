import * as React from 'react'
import { useSpeechRecognition } from 'react-speech-recognition'
import { Button, Typography } from '@mui/material'
import { useField, useFormikContext, Field } from 'formik'
import { TextField } from 'formik-mui'

const SpeechRecognitionInput = ({ name, ...otherProps }) => {
	const { setFieldValue } = useFormikContext()
	const [field, meta] = useField(name)
	const {
		transcript,
		resetTranscript,
		listening,
		startListening,
		stopListening,
	} = useSpeechRecognition()

	React.useEffect(() => {
		setFieldValue(name, transcript)
	}, [transcript, setFieldValue, name])

	return (
		<div>
			<Field
				component={TextField}
				name={name ? name : 'audiotranscript'}
				value={transcript}
				InputProps={{
					notched: true,
				}}
			/>
			<Button
				variant="contained"
				onClick={startListening}
				disabled={listening}>
				Record
			</Button>
			<Button
				variant="contained"
				onClick={stopListening}
				disabled={!listening}>
				Stop
			</Button>
			<Button variant="contained" onClick={resetTranscript}>
				Reset
			</Button>
		</div>
	)
}

export default SpeechRecognitionInput
