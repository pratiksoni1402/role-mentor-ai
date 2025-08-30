// app/api/evaluate-quiz/route.ts
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_KEY,
})

export async function POST(req: Request) {
	try {
		const { role, questions, answers } = await req.json()

		if (!role || !questions || !answers) {
			return NextResponse.json(
				{ ok: false, message: 'Role, questions, and answers are required' },
				{ status: 400 }
			)
		}

		// Prepare quiz evaluation prompt
		const prompt = `
      You are an AI evaluator. A user has answered a 10-question quiz for the role "${role}".
      Questions with correct answers:
      ${JSON.stringify(questions)}
      
      User's answers:
      ${JSON.stringify(answers)}

      Return a JSON object with:
      1. results: array of { question, correctAnswer, userAnswer, isCorrect: true/false }
      2. score: number of correct answers
      3. summary: short text about strengths and weaknesses
      4. experienceLevel: Beginner / Intermediate / Advanced based on score

      Only return valid JSON.
    `

		const response = await openai.chat.completions.create({
			model: 'gpt-4',
			messages: [{ role: 'user', content: prompt }],
			temperature: 0.7,
		})

		const text = response.choices[0].message?.content || '{}'

		// Parse AI response
		let evaluation
		try {
			evaluation = JSON.parse(text)
		} catch (err) {
			console.error('Failed to parse AI evaluation JSON:', err)
			return NextResponse.json(
				{ ok: false, message: 'Failed to evaluate quiz' },
				{ status: 500 }
			)
		}

		return NextResponse.json({ ok: true, evaluation })
	} catch (err) {
		console.error('Evaluate Quiz API Error:', err)
		return NextResponse.json(
			{ ok: false, message: 'Something went wrong.' },
			{ status: 500 }
		)
	}
}
