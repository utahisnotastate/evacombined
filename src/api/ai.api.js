export const cleanRoughAudioTranscriptText = async (text) => {
	const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions'

	const requestBody = {
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'system',
				content:
					'The user is providing a rough audio transcript from a speech-to-text recording of a medical appointment for conversion into a clean, structured format suitable for an EMR (Electronic Medical Record) system. ' +
					'The task is to transform the provided text into a structured medical encounter transcript, which includes clear labels for the narrator/observer, doctor, patient, and any other participants, as well as a section for provider notes and follow-up recommendations. ' +
					'The output should be concise, professional, and include placeholders for dates, locations, and additional medical notes as necessary.',
			},
			{
				role: 'user',
				content: text,
			},
		],
		max_tokens: 1500,
		temperature: 0.5,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
	}

	try {
		let response = await fetch(OPENAI_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`, // Make sure to replace 'YOUR_OPENAI_API_KEY' with your actual API key
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

export const convertCleanedTranscriptIntoOfficeNote = async (text) => {
	const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions'

	const requestBody = {
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'system',
				content:
					'Pretend you are a medical school professor who teaches clinical documentation. Please Generate a medical office note from the text given by the user which incorporates explaining the doctors logic,and  everything from the audio transcript',
			},
			{
				role: 'user',
				content: text,
			},
		],
		max_tokens: 1500,
		temperature: 0.5,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
	}

	try {
		let response = await fetch(OPENAI_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`, // Make sure to replace 'YOUR_OPENAI_API_KEY' with your actual API key
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

export const generateClaimFromOfficeNote = async (text) => {
	const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions'

	const requestBody = {
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'system',
				content:
					'Pretend you are a medical billing/claism representative for the doctors office. Please generate a claim from the provided medical appointment office note.  ',
			},
			{
				role: 'user',
				content: text,
			},
		],
		max_tokens: 1500,
		temperature: 0.5,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
	}

	try {
		let response = await fetch(OPENAI_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`, // Make sure to replace 'YOUR_OPENAI_API_KEY' with your actual API key
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
