// app/api/ask-question/route.ts
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_KEY, // make sure this is set
})

export async function POST(req: NextRequest) {
	try {
		const { question } = await req.json()

		if (!question || question.trim() === '') {
			return NextResponse.json(
				{ error: 'Question is required' },
				{ status: 400 }
			)
		}

		// Send the user's question to GPT
		const response = await openai.chat.completions.create({
			model: 'gpt-4', // or 'gpt-3.5-turbo'
			messages: [{ role: 'user', content: question }],
			temperature: 0.7,
			store: true,
		})

		const answer =
			response.choices[0].message?.content || 'No answer generated.'

		return NextResponse.json({ answer })
	} catch (err) {
		console.error('Error asking GPT:', err)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
