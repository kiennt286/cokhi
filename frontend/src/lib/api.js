const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

const buildHeaders = (token, hasJson = true) => {
  const headers = {};
  if (hasJson) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, options);

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
};

export const api = {
  getProducts: () => request("/products"),
  getProductByBrandSlug: (brand, slug) => request(`/products/${brand}/${slug}`),
  getPosts: () => request("/posts"),
  getPostBySlug: (slug) => request(`/posts/${slug}`),
  adminLogin: (email, password) =>
    request("/admin/auth/login", {
      method: "POST",
      headers: buildHeaders(null),
      body: JSON.stringify({ email, password }),
    }),
  adminMe: (token) =>
    request("/admin/auth/me", {
      headers: buildHeaders(token, false),
    }),
  adminGetProducts: (token) =>
    request("/admin/products", {
      headers: buildHeaders(token, false),
    }),
  adminCreateProduct: (token, payload) =>
    request("/admin/products", {
      method: "POST",
      headers: buildHeaders(token),
      body: JSON.stringify(payload),
    }),
  adminUpdateProduct: (token, id, payload) =>
    request(`/admin/products/${id}`, {
      method: "PUT",
      headers: buildHeaders(token),
      body: JSON.stringify(payload),
    }),
  adminDeleteProduct: (token, id) =>
    request(`/admin/products/${id}`, {
      method: "DELETE",
      headers: buildHeaders(token, false),
    }),
  adminGetPosts: (token) =>
    request("/admin/posts", {
      headers: buildHeaders(token, false),
    }),
  adminCreatePost: (token, payload) =>
    request("/admin/posts", {
      method: "POST",
      headers: buildHeaders(token),
      body: JSON.stringify(payload),
    }),
  adminUpdatePost: (token, id, payload) =>
    request(`/admin/posts/${id}`, {
      method: "PUT",
      headers: buildHeaders(token),
      body: JSON.stringify(payload),
    }),
  adminDeletePost: (token, id) =>
    request(`/admin/posts/${id}`, {
      method: "DELETE",
      headers: buildHeaders(token, false),
    }),
};
