'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.08 },
	},
}

// const item = {
// 	hidden: { opacity: 0, y: 10 },
// 	show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
// };

export function WhatYouGet() {
	return (
		<div className="mx-auto max-w-6xl">
			<motion.h2
				className="text-pretty text-2xl font-semibold tracking-tight md:text-3xl"
				initial={{ opacity: 0, y: 12 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.5 }}
				transition={{ duration: 0.5, ease: 'easeOut' }}
			>
				What you’ll get
			</motion.h2>

			<motion.div
				className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2"
				variants={container}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.3 }}
			>
				{/* Role-Specific Learning Paths */}
				<motion.div className="rounded-lg border border-border p-5 bg-card">
					<div className="mb-3 flex items-center gap-2">
						<span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary/10">
							<Check className="h-4 w-4 text-secondary" aria-hidden="true" />
						</span>
						<h3 className="font-medium">Role‑Specific Learning Paths</h3>
					</div>
					<p className="text-sm leading-relaxed text-muted-foreground">
						Tailored lessons for Marketing, Ops, HR, and Customer Support
						(expandable later). Short, modular lessons (5–10 mins) focused on
						real workflows like writing ad copy, automating employee FAQs, and
						generating reports.
					</p>
				</motion.div>

				{/* Hands-On Practice */}
				<motion.div className="rounded-lg border border-border p-5 bg-card">
					<div className="mb-3 flex items-center gap-2">
						<span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary/10">
							<Check className="h-4 w-4 text-secondary" aria-hidden="true" />
						</span>
						<h3 className="font-medium">Hands‑On Practice</h3>
					</div>
					<p className="text-sm leading-relaxed text-muted-foreground">
						Real‑world projects where users actually perform tasks using AI
						tools. Examples: Marketing drafts campaign copy with AI, HR designs
						job descriptions, and Ops builds workflow automations.
					</p>
				</motion.div>

				{/* AI Coaching Agent */}
				<motion.div className="rounded-lg border border-border p-5 bg-card">
					<div className="mb-3 flex items-center gap-2">
						<span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary/10">
							<Check className="h-4 w-4 text-secondary" aria-hidden="true" />
						</span>
						<h3 className="font-medium">AI Coaching Agent</h3>
					</div>
					<p className="text-sm leading-relaxed text-muted-foreground">
						A built‑in AI guide that interacts as you learn—providing instant
						feedback, suggesting improvements and automations, and even
						rewriting attempts to demonstrate best practices.
					</p>
				</motion.div>

				{/* Progress & Engagement Features */}
				<motion.div className="rounded-lg border border-border p-5 bg-card">
					<div className="mb-3 flex items-center gap-2">
						<span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary/10">
							<Check className="h-4 w-4 text-secondary" aria-hidden="true" />
						</span>
						<h3 className="font-medium">Progress & Engagement</h3>
					</div>
					<p className="text-sm leading-relaxed text-muted-foreground">
						Gamified learning with badges, streaks, and completion %.
						Personalized dashboards show skill mastery and applied projects,
						with simple feedback loops like “Was this prompt effective? Y/N”.
					</p>
				</motion.div>
			</motion.div>
		</div>
	)
}
