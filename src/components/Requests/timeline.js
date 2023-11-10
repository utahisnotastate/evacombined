import React from 'react'
import { Timeline, TimelineEvent } from 'react-event-timeline'

export default function TimeLine({ updates }) {
	return (
		<Timeline>
			{updates && updates.length > 0
				? updates.map((update, index) => (
						<TimelineEvent
							createdAt="2016-09-11 09:06 AM"
							icon={<i className="material-icons md-18">email</i>}
							key={index}
							title={update.title}>
							{update.description}
						</TimelineEvent>
				  ))
				: null}
		</Timeline>
	)
}
