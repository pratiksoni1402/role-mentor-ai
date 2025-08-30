import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getSessionId } from '@/lib/session'
import { redirect } from 'next/navigation'
export default async function DashboardHomePage() {
	const sessionId = await getSessionId()

	if (!sessionId) {
		redirect('/auth') // ✅ server redirect, no client hook
	}
	console.log('Session id', sessionId)
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			<StatCard title="Revenue" value="$24,800" />
			<StatCard title="Active Users" value="8,421" />
			<StatCard title="New Orders" value="312" />
			<StatCard title="Tickets" value="27" />

			<Card className="md:col-span-2">
				<CardHeader>
					<CardTitle className="text-balance">Recent Activity</CardTitle>
				</CardHeader>
				<CardContent className="text-sm text-muted-foreground">
					Nothing here yet. Add your own components or charts.
				</CardContent>
			</Card>
		</div>
	)
}

function StatCard({ title, value }: { title: string; value: string }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-pretty">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-2xl font-semibold">{value}</p>
			</CardContent>
		</Card>
	)
}
