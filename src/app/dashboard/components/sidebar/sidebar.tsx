'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import {
	LayoutDashboard,
	BarChart3,
	FolderKanban,
	Users,
	Settings,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react'

const navItems = [
	{ href: '/dashboard', label: 'Roles', Icon: LayoutDashboard },
	{ href: '/dashboard/analytics', label: 'My Profile', Icon: BarChart3 },
	{ href: '/dashboard/projects', label: 'My Learning', Icon: FolderKanban },
	{ href: '/dashboard/team', label: 'Team', Icon: Users },
	{ href: '/dashboard/settings', label: 'Settings', Icon: Settings },
] as const

export function Sidebar() {
	const pathname = usePathname()
	const [collapsed, setCollapsed] = useState(false)

	// persist collapsed state
	useEffect(() => {
		const saved =
			typeof window !== 'undefined'
				? localStorage.getItem('sidebar:collapsed')
				: null
		if (saved) setCollapsed(saved === 'true')
	}, [])

	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('sidebar:collapsed', String(collapsed))
		}
	}, [collapsed])

	return (
		<nav
			aria-label="Main"
			data-collapsed={collapsed ? 'true' : 'false'}
			className={cn(
				'flex h-dvh flex-col border-r border-sidebar-border bg-sidebar',
				'transition-[width] duration-300 ease-in-out motion-reduce:transition-none',
				collapsed ? 'w-16' : 'w-64'
			)}
		>
			{/* Header */}
			<div className="flex items-center justify-between gap-2 border-b border-sidebar-border px-3 py-3">
				<div className="flex items-center gap-2">
					<div className="size-7 rounded bg-primary" aria-hidden="true" />
					{!collapsed && (
						<span className="text-sm font-medium text-sidebar-foreground text-pretty">
							Acme Admin
						</span>
					)}
				</div>

				<button
					type="button"
					onClick={() => setCollapsed((v) => !v)}
					aria-pressed={collapsed}
					aria-label="Toggle sidebar"
					title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
					className={cn(
						'inline-flex size-7 items-center justify-center rounded-md text-muted-foreground',
						'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
						'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
					)}
				>
					{collapsed ? (
						<ChevronRight className="size-4" />
					) : (
						<ChevronLeft className="size-4" />
					)}
				</button>
			</div>

			{/* Nav list */}
			<ul className="flex-1 space-y-1 overflow-y-auto p-2">
				{navItems.map(({ href, label, Icon }) => {
					const active =
						pathname === href ||
						(typeof pathname === 'string' && pathname.startsWith(href + '/'))
					return (
						<li key={href}>
							<Link
								href={href}
								aria-current={active ? 'page' : undefined}
								aria-label={collapsed ? label : undefined}
								className={cn(
									'group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors outline-none',
									'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
									'focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-0',
									active
										? 'bg-primary/10 text-primary'
										: 'text-sidebar-foreground'
								)}
							>
								{/* Active indicator */}
								{active && (
									<span
										aria-hidden="true"
										className="absolute left-0 top-1 bottom-1 w-1 rounded-full bg-primary"
									/>
								)}

								<Icon
									aria-hidden="true"
									className={cn(
										'size-4 shrink-0',
										active ? 'text-primary' : 'text-muted-foreground'
									)}
								/>
								{!collapsed && <span className="truncate">{label}</span>}

								{/* Optional hover label when collapsed */}
								{collapsed && (
									<span
										className={cn(
											'pointer-events-none absolute left-full ml-2 rounded bg-popover px-2 py-1 text-xs text-popover-foreground shadow',
											'opacity-0 transition-opacity duration-150 group-hover:opacity-100'
										)}
										role="tooltip"
									>
										{label}
									</span>
								)}
							</Link>
						</li>
					)
				})}
			</ul>

			{/* Footer */}
			<div
				className={cn(
					'border-t border-sidebar-border p-3 text-xs text-muted-foreground',
					collapsed && 'text-center'
				)}
			></div>
		</nav>
	)
}

export default Sidebar
