/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			gradientColorStops: {
				primaryGradient: ["rgb(var(--color-secondary))", "rgb(225, 145, 70)"],
			},
			colors: {
				accent: {
					1: "rgb(130, 145, 120)",
					2: "rgb(120, 125, 200)",
				},
				bkg: "rgb(var(--color-bkg))",
				bkg2: "rgb(var(--color-bkg2))",
				hoverBkg: "rgba(var(--color-hover-bkg))",
				primary: "rgb(225, 145, 70)",
				content: "rgb(var(--color-content))",
				secondary: "rgb(var(--color-secondary))",
				tertiary: "rgb(0, 120, 120)",
				glass: "rgba(0,0,0,.1)",
				success: "rgb(75, 160, 50)",
				danger: "rgb(200, 0, 50)",
				warning: "rgb(240, 210, 20)",
			},
		},
		screens: {
			sm: "300px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
	},
	plugins: [],
	darkMode: "class",
};
