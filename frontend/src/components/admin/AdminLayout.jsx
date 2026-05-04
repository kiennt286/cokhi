import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { adminAuth } from "../../lib/adminAuth";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    adminAuth.clearToken();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <Link to="/admin/products" className="font-semibold text-lg">
          Admin Cokhi
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <NavLink to="/admin/products">Sản phẩm</NavLink>
          <NavLink to="/admin/posts">Bài viết</NavLink>
          <button type="button" onClick={handleLogout} className="text-red-600 cursor-pointer">
            Đăng xuất
          </button>
        </nav>
      </header>
      <main className="p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
