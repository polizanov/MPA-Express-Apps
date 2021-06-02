module.exports = {
    dev: {
        SALT_REGISTER: 10,
        port: 3000,
        SECRET_JWT: "tiho_tova_e_taina",
        USER_SESSION: "USER_SESSION"
    },
    prod: {
        SALT_REGISTER: 10,
        port: 80,
        SECRET_JWT: "tiho_tova_e_taina",
        USER_SESSION: "USER_SESSION"
    }
}

