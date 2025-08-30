// app/api/quiz/route.ts
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_KEY,
})

type QuizQuestion = {
	question: string
	options: string[]
}

export async function POST(req: Request) {
	try {
		const { role } = await req.json()

		if (!role) {
			return NextResponse.json(
				{ ok: false, message: 'Role is required' },
				{ status: 400 }
			)
		}

		// Prompt to generate 10 multiple-choice questions for the role
		const prompt = `
      Generate 10 multiple-choice questions to test knowledge for a "${role}".
      For each question, provide 4 options (A, B, C, D) and indicate the correct answer.
      Return ONLY JSON in the format:
      [
        { "question": "Question text", "options": ["A", "B", "C", "D"], "answer": "A" },
        ...
      ]
    `

		const response = await openai.chat.completions.create({
			model: 'gpt-4',
			messages: [{ role: 'user', content: prompt }],
			temperature: 0.7,
		})

		// Extract AI response
		const text = response.choices[0].message?.content || '[]'

		// Parse JSON safely
		let questions: QuizQuestion[] = []
		try {
			questions = JSON.parse(text)
		} catch (err) {
			console.error('Failed to parse AI quiz JSON:', err)
			return NextResponse.json(
				{ ok: false, message: 'Failed to generate quiz' },
				{ status: 500 }
			)
		}

		return NextResponse.json({ ok: true, role, questions })
	} catch (err) {
		console.error('Quiz API Error:', err)
		return NextResponse.json(
			{ ok: false, message: 'Something went wrong.' },
			{ status: 500 }
		)
	}
}
