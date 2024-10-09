import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import {SpeedInsights} from "@vercel/speed-insights/next";

export const metadata: Metadata = {
	title: "Your subscription tracker",
	description: "Track your subscriptions costs",
	icons: [{ rel: "icon", url: "/my_logo.ico" }],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${GeistSans.variable}`}>
			<body>
			{children}
			<SpeedInsights />
			</body>
		</html>
	);
}
