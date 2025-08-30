import type { Metadata } from 'next'
import './globals.css'

import { CormorantG, Satoshi } from './fonts'

export const metadata: Metadata = {
	title: 'Role Mentor',
	description: 'Learn the skill you need using AI',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${CormorantG.variable} ${Satoshi.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	)
}
