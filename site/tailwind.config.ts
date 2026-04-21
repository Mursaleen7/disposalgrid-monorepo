import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			'uber-black': '#000000',
  			'uber-white': '#FFFFFF',
  			'uber-gray': {
  				'50': '#F6F6F6',
  				'100': '#EEEEEE',
  				'200': '#E2E2E2',
  				'300': '#CBCBCB',
  				'400': '#AFAFAF',
  				'500': '#757575',
  				'600': '#545454',
  				'700': '#333333',
  				'800': '#1F1F1F',
  				'900': '#141414'
  			},
  			'uber-green': {
  				DEFAULT: '#06C167',
  				dark: '#038C48',
  				light: '#E6F9EE'
  			},
  			danger: '#D44333',
  			warning: '#F5A623',
  			info: '#276EF1',
  			success: '#06C167',
  			'surface-primary': '#FFFFFF',
  			'surface-secondary': '#F6F6F6',
  			'surface-inverse': '#000000',
  			'surface-invert-secondary': '#1F1F1F',
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			card: {
  				DEFAULT: 'var(--card)',
  				foreground: 'var(--card-foreground)'
  			},
  			popover: {
  				DEFAULT: 'var(--popover)',
  				foreground: 'var(--popover-foreground)'
  			},
  			primary: {
  				DEFAULT: 'var(--primary)',
  				foreground: 'var(--primary-foreground)'
  			},
  			secondary: {
  				DEFAULT: 'var(--secondary)',
  				foreground: 'var(--secondary-foreground)'
  			},
  			muted: {
  				DEFAULT: 'var(--muted)',
  				foreground: 'var(--muted-foreground)'
  			},
  			accent: {
  				DEFAULT: 'var(--accent)',
  				foreground: 'var(--accent-foreground)'
  			},
  			destructive: {
  				DEFAULT: 'var(--destructive)',
  				foreground: 'var(--destructive-foreground)'
  			},
  			border: 'var(--border)',
  			input: 'var(--input)',
  			ring: 'var(--ring)'
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'system-ui',
  				'-apple-system',
  				'sans-serif'
  			],
  			mono: [
  				'JetBrains Mono',
  				'monospace'
  			]
  		},
  		fontSize: {
  			hero: [
  				'72px',
  				{
  					lineHeight: '1.0',
  					letterSpacing: '-2px',
  					fontWeight: '700'
  				}
  			],
  			display: [
  				'48px',
  				{
  					lineHeight: '1.05',
  					letterSpacing: '-1.5px',
  					fontWeight: '700'
  				}
  			],
  			h1: [
  				'40px',
  				{
  					lineHeight: '1.1',
  					letterSpacing: '-1px',
  					fontWeight: '700'
  				}
  			],
  			h2: [
  				'32px',
  				{
  					lineHeight: '1.15',
  					letterSpacing: '-0.5px',
  					fontWeight: '700'
  				}
  			],
  			h3: [
  				'24px',
  				{
  					lineHeight: '1.2',
  					letterSpacing: '0px',
  					fontWeight: '700'
  				}
  			],
  			h4: [
  				'20px',
  				{
  					lineHeight: '1.3',
  					letterSpacing: '0px',
  					fontWeight: '500'
  				}
  			],
  			'body-lg': [
  				'18px',
  				{
  					lineHeight: '1.6',
  					fontWeight: '400'
  				}
  			],
  			body: [
  				'16px',
  				{
  					lineHeight: '1.6',
  					fontWeight: '400'
  				}
  			],
  			sm: [
  				'14px',
  				{
  					lineHeight: '1.5',
  					fontWeight: '400'
  				}
  			],
  			xs: [
  				'12px',
  				{
  					lineHeight: '1.4',
  					fontWeight: '400'
  				}
  			]
  		},
  		borderRadius: {
  			'uber-xs': '4px',
  			uber: '8px',
  			'uber-md': '12px',
  			'uber-lg': '16px',
  			'uber-xl': '24px',
  			'uber-pill': '9999px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		spacing: {
  			'uber-1': '4px',
  			'uber-2': '8px',
  			'uber-3': '12px',
  			'uber-4': '16px',
  			'uber-5': '24px',
  			'uber-6': '32px',
  			'uber-7': '48px',
  			'uber-8': '64px',
  			'uber-9': '80px',
  			'uber-10': '96px',
  			'uber-11': '128px'
  		},
  		boxShadow: {
  			'uber-card': '0 2px 8px rgba(0,0,0,0.08)'
  		},
  		transitionTimingFunction: {
  			uber: 'cubic-bezier(0.4, 0, 0.2, 1)'
  		},
  		transitionDuration: {
  			'uber-fast': '120ms',
  			'uber-base': '200ms',
  			'uber-slow': '320ms'
  		},
  		keyframes: {
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(-8px)'
  				},
  				'50%': {
  					transform: 'translateY(0)'
  				}
  			},
  			'pulse-dot': {
  				'0%, 100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				},
  				'50%': {
  					transform: 'scale(1.4)',
  					opacity: '0.7'
  				}
  			},
  			'fade-in-up': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(16px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			float: 'float 3s ease-in-out infinite',
  			'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
  			'fade-in-up': 'fade-in-up 320ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
