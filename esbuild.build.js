const sassPlugin = require('esbuild-sass-plugin').default;

require("esbuild")
    .build({
        logLevel: "debug",
        entryPoints: ["assets/js/main.js"],
        bundle: true,
        outdir: 'dist',
        minify: false,
        plugins: [sassPlugin()],
})
    .then(result => { console.log('Js & css *NON* minifiés !!') })
    .catch(() => process.exit(1))