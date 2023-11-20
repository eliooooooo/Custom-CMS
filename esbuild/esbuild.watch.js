const sassPlugin = require('esbuild-sass-plugin').default;

require("esbuild")
    .build({
        logLevel: "debug",
        entryPoints: ["./assets/js/main.js"],
        bundle: true,
        outdir: './dist',
        minify: false,
        plugins: [sassPlugin({ absWorkingDir: process.cwd() })],
        watch: {
            onRebuild(error, result) {
                if (error) console.error('Watch build failed:', error);
                else console.log('Watch build succeeded:', result);
            },
        },
    })
    .catch(() => process.exit(1))