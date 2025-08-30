'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
	LayoutDashboard,
	BarChart3,
	FolderKanban,
	Users,
	Settings,
} from 'lucide-react'

const navItems = [
	{ href: '/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
	{ href: '/dashboard/analytics', label: 'Analytics', Icon: BarChart3 },
	{ href: '/dashboard/projects', label: 'Projects', Icon: FolderKanban },
	{ href: '/dashboard/team', label: 'Team', Icon: Users },
	{ href: '/dashboard/settings', label: 'Settings', Icon: Settings },
] as const

export function Sidebar() {
	const pathname = usePathname()

	return (
		<nav aria-label="Main" className="flex h-dvh flex-col">
			<div className="flex items-center gap-2 border-b border-sidebar-border px-4 py-3">
				<div className="size-6 rounded bg-primary" aria-hidden="true" />
				<span className="text-sm font-medium">Acme Admin</span>
			</div>

			<ul className="flex-1 space-y-1 p-2">
				{navItems.map(({ href, label, Icon }) => {
					const active = pathname === href
					return (
						<li key={href}>
							<Link
								href={href}
								aria-current={active ? 'page' : undefined}
								className={cn(
									'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
									'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
									active
										? 'bg-primary/10 text-primary'
										: 'text-sidebar-foreground'
								)}
							>
								<Icon
									className={cn(
										'size-4',
										active ? 'text-primary' : 'text-muted-foreground'
									)}
									aria-hidden="true"
								/>
								<span>{label}</span>
							</Link>
						</li>
					)
				})}
			</ul>

			<div className="border-t border-sidebar-border p-3 text-xs text-muted-foreground">
				v1.0.0
			</div>
		</nav>
	)
}
