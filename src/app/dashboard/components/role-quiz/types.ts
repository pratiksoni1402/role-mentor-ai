export const ROLES = ["HR", "Marketing", "Customer Support", "Operations", "Others"] as const
export type Role = (typeof ROLES)[number] | "Others"

export type Question = {
  question: string
  options: string[]
  answer?: string
}

export type EvaluationResult = {
  question: string
  correctAnswer: string
  userAnswer: string
  isCorrect: boolean
}

export type TutorialQuestion = {
  question: string
  options: string[]
  correctAnswer: string
  explanation?: string
}

export type Tutorial = {
  tutorialQuestions: TutorialQuestion[]
  fallback?: string
}
