import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../lib/api";
import { adminAuth } from "../../lib/adminAuth";

const emptyForm = {
  slug: "",
  title: "",
  excerpt: "",
  cover: "",
  readTime: "",
  content: "",
  bullets: "",
  status: "published",
};

const AdminPosts = ({ mode = "list" }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = adminAuth.getToken();
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const editingPost = useMemo(() => posts.find((item) => String(item._id) === String(id)), [posts, id]);

  const loadPosts = useCallback(async () => {
    try {
      const data = await api.adminGetPosts(token);
      setPosts(data.posts || []);
    } catch (err) {
      setError(err.message);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    loadPosts();
  }, [token, navigate, loadPosts]);

  useEffect(() => {
    if (mode === "edit" && editingPost) {
      setForm({
        ...editingPost,
        content: (editingPost.content || []).join("\n"),
        bullets: (editingPost.bullets || []).join("\n"),
      });
    } else if (mode === "new") {
      setForm(emptyForm);
    }
  }, [mode, editingPost]);

  const handleDelete = async (postId) => {
    if (!window.confirm("Xóa bài viết này?")) return;
    await api.adminDeletePost(token, postId);
    loadPosts();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      content: String(form.content)
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      bullets: String(form.bullets)
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      if (mode === "edit" && id) {
        await api.adminUpdatePost(token, id, payload);
      } else {
        await api.adminCreatePost(token, payload);
      }
      navigate("/admin/posts");
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
          <h1 className="text-2xl font-bold">Quản lý bài viết</h1>
          <Link to="/admin/posts/new" className="bg-black text-white px-4 py-2">
            Thêm bài viết
          </Link>
        </div>
        {error ? <p className="text-red-600 mb-3">{error}</p> : null}
        <div className="bg-white border overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-2">Tiêu đề</th>
                <th className="text-left p-2">Trạng thái</th>
                <th className="text-left p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="border-b">
                  <td className="p-2">{post.title}</td>
                  <td className="p-2">{post.status}</td>
                  <td className="p-2 flex gap-3">
                    <Link to={`/admin/posts/${post._id}/edit`} className="text-blue-600">
                      Sửa
                    </Link>
                    <button type="button" className="text-red-600 cursor-pointer" onClick={() => handleDelete(post._id)}>
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
      <h1 className="text-2xl font-bold mb-4">{mode === "edit" ? "Sửa bài viết" : "Thêm bài viết"}</h1>
      <form onSubmit={handleSubmit} className="bg-white border p-4 space-y-3">
        {error ? <p className="text-red-600">{error}</p> : null}
        {["slug", "title", "excerpt", "cover", "readTime"].map((field) => (
          <input
            key={field}
            className="w-full border p-2"
            placeholder={field}
            value={form[field] ?? ""}
            onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))}
            required={["slug", "title"].includes(field)}
          />
        ))}
        <textarea
          className="w-full border p-2 min-h-32"
          placeholder="content, mỗi dòng là 1 đoạn"
          value={form.content ?? ""}
          onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
        />
        <textarea
          className="w-full border p-2 min-h-24"
          placeholder="bullets, mỗi dòng 1 ý"
          value={form.bullets ?? ""}
          onChange={(event) => setForm((prev) => ({ ...prev, bullets: event.target.value }))}
        />
        <select
          className="border p-2"
          value={form.status ?? "published"}
          onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
        >
          <option value="published">published</option>
          <option value="draft">draft</option>
        </select>
        <div className="flex gap-3">
          <button type="submit" className="bg-black text-white px-4 py-2" disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
          <button type="button" className="border px-4 py-2" onClick={() => navigate("/admin/posts")}>
            Hủy
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminPosts;
