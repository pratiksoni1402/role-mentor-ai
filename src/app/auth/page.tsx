import Login from '@/app/auth/login/page'
import Signup from '@/app/auth/signup/page'

export default function AuthPage() {
	return (
		<main className="mx-auto w-full max-w-5xl px-4 py-10">
			{/*<header className="mb-8">*/}
			{/*	<h1 className="text-pretty text-2xl font-semibold tracking-tight">*/}
			{/*		Authentication*/}
			{/*	</h1>*/}
			{/*	<p className="text-muted-foreground mt-1 text-sm">*/}
			{/*		Sign in on the left, or create a new account on the right.*/}
			{/*	</p>*/}
			{/*</header>*/}

			<section className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div>
					<Login />
				</div>
				<div>
					<Signup />
				</div>
			</section>
		</main>
	)
}
