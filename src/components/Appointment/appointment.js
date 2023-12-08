import React, { useState, useEffect } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import annyang from 'annyang'
import {
	Button,
	Container,
	Typography,
	Paper,
	Box,
	TextField,
} from '@mui/material'

const Appointment = () => {
	const [isListening, setIsListening] = useState(false)
	const [transcript, setTranscript] = useState('')
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
			<div>
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<SaveIcon
						onClick={() => {
							console.log('clicked to save')
						}}
					/>
				</div>
			</div>
			<div>
				<div
					style={{ display: 'flex', justifyContent: 'space-around' }}>
					<Typography>Record Appointment</Typography>
					<Typography>Cleaned Transcript</Typography>
					<Typography>Additional Transcriptions</Typography>
					<Typography>AI Generated Forms</Typography>
					<Typography>Generated Medical Office Note</Typography>
				</div>
			</div>

			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<Box
					sx={{
						display: 'flex',
						marginBottom: 2,
					}}>
					<Button
						variant="contained"
						color="primary"
						onClick={() => setIsListening(true)}
						sx={{ marginRight: 1 }}>
						Record
					</Button>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => setIsListening(false)}>
						Generate Note
					</Button>
				</Box>
				<Box>
					<TextField
						fullWidth
						multiline
						rows={4}
						variant="outlined"
						placeholder={`Transcript from recorded audio`}
						value={transcript}
						onChange={(e) => setTranscript(e.target.value)}
					/>
				</Box>
				<Box>
					<TextField
						fullWidth
						multiline
						rows={4}
						placeholder={`Finalized Medical Office Note`}
						variant="outlined"
						value={gpt3Response}
						onChange={(e) => setGpt3Response(e.target.value)}
					/>
				</Box>
			</div>
		</Container>
	)
}

export default Appointment

/*
* 	<Button variant={`contained`} onClick={handleSubmitToGPT3}>
						Save
					</Button>
* */
