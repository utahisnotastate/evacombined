import * as React from 'react'

import { Formik, Form, Field } from 'formik'
import { Box, Button, LinearProgress, Typography } from '@mui/material'

import { TextField } from 'formik-mui'
import { saveAppointment } from '../../api/api'

export default function AppointmentForm({ appointment }) {
	return (
		<Formik
			initialValues={appointment}
			onSubmit={(values, { setSubmitting }) => {
				setSubmitting(true)
				saveAppointment(values.id, values)
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
