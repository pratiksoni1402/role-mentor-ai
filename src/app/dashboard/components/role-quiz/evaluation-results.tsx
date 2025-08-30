"use client"

import { Button } from "@/components/ui/button"
import { ResultStat } from "./ui/result-stat"
import { Spinner } from "./ui/spinner"
import { PerQuestionFeedbackItem } from "./per-question-feedback-item"
import type { EvaluationResult, Question } from "./types"

export function EvaluationResults({
  evaluation,
  questions,
  finalRole,
  loading,
  onGenerateTutorial,
}: {
  evaluation: { results: EvaluationResult[]; score: number; experienceLevel: string; summary: string }
  questions: Question[]
  finalRole: string | null
  loading: boolean
  onGenerateTutorial: () => void
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border p-4 md:p-5">
        <h2 className="text-lg font-semibold">Your Results</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <ResultStat label="Score" value={`${evaluation.score} / ${questions.length}`} />
          <ResultStat label="Experience" value={evaluation.experienceLevel} />
          <ResultStat label="Role" value={finalRole || "-"} />
        </div>
        <p className="mt-3 text-pretty text-muted-foreground">{evaluation.summary}</p>
      </div>

      <div className="space-y-3">
        <h3 className="text-base font-medium">Per-question feedback</h3>
        {evaluation.results.map((res, idx) => (
          <PerQuestionFeedbackItem key={idx} result={res} />
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={onGenerateTutorial} disabled={loading}>
          {loading ? <Spinner className="mr-2" /> : null}
          Generate Tutorial
        </Button>
      </div>
    </div>
  )
}
