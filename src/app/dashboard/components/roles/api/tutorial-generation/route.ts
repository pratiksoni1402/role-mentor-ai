import { NextResponse, NextRequest } from 'next/server'
import OpenAI from 'openai'

const client = new OpenAI({
	apiKey: process.env.OPENAI_KEY,
})

// Define types
interface EvaluationResult {
	question: string
	userAnswer: string
	correctAnswer: string
}

interface Evaluation {
	score: number
	results: EvaluationResult[]
	experienceLevel: string
	summary: string
}

interface TutorialQuestion {
	question: string
	options: string[]
	correctAnswer: string
	explanation: string
}

interface TutorialResponse {
	tutorialQuestions: TutorialQuestion[]
	fallback?: string
}

export async function POST(request: NextRequest) {
	try {
		const { role, evaluation }: { role: string; evaluation: Evaluation } =
			await request.json()

		if (!role || !evaluation) {
			return NextResponse.json(
				{ error: 'Role and evaluation are required' },
				{ status: 400 }
			)
		}

		const userPrompt = `
      A user with role "${role}" completed a quiz with the following evaluation:

      Score: ${evaluation.score} / ${evaluation.results.length}
      Experience Level: ${evaluation.experienceLevel}
      Summary: ${evaluation.summary}
      Detailed Results:
      ${evaluation.results
				.map(
					(r, idx) =>
						`Q${idx + 1}: ${r.question}\nYour Answer: ${r.userAnswer}\nCorrect Answer: ${r.correctAnswer}`
				)
				.join('\n')}

      Based on this performance, create a learning tutorial in a quiz format.
      - Each question should have 4 options.
      - Include a 'correctAnswer' and a short 'explanation'.
      - Provide 5-10 questions focusing on the user's weak areas.
    `

		const completion = await client.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{
					role: 'system',
					content:
						'You are an expert career coach AI. Your task is to generate a learning tutorial in a quiz format. Your response MUST be a valid JSON object with a single root key "tutorialQuestions", which is an array of question objects.',
				},
				{ role: 'user', content: userPrompt },
			],
			response_format: { type: 'json_object' },
			max_completion_tokens: 2000,
		})

		const tutorialRaw = completion.choices[0].message?.content || ''

		let tutorial: TutorialResponse
		try {
			tutorial = JSON.parse(tutorialRaw) as TutorialResponse
		} catch (err) {
			console.warn('Failed to parse AI JSON despite JSON mode:', err)
			tutorial = { tutorialQuestions: [], fallback: tutorialRaw }
		}

		return NextResponse.json({ tutorial })
	} catch (error: unknown) {
		console.error('OpenAI API Error:', error)
		return NextResponse.json(
			{ error: 'Failed to generate tutorial' },
			{ status: 500 }
		)
	}
}
