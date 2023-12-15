import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { Box, Typography } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'

export default function PatientSearch() {
	const patients = useSelector((state) => state.Patients)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const getOptionLabel = (option) => {
		const { first_name, last_name, date_of_birth } =
			option.details.demographics
		return `${first_name} ${last_name} - DOB: ${date_of_birth}`
	}
	const onPatientSelect = (event, option) => {
		if (option) {
			dispatch({ type: 'SET_PATIENT', patient: option })
			navigate(`/patients/${option.id}/`)
		}
	}

	return (
		<Box sx={{ width: '100%' }}>
			<Typography variant="h6" gutterBottom>
				Search Patients
			</Typography>
			<Autocomplete
				fullWidth={true}
				options={patients}
				getOptionLabel={getOptionLabel}
				onChange={onPatientSelect}
				renderOption={(props, option) => (
					<NavLink to={`/patients/${option.id}/`} {...props}>
						<Typography variant="body1">
							{`${option.details.demographics.first_name} ${option.details.demographics.last_name}`}
						</Typography>
						<Typography variant="body2" color="textSecondary">
							{`Gender: ${
								option.details.demographics.gender || 'N/A'
							}, DOB: ${
								option.details.demographics.date_of_birth
							}`}
						</Typography>
					</NavLink>
				)}
				renderInput={(params) => (
					<TextField {...params} label="Search Patients" />
				)}
			/>
		</Box>
	)
}


/*
*<Box sx={{ width: '100%' }}>
			<Typography variant="h6" gutterBottom>
				Search Patients
			</Typography>
			<Autocomplete
				fullWidth={true}
				options={patients}
				getOptionLabel={getOptionLabel}
				renderOption={(props, option) => (
					<div
						onClick={() => {
							console.log(option)
							dispatch({ type: 'SET_PATIENT', patient: option })
							navigate(`/patients/${option.id}/`)
						}}>
						<Typography variant="body1">
							{`${option.details.demographics.first_name} ${option.details.demographics.last_name}`}
						</Typography>
						<Typography variant="body2" color="textSecondary">
							{`Gender: ${
								option.details.demographics.gender || 'N/A'
							}, DOB: ${
								option.details.demographics.date_of_birth
							}`}
						</Typography>
					</div>
				)}
				renderInput={(params) => (
					<TextField {...params} label="Search Patients" />
				)}
			/>
		</Box>
*
* */
