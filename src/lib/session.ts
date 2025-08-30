// lib/session.ts

import { getIronSession, IronSession } from 'iron-session'
import { cookies } from 'next/headers'

// 1. Define the type for your session data
export interface SessionData {
	id?: string
}

// Store the password in an environment variable and ensure it's set
const sessionPassword = process.env.SESSION_SECRET
if (!sessionPassword) {
	throw new Error('SESSION_PASS environment variable is not set.')
}

// 2. The session options object
const sessionOptions = {
	password: sessionPassword,
	cookieName: 'ai-role-mentor',
	cookieOptions: {
		// Use secure cookies in production (requires HTTPS)
		secure: process.env.NODE_ENV === 'production',
	},
}

// 3. Export a typed getSession function
export async function getSession(): Promise<IronSession<SessionData>> {
	return await getIronSession<SessionData>(await cookies(), sessionOptions)
}

// Your getSessionId function remains largely the same but benefits from types
export async function getSessionId(): Promise<string> {
	const session = await getSession()
	if (!session.id) {
		const newSessionId = crypto.randomUUID()
		session.id = newSessionId
		await session.save()
		return newSessionId
	}

	return session.id ?? null
}
