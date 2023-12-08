const sassPlugin = require('esbuild-sass-plugin').default;
const postcss = require('esbuild-plugin-postcss');

require("esbuild")
    .build({
        logLevel: "debug",
        entryPoints: ["./public/assets/js/main.js"],
        bundle: true,
        outdir: './dist',
        minify: false,
        plugins: [sassPlugin(), postcss.default({
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        })],
    })
    .then(result => { console.log('Js & css minifiés !!') })
    .catch(() => process.exit(1))