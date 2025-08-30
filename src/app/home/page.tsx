import { Hero } from '@/app/home/components/hero'
import { WhatYouGet } from '@/app/home/components/what-you-get'
import { RoleBasedLearning } from '@/app/home/components/role-based-learning'
import { Curriculum } from '@/app/home/components/curriculum'
import { FAQ } from '@/app/home/components/faq'
export default function Homepage() {
	return (
		<>
			<div className="mb-10">
				<Hero />
			</div>
			<div className="mb-10">
				<WhatYouGet />
			</div>
			<div className="mb-10">
				<RoleBasedLearning />
			</div>
			<div className="mb-10">
				<Curriculum />
			</div>
			<div className="mb-10">
				<FAQ />
			</div>
		</>
	)
}
