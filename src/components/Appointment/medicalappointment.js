import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TextField, Paper, Button } from '@mui/material'
import { getAppointment, saveAppointment } from '../../api/api'
import {
	cleanRoughAudioTranscriptText,
	convertCleanedTranscriptIntoOfficeNote,
	generateClaimFromOfficeNote,
} from '../../api/ai.api'

export default function MedicalAppointment() {
	const { appointmentId } = useParams()
	const [isListening, setIsListening] = useState(false)
	const [speechRecognition, setSpeechRecognition] = useState(null) // Store the speech recognition instance

	const [appointment, setAppointment] = useState({
		id: appointmentId,
		type: 'regular',
		status: 'scheduled',
		start: '',
		end: '',
		transcript: '',
		cleaneduptranscript: '',
		note: '',
		claim: '',
	})

	const handleCleanTranscript = async () => {
		//setIsLoading(true); // Assuming you have a loading state
		console.log(appointment.transcript)
		try {
			const cleanedTranscript = await cleanRoughAudioTranscriptText(
				appointment.transcript
			)
			setAppointment((prevState) => ({
				...prevState,
				cleaneduptranscript: cleanedTranscript,
			}))
		} catch (error) {
			console.error('Error cleaning transcript:', error)
			// Handle error appropriately in your UI
		} finally {
			//setIsLoading(false);
		}
	}

	useEffect(() => {
		getAppointment(appointmentId).then(setAppointment)
	}, [appointmentId])

	useEffect(() => {
		// Initialize speech recognition
		if (
			'SpeechRecognition' in window ||
			'webkitSpeechRecognition' in window
		) {
			const SpeechRecognition =
				window.SpeechRecognition || window.webkitSpeechRecognition
			const recognitionInstance = new SpeechRecognition()
			recognitionInstance.continuous = true // Keep listening even after voice stops
			recognitionInstance.interimResults = true // Show results even when not yet final

			recognitionInstance.onresult = (event) => {
				const transcriptArr = [...event.results].map(
					(result) => result[0].transcript
				)
				setAppointment((prevState) => ({
					...prevState,
					transcript:
						prevState.transcript + transcriptArr.join(' ').trim(),
				}))
			}

			setSpeechRecognition(recognitionInstance)
		} else {
			console.log('Speech Recognition not available.')
		}
	}, [])

	useEffect(() => {
		// Start or stop speech recognition based on isListening
		if (isListening && speechRecognition) {
			speechRecognition.start()
		} else if (speechRecognition) {
			speechRecognition.stop()
		}

		// Ensure to stop recognition when component unmounts
		return () => {
			if (speechRecognition) {
				speechRecognition.stop()
			}
		}
	}, [isListening, speechRecognition])

	const handleChange = (e) => {
		const { name, value } = e.target
		setAppointment((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const updatedAppointment = await saveAppointment(appointment)
			console.log('Updated appointment:', updatedAppointment)
			alert('Appointment saved successfully!')
		} catch (error) {
			console.error('Save failed:', error)
			alert('Failed to save appointment.')
		}
	}

	return (
		<Paper style={{ padding: '20px' }}>
			<form onSubmit={handleSubmit}>
				<TextField
					label="Transcript"
					name="transcript"
					multiline
					fullWidth
					minRows={8}
					value={appointment.transcript}
					onChange={handleChange}
					margin="normal"
				/>
				<div>
					<Button
						variant="contained"
						color="primary"
						onClick={() => setIsListening(true)}
						sx={{ marginRight: 1 }}>
						Start
					</Button>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => setIsListening(false)}>
						Stop
					</Button>
				</div>
				<div>
					<TextField
						label="Cleaned Up Transcript"
						name="cleaneduptranscript"
						multiline
						fullWidth
						minRows={8}
						value={appointment.cleaneduptranscript}
						onChange={handleChange}
						margin="normal"
					/>
					<Button
						variant="contained"
						color="secondary"
						onClick={handleCleanTranscript}>
						Clean Up Transcript
					</Button>
				</div>

				<div>
					<TextField
						label="Office Note"
						name="note"
						multiline
						fullWidth
						minRows={8}
						value={appointment.note}
						onChange={handleChange}
						margin="normal"
					/>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => console.log('Generate Note')}>
						Generate Office Note
					</Button>
				</div>

				<div>
					<TextField
						label="Claim"
						name="claim"
						multiline
						fullWidth
						minRows={8}
						value={appointment.claim}
						onChange={handleChange}
						margin="normal"
					/>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => console.log('Generate Claim')}>
						Generate Claim
					</Button>
				</div>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					sx={{ marginTop: 2 }}>
					Save Appointment
				</Button>
			</form>
		</Paper>
	)
}
