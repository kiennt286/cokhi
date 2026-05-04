const TOKEN_KEY = "cokhi_admin_token";

export const adminAuth = {
  getToken: () => localStorage.getItem(TOKEN_KEY) || "",
  setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
  clearToken: () => localStorage.removeItem(TOKEN_KEY),
};
