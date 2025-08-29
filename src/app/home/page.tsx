import { Hero } from '@/app/home/components/hero'
import { WhatYouGet } from '@/app/home/components/what-you-get'
import { RoleBasedLearning } from '@/app/home/components/role-based-learning'
import { Curriculum } from '@/app/home/components/curriculum'
import { FAQ } from '@/app/home/components/faq'
export default function Homepage() {
	return (
		<>
			<div>
				<Hero />
			</div>
			<div>
				<WhatYouGet />
			</div>
			<div>
				<RoleBasedLearning />
			</div>
			<div>
				<Curriculum />
			</div>
			<div>
				<FAQ />
			</div>
		</>
	)
}
