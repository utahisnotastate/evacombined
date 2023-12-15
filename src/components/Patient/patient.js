import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, NavLink } from 'react-router-dom'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import AllergiesForm from './allergiesform'
import DemographicsForm from './demographicsform'
import InsuranceForm from './insuranceform'
import Appointments from './appointments'
import { getPatient } from '../../api/api'

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
	const dispatch = useDispatch()
	const { patientId } = useParams()
	const patient = useSelector((state) => state.patient)
	const [appointments, setAppointments] = useState([])
	const [value, setValue] = useState(0)

	const handleTabChange = (event, newTabValue) => {
		setValue(newTabValue)
	}
	const handleSubmit = (values) => {
		console.log(values)
	}
	//useEffect that when the component loads, it fetches the patient data from the API using the :patientID. Additionally, it should set the initial values of the form to the data returned from the API. The state.patient from the redux store should be used to populate the form.

	return (
		<Card>
			<CardContent>
				<Formik
					initialValues={patient}
					enableReinitialize={true}
					onSubmit={handleSubmit}>
					<Form>
						<Box>
							<Tabs value={value} onChange={handleTabChange}>
								<Tab label="Demographics" />
								<Tab label="Allergies" />
								<Tab label="Insurance" />
								<Tab label="Appointments" />
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
							<Appointments
								appointments={appointments}
								patientId={patientId}
							/>
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
