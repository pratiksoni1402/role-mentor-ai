'use client';
import { motion } from 'framer-motion';
import { Megaphone, Handshake, Users, Workflow } from 'lucide-react';

const roles = [
	{
		title: 'Marketing',
		icon: Megaphone,
		points: [
			'Brief-to-campaign AI workflows',
			'Ad copy variants and UTM plans',
			'Repurpose blogs into social posts',
		],
	},
	{
		title: 'Sales',
		icon: Handshake,
		points: [
			'Personalized outreach at scale',
			'Call summaries and CRM notes',
			'Proposal drafting and objection handling',
		],
	},
	{
		title: 'HR',
		icon: Users,
		points: [
			'Job descriptions and scorecards',
			'Interview question banks',
			'Policy drafts and onboarding guides',
		],
	},
	{
		title: 'Operations',
		icon: Workflow,
		points: [
			'SOP generation and checklists',
			'Meeting notes to action items',
			'Vendor comparisons and summaries',
		],
	},
];

export function RoleBasedLearning() {
	return (
		<div id="roles" className="mx-auto max-w-6xl">
			<div className="max-w-2xl">
				<h2 className="text-pretty text-2xl md:text-3xl font-semibold text-zinc-900">
					Role-based learning paths
				</h2>
				<p className="mt-2 text-zinc-600 leading-relaxed">
					Each track includes quick lessons, hands-on prompts, and templates
					mapped to your team’s daily tasks.
				</p>
			</div>

			<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
				{roles.map((role, i) => (
					<motion.article
						key={role.title}
						initial={{ opacity: 0, y: 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{
							delay: i * 0.05,
							duration: 0.5,
							ease: [0.22, 1, 0.36, 1],
						}}
						className="rounded-lg border border-zinc-900/10 p-5 bg-white"
					>
						<div className="flex items-center gap-3">
							<span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-secondary/10">
								<role.icon
									className="h-5 w-5 text-secondary"
									aria-hidden="true"
								/>
								<span className="sr-only">{role.title} icon</span>
							</span>
							<h3 className="text-zinc-900 font-medium">{role.title}</h3>
						</div>
						<ul className="mt-4 grid gap-2 text-sm text-zinc-600">
							{role.points.map((p) => (
								<li key={p} className="leading-relaxed">
									• {p}
								</li>
							))}
						</ul>
					</motion.article>
				))}
			</div>
		</div>
	);
}
