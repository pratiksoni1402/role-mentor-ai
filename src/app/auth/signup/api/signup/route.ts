import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// Assuming getSession and getSessionId are custom utility functions.
// Make sure they are correctly implemented to handle session creation.
// import { getSession, getSessionId } from '@/lib/session'

export async function POST(req: Request) {
	try {
		const { firstName, lastName, email, password } = await req.json()

		// --- Input Validation ---
		if (!firstName || !lastName || !email || !password) {
			return NextResponse.json(
				{ ok: false, message: 'All fields are required.' },
				{ status: 400 }
			)
		}

		// --- Check for Existing User ---
		// The error you are seeing is triggered by this block.
		// Your code is correctly identifying that a user with the email "pratiksoni1402@gmail.com"
		// already exists in the database. It then returns the 400 status code as you've programmed it to.
		const existingUser = await prisma.user.findUnique({
			where: { email },
		})

		if (existingUser) {
			return NextResponse.json(
				{ ok: false, message: `User with email ${email} already exists.` },
				{ status: 400 } // This is the source of the 400 error.
			)
		}

		// --- Password Hashing ---
		const hashedPassword = await bcrypt.hash(password, 10)

		// --- Create User in Database ---
		const newUser = await prisma.user.create({
			data: {
				firstName,
				lastName,
				email,
				password: hashedPassword,
			},
			// Select only the fields you need to return for security and efficiency.
			select: {
				id: true,
				email: true,
			},
		})

		// --- Success Response ---
		return NextResponse.json({ ok: true, user: newUser }, { status: 201 })
	} catch (err: unknown) {
		// --- General Error Handling ---
		console.error('Signup API Error:', err)
		return NextResponse.json(
			{ ok: false, message: 'An internal server error occurred.' },
			{ status: 500 }
		)
	}
}
