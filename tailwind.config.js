module.exports = {
    mode: "jit",
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {},
        screens: {
            '2xl': { 'max': '1535px' },
            // => @media (max-width: 1535px) { ... }

            'xl': { 'max': '1279px' },
            // => @media (max-width: 1279px) { ... }

            'lg': { 'max': '1023px' },
            // => @media (max-width: 1023px) { ... }

            'md': { 'max': '767px' },
            // => @media (max-width: 767px) { ... }

            'sm': { 'max': '639px' },
            // => @media (max-width: 639px) { ... }
            'tablet': { 'max': '767px' },
            'lmobile': { 'max': '425px' },
            'mmobile': { 'max': '375px' },
            'smobile': { 'max': '320px' }
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
    important: true,
};
