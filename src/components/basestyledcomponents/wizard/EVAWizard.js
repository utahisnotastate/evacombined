import React from 'react'
import { Wizard } from 'react-wizardry'

import EVAStepper from '../../Appointment/EVAStepper'
import 'react-wizardry/dist/react-wizardry.css'

export default function EVAWizard() {
	const handleSubmit = (values) => {
		console.log(values)
	}
	return (
		<Wizard
			onSubmit={handleSubmit}
			header={<EVAStepper />}
			onNext={next}
			onPrev={prev}
			step={step}
			steps={wizardSteps}
		/>
	)
}
