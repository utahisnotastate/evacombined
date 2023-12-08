const cleanRoughAudioTranscriptText = async (text) => {
	const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions'

	const requestBody = {
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'system',
				content:
					'The user is providing a rough audio transcript from speech to text recording of a medical office appointment.' +
					' Take the text provided by the user and clean up the text to do things such as: have a chat message label when the doctor is talking versus a patient, ' +
					'enhance it via proofreading and editing to make it easier to read, and any other improvements just to improve redability of the editied transcript.',
			},
			{
				role: 'user',
				content: text,
			},
		],
		max_tokens: 1000,
		temperature: 0.6,
		top_p: 0.9,
		frequency_penalty: -0.5,
		presence_penalty: 0.5,
	}

	try {
		let response = await fetch(OPENAI_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Make sure to replace 'YOUR_OPENAI_API_KEY' with your actual API key
			},
			body: JSON.stringify(requestBody),
		})

		let data = await response.json()
		if (data.choices && data.choices.length > 0) {
			console.log(data)
			//setGpt3Response(data.choices[0].message.content)
			return data.choices[0].message.content
		} else {
			console.error('No response from GPT-3', data)
		}
	} catch (error) {
		console.error('Error calling GPT-3', error)
	}
}

const convertCleanedTranscriptIntoOfficeNote = async (text) => {
	const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions'

	const requestBody = {
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'system',
				content:
					"Generate a medical office note from the audio transcript provided by the user which includes diagnoses, patient complaints, assessments, plans, physical exam notes, summary, etc. The notes should implement the advice given in this article: 'https://mobius.md/2022/11/14/step-by-step-guide-to-taking-perfect-clinical-notes/'.",
			},
			{
				role: 'user',
				content: text,
			},
		],
		max_tokens: 1000,
		temperature: 0.6,
		top_p: 0.9,
		frequency_penalty: -0.5,
		presence_penalty: 0.5,
	}

	try {
		let response = await fetch(OPENAI_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Make sure to replace 'YOUR_OPENAI_API_KEY' with your actual API key
			},
			body: JSON.stringify(requestBody),
		})

		let data = await response.json()
		if (data.choices && data.choices.length > 0) {
			console.log(data)
			//setGpt3Response(data.choices[0].message.content)
			return data.choices[0].message.content
		} else {
			console.error('No response from GPT-3', data)
		}
	} catch (error) {
		console.error('Error calling GPT-3', error)
	}
}
