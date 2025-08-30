import Link from 'next/link'
import { Button } from '@/components/ui/button'
// import { getSessionId } from '@/lib/session'
export default async function Header() {
	// const sessionId = await getSessionId()
	return (
		<header className="w-full border-b sticky top-0 bg-white z-10">
			<div className=" flex w-full items-center justify-between px-4 py-3 md:py-4">
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
						<Link href="/dashboard" aria-label="Go to authentication">
							Go to Dashboard
						</Link>
					</Button>
				</nav>
			</div>
		</header>
	)
}
