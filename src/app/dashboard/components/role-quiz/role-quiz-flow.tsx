'use client'

import * as React from 'react'
import axios from 'axios'
import { StepIndicator } from './step-indicator'
import { RoleSelection } from './role-selection'
import { QuizQuestions } from './quiz-questions'
import { EvaluationResults } from './evaluation-results'
import { TutorialView } from './tutorial-view'
import type { Role, Question, EvaluationResult, Tutorial } from './types'

export default function RoleQuizFlow() {
	const [step, setStep] = React.useState(1)
	const [role, setRole] = React.useState<Role | null>(null)
	const [customRole, setCustomRole] = React.useState('')
	const [questions, setQuestions] = React.useState<Question[]>([])
	const [answers, setAnswers] = React.useState<Record<number, string>>({})
	const [tutorial, setTutorial] = React.useState<Tutorial | null>(null)
	const [evaluation, setEvaluation] = React.useState<{
		results: EvaluationResult[]
		score: number
		experienceLevel: string
		summary: string
	} | null>(null)
	const [loading, setLoading] = React.useState(false)

	const finalRole = role === 'Others' ? customRole : role

	const handleGenerateQuiz = async () => {
		setLoading(true)
		try {
			const res = await axios.post(
				'/dashboard/components/roles/api/quiz-generation',
				{ role: finalRole }
			)
			setQuestions(res.data.questions)
			setStep(3)
		} catch (err) {
			console.error('Error generating quiz:', err)
		} finally {
			setLoading(false)
		}
	}

	const handleEvaluate = async () => {
		setLoading(true)
		try {
			const res = await axios.post(
				'/dashboard/components/roles/api/quiz-evaluation',
				{
					role: finalRole,
					questions,
					answers,
				}
			)
			setEvaluation(res.data.evaluation)
			setStep(4)
		} catch (err) {
			console.error('Error evaluating quiz:', err)
		} finally {
			setLoading(false)
		}
	}

	const handleGenerateTutorial = async () => {
		if (!evaluation) return
		setLoading(true)
		try {
			const res = await axios.post(
				'/dashboard/components/roles/api/tutorial-generation',
				{
					role: finalRole,
					evaluation,
				}
			)

			let parsed: Tutorial
			try {
				parsed =
					typeof res.data.tutorial === 'string'
						? JSON.parse(res.data.tutorial)
						: res.data.tutorial
			} catch (err) {
				console.warn('Failed to parse tutorial JSON:', err)
				parsed = { tutorialQuestions: [], fallback: res.data.tutorial }
			}

			setTutorial(parsed)
		} catch (err) {
			console.error('Error generating tutorial:', err)
		} finally {
			setLoading(false)
		}
	}

	const resetAll = () => {
		setStep(1)
		setRole(null)
		setCustomRole('')
		setQuestions([])
		setAnswers({})
		setEvaluation(null)
		setTutorial(null)
	}

	return (
		<section className="mx-auto max-w-4xl sm:p-6 p-3 md:p-8 rounded-2xl border bg-card shadow-sm">
			{!tutorial && (
				<header className="mb-6 md:mb-8">
					<h1 className="text-balance text-2xl md:text-3xl font-semibold tracking-tight">
						Role-based Skills Quiz
					</h1>
					<p className="text-muted-foreground mt-1 text-pretty">
						Select your role, answer quick questions, then review tailored
						guidance.
					</p>
					<StepIndicator current={step} />
				</header>
			)}

			{step === 1 && (
				<RoleSelection
					role={role}
					setRole={setRole}
					customRole={customRole}
					setCustomRole={setCustomRole}
					loading={loading}
					onNext={handleGenerateQuiz}
				/>
			)}

			{step === 3 && (
				<QuizQuestions
					questions={questions}
					answers={answers}
					setAnswer={(index, value) =>
						setAnswers({ ...answers, [index]: value })
					}
					onSubmit={handleEvaluate}
					loading={loading}
				/>
			)}

			{step === 4 && evaluation && !tutorial && (
				<EvaluationResults
					evaluation={evaluation}
					questions={questions}
					finalRole={finalRole ?? null}
					loading={loading}
					onGenerateTutorial={handleGenerateTutorial}
				/>
			)}

			{tutorial && <TutorialView tutorial={tutorial} onStartOver={resetAll} />}
		</section>
	)
}
