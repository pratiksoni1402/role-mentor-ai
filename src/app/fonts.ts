import { Cormorant_Garamond } from 'next/font/google';
import localFont from 'next/font/local';

export const CormorantG = Cormorant_Garamond({
	weight: ['300', '400', '500', '600', '700'],
	style: ['italic', 'normal'],
	display: 'swap',
	subsets: ['latin'],
	preload: true,
	fallback: ['Georgia', 'Times New Roman', 'serif'],
	adjustFontFallback: true,
	variable: '--font-heading',
});

export const Satoshi = localFont({
	src: './../../public/fonts/satoshi/Satoshi-Variable.woff2',
	variable: '--font-body',
});
