'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Tutorial } from './types'
import QuestionPrompt from '@/app/dashboard/components/role-quiz/ui/ask-question'
export function TutorialView({
	tutorial,
	onStartOver,
}: {
	tutorial: Tutorial
	onStartOver: () => void
}) {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-xl font-semibold">Learning Tutorial</h2>
				</div>
				<div>
					<Button variant="outline" onClick={onStartOver}>
						Start Over
					</Button>
				</div>
			</div>

			{tutorial.tutorialQuestions.length > 0 ? (
				tutorial.tutorialQuestions.map((q, idx) => (
					<div key={idx} className="rounded-xl border p-4">
						<p className="font-medium">{q.question}</p>
						<ul className="mt-2 space-y-1">
							{q.options.map((opt, i) => {
								const isCorrect = opt === q.correctAnswer
								return (
									<li
										key={i}
										className={cn(
											'text-sm',
											isCorrect
												? 'text-emerald-600 font-medium'
												: 'text-muted-foreground'
										)}
									>
										{opt}
									</li>
								)
							})}
						</ul>
						{q.explanation && (
							<p className="mt-2 text-sm italic text-muted-foreground">
								{q.explanation}
							</p>
						)}
					</div>
				))
			) : (
				<div className="rounded-xl border bg-muted/30 p-4 whitespace-pre-wrap">
					{tutorial.fallback}
				</div>
			)}
			<div>
				<QuestionPrompt />
			</div>
		</div>
	)
}
