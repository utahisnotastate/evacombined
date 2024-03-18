import React, { useState, useEffect } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import annyang from 'annyang'
import { Container, Box, TextField } from '@mui/material'
import { exampletranscript } from '../../api/api'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-mui'
import Button from '@mui/material/Button'

const Appointment = () => {
	const [isListening, setIsListening] = useState(false)
	const [transcript, setTranscript] = useState(exampletranscript)
	const [officeNote, setOfficeNote] = useState('')
	const [claim, setClaim] = useState()
	const [gpt3Response, setGpt3Response] = useState('')

	useEffect(() => {
		if (annyang) {
			const commands = {
				'*text': function (text) {
					setTranscript(
						(prevTranscript) => prevTranscript + ' ' + text
					)
				},
			}

			//medical appointment form component

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

	const handleSubmitToGPT3 = async () => {
		const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions'

		const requestBody = {
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'system',
					content:
						"Generate a medical office note from the audio transcript provided by the user which includes diagnoses, patient complaints, assessments, plans, physical exam notes, summary, etc. The notes should implement the advice given in this article: 'https://mobius.md/2022/11/14/step-by-step-guide-to-taking-perfect-clinical-notes/'.",
				},
				{
					role: 'user',
					content: transcript,
				},
			],
			max_tokens: 1000,
			temperature: 0.6,
			top_p: 0.9,
			frequency_penalty: -0.5,
			presence_penalty: 0.5,
		}

		try {
			let response = await fetch(OPENAI_ENDPOINT, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Make sure to replace 'YOUR_OPENAI_API_KEY' with your actual API key
				},
				body: JSON.stringify(requestBody),
			})

			let data = await response.json()
			if (data.choices && data.choices.length > 0) {
				console.log(data)
				setGpt3Response(data.choices[0].message.content)
			} else {
				console.error('No response from GPT-3', data)
			}
		} catch (error) {
			console.error('Error calling GPT-3', error)
		}
	}

	const handleGenerateOfficeNote = async () => {
		setIsListening(false)
		const officenote = await handleSubmitToGPT3()
		console.log(officenote)
	}

	return (
		<Container>
			<Formik
				initialValues={{
					transcripts: '',
					office_note: '',
					claim: '',
					gpt3Response: '',
				}}
				onSubmit={(values, actions) => {
					setIsListening(false)
					handleSubmitToGPT3(values, actions)
				}}>
				{({ errors, touched, isSubmitting }) => (
					<Form>
						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
							}}>
							<SaveIcon
								onClick={() => {
									console.log('clicked to save')
								}}
							/>
						</div>
						<Box>
							<Field name="gpt3Response">
								{({ field }) => (
									<TextField
										{...field}
										fullWidth
										multiline
										rows={4}
										placeholder={`Finalized Medical Office Note`}
										variant="outlined"
										error={
											errors.gpt3Response &&
											touched.gpt3Response
										}
										helperText={
											errors.gpt3Response &&
											touched.gpt3Response
												? errors.gpt3Response
												: ''
										}
									/>
								)}
							</Field>
						</Box>
						<Box>
							<Field
								component={TextField}
								label="Medical Office Note"
								name="office_note"
								variant="outlined"
								InputProps={{ notched: true }}
							/>
							;
						</Box>
						<Box>
							<Field
								component={TextField}
								label="Claim"
								name="claim"
								variant="outlined"
								InputProps={{ notched: true }}
							/>
							;
						</Box>
						<Box mt={2}>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								disabled={isSubmitting}>
								Generate Office Note
							</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</Container>
	)
}
export default Appointment
