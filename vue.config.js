module.exports = {
    pwa: {
        name: "Believers Sword",
        manifestOptions: {
            start_url: '.'
        }
    },

    publicPath: process.env.WEB ? "front" : "",
};
