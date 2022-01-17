module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		container: {
			padding: {
				DEFAULT: '5%',
				sm: '32px',
			},
		},
		extend: {
			colors: {
				primary: '#3b3b3b',
				orange: {
					DEFAULT: '#CCB05C',
					light: '#DCC98F',
				},
				info: '#2DA7FB',
				warning: '#FFCB11',
				danger: '#ec4141',
				success: '#67db8e',
			},
			fontFamily: {
				main: 'Roboto, sans-serif',
			},
			backgroundImage: {
				'rak-buku': "url('/Images/hero-banner.jpg')",
			},
			screens: {
				'-2xl': { raw: '(max-width: 1535px)' },
				'-xl': { raw: '(max-width: 1279px)' },
				'-lg': { raw: '(max-width: 1023px)' },
				'-md': { raw: '(max-width: 767px)' },
				'-sm': { raw: '(max-width: 639px)' },
			},
			backgroundPosition: {
				'pos-5': '16rem -31rem',
			},
		},
	},
	plugins: [],
};
