'use client'
import React from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'

// Define form field types
type LoginFormInputs = {
	email: string
	password: string
}

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>()

	const [showPassword, setShowPassword] = React.useState(false)

	const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
		console.log('[v0] Form Submitted ✅', data)
	}

	return (
		<Card className="mx-auto w-full max-w-md">
			<CardHeader>
				<CardTitle className="text-balance">Sign in</CardTitle>
				<CardDescription className="text-pretty">
					Welcome back. Please enter your credentials to continue.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
					{/* Email */}
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<div className="relative">
							<Mail
								aria-hidden="true"
								className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
							/>
							<Input
								id="email"
								type="email"
								placeholder="you@example.com"
								className="pl-9"
								aria-invalid={!!errors.email || undefined}
								aria-describedby={errors.email ? 'email-error' : undefined}
								{...register('email', {
									required: 'Email is required',
									pattern: {
										value: /^\S+@\S+$/i,
										message: 'Enter a valid email address',
									},
								})}
							/>
						</div>
						{errors.email && (
							<p id="email-error" className="text-sm text-destructive">
								{errors.email.message}
							</p>
						)}
					</div>

					{/* Password */}
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<div className="relative">
							<Lock
								aria-hidden="true"
								className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
							/>
							<Input
								id="password"
								type={showPassword ? 'text' : 'password'}
								placeholder="Your password"
								className="pl-9 pr-10"
								aria-invalid={!!errors.password || undefined}
								aria-describedby={
									errors.password ? 'password-error' : undefined
								}
								{...register('password', {
									required: 'Password is required',
									minLength: {
										value: 6,
										message: 'Password must be at least 6 characters',
									},
								})}
							/>
							<button
								type="button"
								onClick={() => setShowPassword((v) => !v)}
								className="absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
								aria-pressed={showPassword}
							>
								{showPassword ? (
									<EyeOff className="h-4 w-4" aria-hidden="true" />
								) : (
									<Eye className="h-4 w-4" aria-hidden="true" />
								)}
								<span className="sr-only">
									{showPassword ? 'Hide password' : 'Show password'}
								</span>
							</button>
						</div>
						{errors.password && (
							<p id="password-error" className="text-sm text-destructive">
								{errors.password.message}
							</p>
						)}
					</div>

					{/* Submit */}
					<Button type="submit" className="w-full">
						Sign in
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}
