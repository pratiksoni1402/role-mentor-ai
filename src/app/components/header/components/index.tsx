import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Header() {
	return (
		<header className="w-full border-b bg-background">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
				{/* Brand: AI Role Mentor */}
				<Link
					href="/"
					className="inline-flex items-center gap-2"
					aria-label="AI Role Mentor home"
				>
					<span className="text-xl font-semibold tracking-tight text-foreground">
						AI Role Mentor
					</span>
				</Link>

				{/* Right-side actions */}
				<nav aria-label="Primary" className="flex items-center gap-2">
					<Button asChild size="sm">
						<Link href="/auth" aria-label="Go to authentication">
							Sign in / Sign up
						</Link>
					</Button>
				</nav>
			</div>
		</header>
	)
}
