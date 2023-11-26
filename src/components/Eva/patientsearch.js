import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { Box, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

export default function PatientSearch() {
	const patients = useSelector((state) => state.Patients)

	const getOptionLabel = (option) => {
		const { first_name, last_name, date_of_birth } =
			option.details.demographics
		return `${first_name} ${last_name} - DOB: ${date_of_birth}`
	}

	return (
		<Autocomplete
			options={patients}
			getOptionLabel={getOptionLabel}
			renderOption={(props, option) => (
				<Box component="li" {...props}>
					<Typography variant="body1">
						{`${option.details.demographics.first_name} ${option.details.demographics.last_name}`}
					</Typography>
					<Typography variant="body2" color="textSecondary">
						{`Gender: ${
							option.details.demographics.gender || 'N/A'
						}, DOB: ${option.details.demographics.date_of_birth}`}
					</Typography>
				</Box>
			)}
			renderInput={(params) => (
				<TextField {...params} label="Search Patients" />
			)}
		/>
	)
}
