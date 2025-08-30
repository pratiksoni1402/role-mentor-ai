import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils"
import type { EvaluationResult } from "./types"
import { CheckCircle2, XCircle } from "lucide-react"

export function PerQuestionFeedbackItem({ result }: { result: EvaluationResult }) {
  const isCorrect = result.isCorrect

  return (
    <div className={cn("rounded-xl border p-4", isCorrect ? "border-emerald-200" : "border-muted")}>
      <p className="font-medium">{result.question}</p>

      <div className="mt-2 flex items-center gap-3">
        <Badge tone={isCorrect ? "success" : "error"} aria-label={isCorrect ? "Correct" : "Incorrect"}>
          <span className="inline-flex items-center gap-1">
            {isCorrect ? (
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
            ) : (
              <XCircle className="h-3.5 w-3.5" aria-hidden />
            )}
            <span className="sr-only">{isCorrect ? "Correct" : "Incorrect"}: </span>
            <span>{isCorrect ? "Correct" : "Incorrect"}</span>
          </span>
        </Badge>

        <span className="text-sm text-muted-foreground">
          Your answer: <span className="font-medium text-foreground">{result.userAnswer}</span>
        </span>
      </div>

      {!isCorrect && (
        <p className="mt-1 text-sm">
          Correct answer: <span className="font-medium text-foreground">{result.correctAnswer}</span>
        </p>
      )}
    </div>
  )
}
