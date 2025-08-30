import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
export async function GET() {
	const allUsers = await prisma.user.findMany()
	console.log(allUsers)
	return NextResponse.json({ allUsers })
}
