module.exports = {
    pwa: {
        name: "Believers Sword",
        manifestOptions: {
            start_url: '.'
        }
    },

    publicPath: process.env.VUE_APP_WEB == 'true' ? "front" : "",
};
