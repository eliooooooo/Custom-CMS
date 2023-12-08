const sassPlugin = require('esbuild-sass-plugin').default;
const postcss = require('esbuild-plugin-postcss');

require("esbuild")
    .build({
        logLevel: "debug",
        entryPoints: ["./public/assets/js/main.js"],
        bundle: true,
        outdir: './dist',
        minify: false,
        plugins: [sassPlugin({ absWorkingDir: process.cwd() }), postcss.default({
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        })],
        watch: {
            onRebuild(error, result) {
                if (error) console.error('Watch build failed:', error);
                else console.log('Watch build succeeded:', result);
            },
        },
    })
    .catch(() => process.exit(1))