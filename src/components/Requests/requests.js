import React, { useState } from 'react'
import MUIDataTable from 'mui-datatables'
import { Typography } from '@mui/material'
import TimeLineModal from './timelinemodal'
import _ from 'lodash'

function viewRequestColumn(tableMeta) {
	console.log(tableMeta)
	const names = [
		'id',
		'type',
		'patient',
		'status',
		'request_description',
		'updates',
	]
	const zip = _.zipObject(names, tableMeta.rowData)
	console.log(zip)

	return (
		<TimeLineModal
			actiontext={{ agree: 'Do It!', disagree: 'No, DOnt!' }}
			buttontext="View Request"
			color="primary"
			requestId={tableMeta.rowData['id']}
			request_description={zip.request_description}
			title="Patient Request"
			updates={zip.updates}
			variant="contained"
		/>
	)
}

function NameColumn(tableMeta) {
	return (
		<Typography>
			{tableMeta.rowData[2].first_name} {tableMeta.rowData[2].last_name}
		</Typography>
	)
}

const columns = [
	{
		name: 'id',
		label: 'Request ID',
		options: {
			display: false,
		},
	},
	{
		name: 'type',
		label: 'Type',
		options: {
			filter: true,
			sort: false,
		},
	},
	{
		name: 'patient',
		label: 'Name',
		options: {
			filter: true,
			sort: true,
			empty: true,
			customBodyRender: (value, tableMeta, updateValue) =>
				NameColumn(tableMeta),
		},
	},
	{
		name: 'status',
		label: 'Status',
		options: {
			filter: true,
			sort: true,
		},
	},
	{
		name: 'request_description',
		label: 'Request Description',
		options: {
			display: false,
		},
	},

	{
		name: 'updates',
		label: 'Request Updates',
		options: {
			display: false,
			empty: true,
		},
	},
	{
		name: 'viewrequest',
		label: 'View Request',
		options: {
			filter: false,
			sort: false,
			empty: true,
			customBodyRender: (value, tableMeta, updateValue) =>
				viewRequestColumn(tableMeta),
		},
	},
]

const options = {
	elevation: 0,
}
export default function Requests() {
	const [patientrequests, setPatientRequests] = useState([
		{
			id: 123123,
			type: 'medication',
			patient: {
				first_name: 'Utah',
				last_name: 'Hans',
			},
			status: 'active',
			request_description: 'test description 222',
			updates: [
				{
					title: 'Update Title',
					subtitle: 'Subtitle',
					description: 'Update description',
				},
				{
					title: 'Update Title 2',
					subtitle: 'Subtitle 2',
					description: 'Update description 2',
				},
			],
		},
	])
	return (
		<MUIDataTable
			columns={columns}
			data={patientrequests}
			options={options}
			title="Active Requests"
		/>
	)
}
