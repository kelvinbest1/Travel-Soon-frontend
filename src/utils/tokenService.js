export default {
    setToken,
    getToken,
    getUserFromToken,
    removeToken,
};

function removeToken() {
    localStorage.removeItem("token");
}

function getUserFromToken() {
    const token = getToken();
    return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}