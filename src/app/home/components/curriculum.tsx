"use client"
import { motion } from "framer-motion"

const modules = [
  {
    title: "Foundations for Non-Technical Teams",
    desc: "Understand capabilities, limits, and safe usage of AI at work.",
  },
  {
    title: "Prompting Patterns and Templates",
    desc: "Reusable frameworks for briefs, summaries, checklists, and more.",
  },
  {
    title: "Role-Specific Playbooks",
    desc: "Guided exercises tied to real workflows in marketing, sales, HR, ops.",
  },
  {
    title: "Compliance & Governance",
    desc: "Data handling, approvals, and responsible AI practices.",
  },
]

export function Curriculum() {
  return (
    <div id="curriculum" className="mx-auto max-w-6xl">
      <div className="max-w-2xl">
        <h2 className="text-pretty text-2xl md:text-3xl font-semibold text-zinc-900">
          A practical, outcomes-first curriculum
        </h2>
        <p className="mt-2 text-zinc-600 leading-relaxed">
          Bite-sized lessons, hands-on assignments, and templates ready for your next task.
        </p>
      </div>

      <ol className="mt-8 grid gap-4">
        {modules.map((m, i) => (
          <motion.li
            key={m.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-md border border-zinc-900/10 p-5 bg-white"
          >
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-medium">
                {i + 1}
              </span>
              <div>
                <h3 className="text-zinc-900 font-medium">{m.title}</h3>
                <p className="mt-1 text-sm text-zinc-600 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
