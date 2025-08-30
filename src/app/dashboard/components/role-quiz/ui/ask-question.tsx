'use client'

import type React from 'react'
import { useState } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Loader2, MessageSquare, Send, XCircle } from 'lucide-react'

export default function QuestionPrompt() {
	const [showInput, setShowInput] = useState(false)
	const [question, setQuestion] = useState('')
	const [submittedQuestion, setSubmittedQuestion] = useState('')
	const [answer, setAnswer] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!question.trim()) return

		setSubmittedQuestion(question)
		setAnswer('')
		setError('')
		setLoading(true)

		try {
			const res = await fetch('/dashboard/components/roles/api/ask-question', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ question }),
			})
			const data = await res.json()
			if (data.error) {
				setError(data.error)
			} else {
				setAnswer(data.answer)
			}
		} catch (err) {
			console.error(err)
			setError('Something went wrong. Please try again.')
		} finally {
			setLoading(false)
			setQuestion('')
		}
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="text-pretty flex items-center gap-2">
					<MessageSquare className="h-5 w-5 text-primary" aria-hidden="true" />
					Have a follow-up question?
				</CardTitle>
				<CardDescription>
					Ask anything related to your roles and I’ll answer right away.
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-4">
				{!showInput ? (
					<div className="flex items-center justify-between gap-4">
						<p className="text-sm text-muted-foreground">
							Click below to ask a quick question.
						</p>
						<Button onClick={() => setShowInput(true)} size="sm">
							Ask a question
						</Button>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-3">
						<label htmlFor="question" className="sr-only">
							Your question
						</label>
						<div className="flex items-start gap-2">
							<Input
								id="question"
								value={question}
								onChange={(e) => setQuestion(e.target.value)}
								placeholder="Type your question..."
								className="flex-1"
								aria-disabled={loading}
								aria-label="Ask your question"
							/>
							<Button type="submit" disabled={loading || !question.trim()}>
								{loading ? (
									<>
										<Loader2
											className="mr-2 h-4 w-4 animate-spin"
											aria-hidden="true"
										/>
										Thinking...
									</>
								) : (
									<>
										<Send className="mr-2 h-4 w-4" aria-hidden="true" />
										Submit
									</>
								)}
							</Button>
						</div>
					</form>
				)}

				{submittedQuestion && (
					<div className="mt-2 text-sm">
						<span className="font-medium text-foreground">You asked:</span>{' '}
						<span className="text-muted-foreground">{submittedQuestion}</span>
					</div>
				)}

				<div className="mt-1" aria-live="polite" aria-atomic="true">
					{loading && !answer && (
						<div className="space-y-2">
							<div className="h-4 w-36 bg-muted rounded animate-pulse" />
							<div className="h-16 w-full bg-muted rounded animate-pulse" />
						</div>
					)}

					{answer && (
						<Card className="mt-2 rounded-none outline-none border-0 shadow-none bg-white">
							<CardContent className="pt-4 px-0">
								<p className="font-medium mb-2">Answers:</p>
								<ul className="list-disc pl-5 space-y-1 text-foreground">
									{/* Split by numbered points or double newlines */}
									{answer
										.split(/\n\d*\.?\s*|\n\n/) // splits "1. point" or double newlines
										.map((line) => line.trim())
										.filter((line) => line.length > 0)
										.map((line, idx) => (
											<li key={idx} className="py-1">
												{line}
											</li>
										))}
								</ul>
							</CardContent>
						</Card>
					)}

					{error && (
						<Alert variant="destructive" className="mt-2">
							<XCircle className="h-4 w-4" aria-hidden="true" />
							<AlertTitle>Something went wrong</AlertTitle>
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}
				</div>
			</CardContent>

			{showInput && (
				<CardFooter className="flex justify-end">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setShowInput(false)}
						disabled={loading}
					>
						Close
					</Button>
				</CardFooter>
			)}
		</Card>
	)
}
