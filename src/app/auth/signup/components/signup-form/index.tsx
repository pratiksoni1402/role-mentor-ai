'use client'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'

// Define form field types
type SignupFormInputs = {
	firstName: string
	lastName: string
	email: string
	password: string
	confirmPassword: string
}

export default function SignupForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<SignupFormInputs>()

	const [showPassword, setShowPassword] = useState(false)

	const onSubmit: SubmitHandler<SignupFormInputs> = (data) => {
		axios
			.post('/auth/signup/api/signup', data)
			.then((response) => response.data)
			.catch((error) => console.log(error))
	}

	// Watch password for confirm password validation
	const passwordValue = watch('password')

	return (
		<Card className="max-w-md w-full mx-auto">
			<CardHeader className="space-y-2">
				<CardTitle className="text-balance">Create your account</CardTitle>
				<CardDescription className="text-pretty">
					Join us in a few quick steps. Fields marked with
					<span aria-hidden="true"> *</span> are required.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
					{/* Name */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="flex flex-col gap-2">
							<Label htmlFor="firstName">
								First name{' '}
								<span className="text-destructive" aria-hidden="true">
									*
								</span>
							</Label>
							<Input
								id="firstName"
								placeholder="John"
								autoComplete="given-name"
								aria-invalid={!!errors.firstName || undefined}
								aria-describedby={
									errors.firstName ? 'firstName-error' : undefined
								}
								{...register('firstName', {
									required: 'First name is required',
								})}
							/>
							{errors.firstName && (
								<p id="firstName-error" className="text-destructive text-sm">
									{errors.firstName.message}
								</p>
							)}
						</div>

						<div className="flex flex-col gap-2">
							<Label htmlFor="lastName">
								Last name{' '}
								<span className="text-destructive" aria-hidden="true">
									*
								</span>
							</Label>
							<Input
								id="lastName"
								placeholder="Doe"
								autoComplete="family-name"
								aria-invalid={!!errors.lastName || undefined}
								aria-describedby={
									errors.lastName ? 'lastName-error' : undefined
								}
								{...register('lastName', { required: 'Last name is required' })}
							/>
							{errors.lastName && (
								<p id="lastName-error" className="text-destructive text-sm">
									{errors.lastName.message}
								</p>
							)}
						</div>
					</div>

					{/* Email */}
					<div className="flex flex-col gap-2">
						<Label htmlFor="email">
							Email{' '}
							<span className="text-destructive" aria-hidden="true">
								*
							</span>
						</Label>
						<Input
							id="email"
							type="email"
							placeholder="john@example.com"
							autoComplete="email"
							inputMode="email"
							aria-invalid={!!errors.email || undefined}
							aria-describedby={errors.email ? 'email-error' : undefined}
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: /^\S+@\S+$/i,
									message: 'Enter a valid email',
								},
							})}
						/>
						{errors.email && (
							<p id="email-error" className="text-destructive text-sm">
								{errors.email.message}
							</p>
						)}
					</div>

					{/* Password */}
					<div className="flex flex-col gap-2">
						<Label htmlFor="password">
							Password{' '}
							<span className="text-destructive" aria-hidden="true">
								*
							</span>
						</Label>
						<div className="relative">
							<Input
								id="password"
								type={showPassword ? 'text' : 'password'}
								placeholder="••••••••"
								autoComplete="new-password"
								aria-invalid={!!errors.password || undefined}
								aria-describedby={
									errors.password ? 'password-error' : 'password-hint'
								}
								{...register('password', {
									required: 'Password is required',
									minLength: {
										value: 8,
										message: 'Password must be at least 8 characters',
									},
									pattern: {
										value:
											/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
										message:
											'Password must contain uppercase, lowercase, number, and special character',
									},
								})}
							/>
							<button
								type="button"
								onClick={() => setShowPassword((prev) => !prev)}
								aria-pressed={showPassword}
								className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-primary hover:underline"
							>
								{showPassword ? 'Hide' : 'Show'}
							</button>
						</div>
						{!errors.password && (
							<p id="password-hint" className="text-muted-foreground text-xs">
								Use 8+ characters with a mix of uppercase, lowercase, numbers,
								and symbols.
							</p>
						)}
						{errors.password && (
							<p id="password-error" className="text-destructive text-sm">
								{errors.password.message}
							</p>
						)}
					</div>

					{/* Confirm Password */}
					<div className="flex flex-col gap-2">
						<Label htmlFor="confirmPassword">
							Confirm password{' '}
							<span className="text-destructive" aria-hidden="true">
								*
							</span>
						</Label>
						<Input
							id="confirmPassword"
							type={showPassword ? 'text' : 'password'}
							placeholder="••••••••"
							autoComplete="new-password"
							aria-invalid={!!errors.confirmPassword || undefined}
							aria-describedby={
								errors.confirmPassword ? 'confirmPassword-error' : undefined
							}
							{...register('confirmPassword', {
								required: 'Confirm password is required',
								validate: (value) =>
									value === passwordValue || 'Passwords do not match',
							})}
						/>
						{errors.confirmPassword && (
							<p
								id="confirmPassword-error"
								className="text-destructive text-sm"
							>
								{errors.confirmPassword.message}
							</p>
						)}
					</div>

					{/* Submit */}
					<div className="pt-2">
						<Button type="submit" className="w-full">
							Signup
						</Button>
					</div>
				</form>
			</CardContent>
			<CardFooter className="justify-center">
				<p className="text-sm text-muted-foreground text-center">
					By signing up, you agree to our Terms and Privacy Policy.
				</p>
			</CardFooter>
		</Card>
	)
}
