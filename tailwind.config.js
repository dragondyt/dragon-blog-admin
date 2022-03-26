module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require(require.resolve("postcss-import")),
        ...(process.env.NODE_ENV === "production"
            ? [
                require(require.resolve("postcss-preset-env"))({stage: 0}),
                require(require.resolve("autoprefixer"))
            ]
            : []),
    ],
};
