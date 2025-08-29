'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function Hero() {
	return (
		<header className="px-6 pt-16 pb-8 md:pt-24 md:pb-12 bg-white">
			<div className="mx-auto max-w-6xl">
				<motion.div
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
					className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 px-3 py-1 text-xs text-zinc-600"
					aria-label="Product category badge"
				>
					Role-Specific AI Learning
				</motion.div>

				<motion.h1
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
					className="font-heading mt-6 text-pretty text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-900"
				>
					Learn AI skills that fit your role.
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
					className="mt-4 max-w-2xl font-body text-zinc-600 leading-relaxed"
				>
					Give marketers, sales, HR, and operations teams practical AI playbooks
					they can use today. Clear lessons, hands-on exercises, and templates
					tailored to each role.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
					className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3"
				>
					<Link
						href="/"
						className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-3 text-white text-sm font-medium transition-colors hover:bg-blue-600/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
					>
						Get started
					</Link>
					<Link
						href="/"
						className="inline-flex items-center justify-center rounded-md border border-zinc-900/10 px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
						aria-label="See curriculum"
					>
						See curriculum
					</Link>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
					className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6"
				>
					<Logo src="/partner-logo-1.png" alt="Partner logo 1" />
					<Logo src="/partner-logo-2.png" alt="Partner logo 2" />
					<Logo
						src="/partner-logo-abstract-geometric.png"
						alt="Partner logo 3"
					/>
					<Logo
						src="/partner-logo-abstract-geometric.png"
						alt="Partner logo 4"
					/>
				</motion.div>
			</div>
		</header>
	)
}

function Logo({ src, alt }: { src: string; alt: string }) {
	return (
		<img
			src={src || '/placeholder.svg'}
			alt={alt}
			className="h-6 w-auto opacity-80"
			loading="lazy"
			height={24}
			width={120}
		/>
	)
}
