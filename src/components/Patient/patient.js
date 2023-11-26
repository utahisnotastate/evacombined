import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { useParams } from 'react-router-dom'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import AllergiesForm from './allergiesform'
import DemographicsForm from './demographicsform'
import InsuranceForm from './insuranceform'
import Appointments from './appointments'

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	)
}

const Patient = () => {
	const { patientId } = useParams()
	const [value, setValue] = useState(0)

	const handleTabChange = (event, newTabValue) => {
		setValue(newTabValue)
	}

	const handleSubmit = (values) => {
		console.log(values)
	}

	return (
		<Card>
			<CardContent>
				<Formik
					initialValues={{
						id: 136,
						fields: [
							{
								name: 'additional_info_1',
								value: 'Some additional information',
							},
							{
								name: 'additional_info_2',
								value: 'Some more additional information',
							},
						],
						details: {
							allergies: ['Penicillin', 'Peanuts'],
							insurance: [
								{
									provider: 'HealthInsuranceCo',
									policy_number: 'ABC1234567',
									memberId: 'MEMBER-123456789',
									dateEffected: '2021-01-01',
									dateTerminated: '',
									groupNumber: 'GROUP-12312341234',
								},
							],
							medications: ['Aspirin', 'Tylenol'],
							demographics: {
								city: 'Springfield',
								email: 'john.doe@example.com',
								phone: '123-456-7890',
								state: 'IL',
								address: '123 Main St.',
								zip_code: '12345',
								last_name: 'Doe',
								first_name: 'John',
								date_of_birth: '1980-01-01',
							},
							medical_history: ['Asthma', 'High blood pressure'],
							surgical_history: ['Appendectomy', 'Tonsillectomy'],
						},
						ssn: 123456789,
					}}
					onSubmit={handleSubmit}>
					<Form>
						<Box>
							<Tabs value={value} onChange={handleTabChange}>
								<Tab label="Demographics" />
								<Tab label="Allergies" />
								<Tab label="Insurance" />
								<Tab label="Appointments" />
								<Tab label="Medical History" />
								<Tab label="Surgical History" />
								<Tab label="Medications" />
							</Tabs>
						</Box>
						<CustomTabPanel value={value} index={0}>
							<DemographicsForm />
						</CustomTabPanel>
						<CustomTabPanel value={value} index={1}>
							<AllergiesForm />
						</CustomTabPanel>
						<CustomTabPanel value={value} index={2}>
							<InsuranceForm />
						</CustomTabPanel>
						<CustomTabPanel value={value} index={3}>
							<Appointments />
						</CustomTabPanel>
					</Form>
				</Formik>
			</CardContent>
			<CardActions>
				<button type="submit">Submit</button>
			</CardActions>
		</Card>
	)
}

export default Patient
