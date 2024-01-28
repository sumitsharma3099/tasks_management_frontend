// Clear local storage to logout the user
const clearSession = () => {
    localStorage.removeItem("user_full_name");
    localStorage.removeItem("token");
    localStorage.removeItem("profile_pic_url");
}

// Add token in local storage to login user.
const createSession = (user_full_name, token, profile_pic_url) => {
    localStorage.setItem("user_full_name", user_full_name);
    localStorage.setItem("token", token);
    localStorage.setItem("profile_pic_url", profile_pic_url);
}

export { clearSession, createSession }