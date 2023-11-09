import React from 'react'
import { Field } from 'react-final-form'
import { Button } from '@mui/material'
import { FieldArray } from 'react-final-form-arrays'

export default function Section({ name, fields }) {
	return (
		<FieldArray name={name}>
			{({ fields }) => (
				<div>
					{fields && fields.length > 0
						? fields.map((name, index) => (
								<div key={index}>
									<div>
										<label>Last Name</label>
										<Field
											name={`${name}.lastName`}
											component="input"
										/>
									</div>
									<button
										type="button"
										onClick={() => fields.remove(index)}>
										Remove
									</button>
								</div>
						  ))
						: null}
					<Button
						variant="contained"
						onClick={() =>
							fields.push({ firstName: '', lastName: '' })
						}>
						Add
					</Button>
				</div>
			)}
		</FieldArray>
	)
}
