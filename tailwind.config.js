module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            co1: "#112D4E",
            co2: "#3F72AF",
            "co-gray": "#7E91A7",
            "co-white": "#F9F7F7",
        },
    },
    plugins: [require("daisyui")],
};
