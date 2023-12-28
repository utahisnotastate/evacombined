import * as React from 'react'

import { Formik, Form, Field } from 'formik'
import {
	Box,
	Button,
	LinearProgress,
	Typography,
	TextField as MUITextInput,
} from '@mui/material'
import annyang from 'annyang'
import { TextField } from 'formik-mui'
import { saveAppointment } from '../../api/api'

export default function AppointmentForm({ appointment }) {
	const [isListening, setIsListening] = React.useState(false)
	const [transcript, setTranscript] = React.useState('')
	const [gpt3Response, setGpt3Response] = React.useState('')

	React.useEffect(() => {
		if (annyang) {
			const commands = {
				'*text': function (text) {
					setTranscript(
						(prevTranscript) => prevTranscript + ' ' + text
					)
				},
			}

			annyang.addCommands(commands)

			if (isListening) {
				annyang.start()
			} else {
				annyang.pause()
			}
		}

		return () => {
			if (annyang) {
				annyang.abort()
			}
		}
	}, [isListening])

	return (
		<Formik
			initialValues={appointment}
			onSubmit={(values, { setSubmitting }) => {
				true
				saveAppointment(values)
					.then((response) => {
						console.log(response)
						setSubmitting(false)
						console.log(`IT SAVED AND WORKED!!!!`)
					})
					.catch((error) => console.log(error))
			}}>
			{({
				values,
				submitForm,
				resetForm,
				isSubmitting,
				touched,
				errors,
			}) => (
				<Form>
					<Box margin={1}>
						<Field
							multiline
							fullWidth
							minRows={5}
							component={TextField}
							type="textarea"
							label="Cleaned and Formatted Transcript"
							InputProps={{ notched: true }}
							name="cleanedtranscript"
						/>
					</Box>
				</Form>
			)}
		</Formik>
	)
}
