"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "./ui/progress"
import { RadioOption } from "./ui/radio-option"
import { Spinner } from "./ui/spinner"
import type { Question } from "./types"

export function QuizQuestions({
  questions,
  answers,
  setAnswer,
  onSubmit,
  loading,
}: {
  questions: Question[]
  answers: Record<number, string>
  setAnswer: (index: number, value: string) => void
  onSubmit: () => void
  loading: boolean
}) {
  const answeredCount = Object.keys(answers).length
  const progressPct = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Step 2: Answer questions</h2>
        <span className="text-sm text-muted-foreground">
          {answeredCount}/{questions.length} answered
        </span>
      </div>

      <Progress value={progressPct} />

      <div className="space-y-5">
        {questions.map((q, idx) => (
          <fieldset key={idx} className="rounded-xl border p-4 md:p-5">
            <legend className="font-medium px-1">{q.question}</legend>

            <div className="mt-3 grid gap-2">
              {q.options.map((opt) => (
                <RadioOption
                  key={opt}
                  name={`q-${idx}`}
                  value={opt}
                  checked={answers[idx] === opt}
                  onChange={() => setAnswer(idx, opt)}
                  label={opt}
                />
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Step 2 of 3 • Quiz</div>
        <Button onClick={onSubmit} disabled={answeredCount < questions.length || loading}>
          {loading ? <Spinner className="mr-2" /> : null}
          Submit Answers
        </Button>
      </div>
    </div>
  )
}
