

class UserSession {


    static getZaloId() { return localStorage.getItem("zaloId") }
    static getAccessToken() { return localStorage.getItem("access_token") }
    static getUserId() { return localStorage.getItem("user_id") }
    static getAccountStatus() { return localStorage.getItem("account_status") }
    static isLoggedIn() { return !!this.getAccessToken() }




    static hasRegistered() {
        const zaloId = this.getZaloId();
        return !!zaloId && zaloId !== "undefined" && zaloId.length > 5;
    }

    static getAll() {
        return {
            zaloId: this.getZaloId(),
            token: this.getAccessToken(),
            userId: this.getUserId(),
            status: this.getAccountStatus(),
        };
    }

    static setSession({ zaloId, token, userId, status }) {
        if (zaloId) localStorage.setItem("zaloId", zaloId);
        if (token) localStorage.setItem("access_token", token);
        if (userId) localStorage.setItem("user_id", userId);
        if (status) localStorage.setItem("account_status", status);
    }


    static clear() {
        localStorage.removeItem("zaloId");
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("account_status");
    }
}

export default UserSession;
