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
  image: [],
  detailedDescription: "",
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
  const [imageUrls, setImageUrls] = useState([""]);
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
        image: editingProduct.image || [],
      });
      setImageUrls(editingProduct.image?.length ? editingProduct.image : [""]);
    } else if (mode === "new") {
      setForm(emptyForm);
      setImageUrls([""]);
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
      image: imageUrls.map((item) => item.trim()).filter(Boolean),
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

  const handleImageChange = (index, value) => {
    setImageUrls((prev) => prev.map((item, idx) => (idx === index ? value : item)));
  };

  const addImageField = () => {
    setImageUrls((prev) => [...prev, ""]);
  };

  const removeImageField = (index) => {
    setImageUrls((prev) => {
      if (prev.length === 1) return [""];
      return prev.filter((_, idx) => idx !== index);
    });
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
    <section className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">{mode === "edit" ? "Sửa sản phẩm" : "Thêm sản phẩm"}</h1>
      <form onSubmit={handleSubmit} className="bg-white border p-4 space-y-3">
        {error ? <p className="text-red-600">{error}</p> : null}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            ["slug", "Slug"],
            ["name", "Tên sản phẩm"],
            ["brand", "Thương hiệu"],
            ["brandSlug", "Brand slug"],
            ["category", "Danh mục"],
            ["createdAtText", "Ngày hiển thị"],
          ].map(([field, label]) => (
            <label key={field} className="space-y-1">
              <span className="text-sm text-gray-600">{label}</span>
              <input
                className="w-full border p-2"
                placeholder={field}
                value={form[field] ?? ""}
                onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))}
                required={["slug", "name", "brand", "brandSlug"].includes(field)}
              />
            </label>
          ))}
        </div>
        <textarea
          className="w-full border p-2 min-h-40"
          placeholder="Mô tả chi tiết (nội dung dài)"
          value={form.detailedDescription ?? ""}
          onChange={(event) => setForm((prev) => ({ ...prev, detailedDescription: event.target.value }))}
        />
        <div className="border p-3 space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Hình ảnh sản phẩm</p>
            <button type="button" className="border px-3 py-1 text-sm" onClick={addImageField}>
              + Thêm ảnh
            </button>
          </div>
          {imageUrls.map((url, index) => (
            <div key={index} className="space-y-2">
              <div className="flex gap-2">
                <input
                  className="w-full border p-2"
                  placeholder={`URL ảnh ${index + 1}`}
                  value={url}
                  onChange={(event) => handleImageChange(index, event.target.value)}
                />
                <button
                  type="button"
                  className="border px-3 py-2 text-red-600"
                  onClick={() => removeImageField(index)}
                >
                  Xóa
                </button>
              </div>
              {url ? (
                <img
                  src={url}
                  alt={`preview-${index}`}
                  className="h-20 w-20 object-cover border"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                  onLoad={(event) => {
                    event.currentTarget.style.display = "block";
                  }}
                />
              ) : null}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            ["price", "Giá"],
            ["stock", "Kho"],
            ["rating", "Rating"],
            ["reviews", "Reviews"],
            ["discount", "Giảm giá"],
          ].map(([field, label]) => (
            <label key={field} className="space-y-1">
              <span className="text-sm text-gray-600">{label}</span>
              <input
                className="w-full border p-2"
                placeholder={field}
                type="number"
                value={form[field] ?? 0}
                onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))}
              />
            </label>
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
