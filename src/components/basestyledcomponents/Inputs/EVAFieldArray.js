import React from 'react'
import { FieldArray, Field } from 'formik'

export default function EVAFieldArray({ name, items, blankobject, addbuttonlabel }) {
	return (
		<FieldArray
			name={name}
			render={(arrayHelpers) => (
				<>
					{items && items.length > 0 ? (
						items.map((item, index) => (
							<div key={index}>
								<Field name={`${name}.${index}`} />
								<button
									onClick={() => arrayHelpers.remove(index)}
									type="button" // remove a friend from the list
								>
									-
								</button>
								<button
									onClick={() => arrayHelpers.insert(index, '')}
									type="button" // insert an empty string at a position
								>
									+
								</button>
							</div>
						))
					) : (
						<button onClick={() => arrayHelpers.push(blankobject)} type="button">
							{/* show this when user has removed all friends from the list */}
							{addbuttonlabel}
						</button>
					)}
				</>
			)}
		/>
	)
}
