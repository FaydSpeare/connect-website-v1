export default class Session {


    static login(rememberMe=false) {
        sessionStorage.setItem("login", true);
        if (rememberMe) {
            localStorage.setItem("login", true);
        }
    }

    static logout() {
        sessionStorage.setItem("login", false);
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("userId");

        localStorage.setItem("login", false);
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
    }

    static isLoggedIn() {
        return sessionStorage.getItem("login") === "true" || localStorage.getItem("login") === "true";
    }

    static setUserId(userId, rememberMe=false) {
        sessionStorage.setItem("userId", userId);
        if (rememberMe) {
            localStorage.setItem("userId", userId);
        }
    }

    static getUserId() {
        let sessionUserId = sessionStorage.getItem("userId");
        if (sessionUserId == null) {
            return localStorage.getItem("userId");
        }
        return sessionUserId;
    }

    static setLoginCallback(callback) {
        Session.loginCallback = callback;
    }

    static setUsername(username, rememberMe=false) {
        sessionStorage.setItem("username", username);
        if (rememberMe) {
            localStorage.setItem("username", username);
        }
    }

    static getUsername() {
        let sessionUsername = sessionStorage.getItem("username");
        if (sessionUsername == null) {
            return localStorage.getItem("username");
        }
        return sessionUsername;
    }

}