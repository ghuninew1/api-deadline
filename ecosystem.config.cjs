module.exports = {
    apps: [
        {
            name: "server",
            script: "./src/server.js",
            instances: 1,
            exec_mode: "fork_mode",
            watch: true,
            env: {
                PORT: 3088,
                NODE_ENV: "production",
                LINE_NOTIFY_TONKEN:
                    "aFTg44EBeLANyh7sJQSXIhfvlmxci7VPPU9GBe0mIb2",
                MONGODB_URI:
                    "mongodb://admin1:bbpadmin2022@192.168.1.43:27017/gnewapi?authSource=admin",
                MONGODB_URI3:
                    "mongodb://192.168.1.45:27111/deadline10db?authSource=admin&directConnection=true&tls=true&tlsAllowInvalidCertificates=true&tlsCertificateKeyFile=%2FUsers%2Fadmin1%2FDesktop%2F001%2Fssl%2Fcer_deadline%2Fmongo_client.pem&tlsCAFile=%2FUsers%2Fadmin1%2FDesktop%2F001%2Fssl%2Fcer_deadline%2Fca.crt&tlsCertificateKeyFilePassword=bbpadmin",
                JWT_SECRET:
                    "70ae4e08344261a3cef96b103601add66b5ed514728eb464530f82e9038f76de",
                JWT_REFRESH_TOKEN:
                    "79b926a15eefc23e9f4baa8869dc9f850ad9361ef6c0aae6ccae6a6e6c3f812c",
            },
        },
    ],
};
