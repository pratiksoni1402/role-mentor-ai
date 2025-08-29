import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    q: "Do learners need technical experience?",
    a: "No. Lessons are designed for non-technical roles with guided prompts and templates.",
  },
  {
    q: "How long are the lessons?",
    a: "Most lessons are 5–10 minutes with hands-on exercises that apply to real tasks.",
  },
  {
    q: "Can we customize by role and team?",
    a: "Yes, tracks can be tailored to the workflows and tools your teams already use.",
  },
  {
    q: "How do we measure outcomes?",
    a: "We provide suggested metrics and checklists so teams can track improvements weekly.",
  },
]

export function FAQ() {
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-pretty text-2xl md:text-3xl font-semibold text-zinc-900">FAQs</h2>
      <Accordion type="single" collapsible className="mt-6">
        {faqs.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
            <AccordionContent className="text-zinc-600 leading-relaxed">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
