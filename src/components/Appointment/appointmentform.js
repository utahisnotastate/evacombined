import * as React from 'react'

import { Formik, Form, Field } from 'formik'
import { Box, Button, LinearProgress, Typography } from '@mui/material'

import { TextField } from 'formik-mui'

export default function AppointmentForm() {
	return (
		<Formik
			initialValues={{
				id: 104,
				type: 'first_appointment',
				status: 'scheduled',
				start: '2023-10-05T13:30:00Z',
				end: '2023-10-05T15:00:00Z',
				fields: [],
				transcript: 'dfgdfgdfgdfg',
				cleanedtranscript: 'cleaned transcript',
				note: 'w34w343434',
				complaints: 'erer',
				review_of_systems: '',
				assessments: '',
				plans: '',
				physical_exam: '',
				summary: '',
				patient: 136,
				provider: 4,
			}}
			onSubmit={(values, { setSubmitting }) => {
				setSubmitting(true)
				console.log(values)
				setSubmitting(false)
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
						<Button
							sx={{ margin: 1 }}
							variant="contained"
							color="primary"
							disabled={isSubmitting}
							onClick={submitForm}>
							Save
						</Button>
					</Box>
					<Box margin={1}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}>
							<div>
								<Typography>Audio Transcript</Typography>
							</div>
							<div>
								<Typography>
									Cleaned and Formatted Transcript
								</Typography>
							</div>
							<div>
								<Typography>Plans</Typography>
							</div>
							<div>
								<Typography>Medical Office Note</Typography>
							</div>
						</div>
					</Box>
					<Box margin={1}>
						<Field
							multiline
							fullWidth
							minRows={5}
							component={TextField}
							type="textarea"
							label="Audio Transcript"
							InputProps={{ notched: true }}
							name="transcript"
						/>
					</Box>
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
					<Box margin={1}>
						<Field
							multiline
							fullWidth
							minRows={5}
							component={TextField}
							type="textarea"
							label="Complaints"
							placeholder={`Please describe the patient complaints`}
							InputProps={{ notched: true }}
							name="complaints"
						/>
					</Box>
					<Box margin={1}>
						<Field
							multiline
							fullWidth
							minRows={5}
							component={TextField}
							type="textarea"
							label="Physical Exam"
							InputProps={{ notched: true }}
							name="physical_exam"
						/>
					</Box>
					<Box margin={1}>
						<Field
							multiline
							fullWidth
							minRows={5}
							component={TextField}
							type="textarea"
							label="Assessments"
							InputProps={{ notched: true }}
							name="assessments"
						/>
					</Box>
					<Box margin={1}>
						<Field
							multiline
							fullWidth
							minRows={5}
							component={TextField}
							type="textarea"
							label="Plans"
							InputProps={{ notched: true }}
							name="plans"
						/>
					</Box>
					<Box margin={1}>
						<Field
							multiline
							fullWidth
							minRows={5}
							component={TextField}
							type="textarea"
							label="Office Note"
							InputProps={{ notched: true }}
							name="note"
						/>
					</Box>
					{isSubmitting && <LinearProgress />}
					<pre>{JSON.stringify(values, null, 2)}</pre>
				</Form>
			)}
		</Formik>
	)
}
