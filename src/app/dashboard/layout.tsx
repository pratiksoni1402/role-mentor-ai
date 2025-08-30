import type React from 'react'
import type { Metadata } from 'next'
import { Sidebar } from '@/app/dashboard/components/sidebar/sidebar'
export const metadata: Metadata = {
	title: 'Dashboard',
}

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex min-h-dvh bg-background text-foreground font-sans">
			{/* Desktop Sidebar */}
			<aside className="hidden md:flex w-64 shrink-0 border-r border-border bg-sidebar text-sidebar-foreground">
				<Sidebar />
			</aside>

			{/* Main Column */}
			<div className="flex min-w-0 flex-1 flex-col">
				<main className="p-4 md:p-6">
					<div className="mx-auto max-w-6xl">{children}</div>
				</main>
			</div>
		</div>
	)
}
