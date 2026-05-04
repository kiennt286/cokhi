import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../lib/api";
import { adminAuth } from "../../lib/adminAuth";

const emptyForm = {
  slug: "",
  name: "",
  brand: "",
  brandSlug: "",
  price: 0,
  image: "",
  description: "",
  category: "",
  stock: 0,
  rating: 0,
  reviews: 0,
  bestseller: false,
  discount: 0,
  createdAtText: "",
};

const AdminProducts = ({ mode = "list" }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = adminAuth.getToken();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const editingProduct = useMemo(
    () => products.find((item) => String(item._id) === String(id)),
    [id, products]
  );

  const loadProducts = useCallback(async () => {
    try {
      const data = await api.adminGetProducts(token);
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    loadProducts();
  }, [token, navigate, loadProducts]);

  useEffect(() => {
    if (mode === "edit" && editingProduct) {
      setForm({
        ...editingProduct,
        image: (editingProduct.image || []).join("\n"),
      });
    } else if (mode === "new") {
      setForm(emptyForm);
    }
  }, [editingProduct, mode]);

  const handleDelete = async (productId) => {
    if (!window.confirm("Xóa sản phẩm này?")) return;
    await api.adminDeleteProduct(token, productId);
    loadProducts();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      image: String(form.image)
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      price: Number(form.price),
      stock: Number(form.stock),
      rating: Number(form.rating),
      reviews: Number(form.reviews),
      discount: Number(form.discount),
    };

    try {
      if (mode === "edit" && id) {
        await api.adminUpdateProduct(token, id, payload);
      } else {
        await api.adminCreateProduct(token, payload);
      }
      navigate("/admin/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (mode === "list") {
    return (
      <section>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
          <Link to="/admin/products/new" className="bg-black text-white px-4 py-2">
            Thêm sản phẩm
          </Link>
        </div>
        {error ? <p className="text-red-600 mb-3">{error}</p> : null}
        <div className="bg-white border overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-2">Tên</th>
                <th className="text-left p-2">Brand</th>
                <th className="text-left p-2">Giá</th>
                <th className="text-left p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b">
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{product.brand}</td>
                  <td className="p-2">{Number(product.price || 0).toLocaleString("vi-VN")} VNĐ</td>
                  <td className="p-2 flex gap-3">
                    <Link to={`/admin/products/${product._id}/edit`} className="text-blue-600">
                      Sửa
                    </Link>
                    <button type="button" className="text-red-600 cursor-pointer" onClick={() => handleDelete(product._id)}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">{mode === "edit" ? "Sửa sản phẩm" : "Thêm sản phẩm"}</h1>
      <form onSubmit={handleSubmit} className="bg-white border p-4 space-y-3">
        {error ? <p className="text-red-600">{error}</p> : null}
        {["slug", "name", "brand", "brandSlug", "category", "createdAtText"].map((field) => (
          <input
            key={field}
            className="w-full border p-2"
            placeholder={field}
            value={form[field] ?? ""}
            onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))}
            required={["slug", "name", "brand", "brandSlug"].includes(field)}
          />
        ))}
        <textarea
          className="w-full border p-2"
          placeholder="description"
          value={form.description ?? ""}
          onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
        />
        <textarea
          className="w-full border p-2"
          placeholder="image URLs, mỗi dòng 1 link"
          value={form.image ?? ""}
          onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))}
        />
        <div className="grid grid-cols-2 gap-3">
          {["price", "stock", "rating", "reviews", "discount"].map((field) => (
            <input
              key={field}
              className="border p-2"
              placeholder={field}
              type="number"
              value={form[field] ?? 0}
              onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))}
            />
          ))}
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={Boolean(form.bestseller)}
            onChange={(event) => setForm((prev) => ({ ...prev, bestseller: event.target.checked }))}
          />
          Bestseller
        </label>
        <div className="flex gap-3">
          <button type="submit" className="bg-black text-white px-4 py-2" disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
          <button type="button" className="border px-4 py-2" onClick={() => navigate("/admin/products")}>
            Hủy
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminProducts;
