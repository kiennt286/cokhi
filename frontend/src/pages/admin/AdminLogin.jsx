import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { adminAuth } from "../../lib/adminAuth";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await api.adminLogin(email, password);
      adminAuth.setToken(data.token);
      navigate("/admin/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 border">
        <h1 className="text-2xl font-bold mb-6">Đăng nhập Admin</h1>
        <label className="block text-sm mb-2">Email</label>
        <input
          className="w-full border p-2 mb-4"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          required
        />
        <label className="block text-sm mb-2">Mật khẩu</label>
        <input
          className="w-full border p-2 mb-4"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          required
        />
        {error ? <p className="text-red-600 text-sm mb-3">{error}</p> : null}
        <button type="submit" className="w-full bg-black text-white py-2 cursor-pointer" disabled={loading}>
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
