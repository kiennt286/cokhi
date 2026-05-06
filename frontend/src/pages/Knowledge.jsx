import React from 'react';
import { Link } from 'react-router-dom';
import BreadcrumbBar from '../components/BreadcrumbBar';
import { api } from "../lib/api";

const Knowledge = () => {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      try {
        const data = await api.getPosts();
        if (isMounted && Array.isArray(data?.posts)) {
          setPosts(data.posts);
        }
      } catch {
        setPosts([]);
      }
    };

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="border-t border-gray-300 pt-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">
      <div className="mb-4">
        <BreadcrumbBar items={[{ label: 'Trang chủ', to: '/' }, { label: 'Kiến thức cơ khí' }]} />
      </div>
      <div className="mb-8">
        <p className="font-montserrat text-sm tracking-[0.2em] text-[#ED3524] mb-3">GÓC KIẾN THỨC</p>
        <h1 className="font-montserrat font-extrabold text-3xl">Bài Viết Kỹ Thuật Cơ Khí</h1>
        <p className="font-montserrat text-gray-600 mt-3 max-w-3xl">
          Tổng hợp kiến thức thực tế về dao cụ và ứng dụng gia công CNC để bạn tham khảo trước khi
          triển khai sản xuất.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((article) => (
          <article key={article.slug} className="border border-gray-200 bg-white overflow-hidden">
            <Link to={`/kien-thuc/${article.slug}`}>
              {article.cover ? (
                <img
                  src={article.cover}
                  alt={article.title}
                  className="w-full h-52 object-cover"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = "/herobg.png";
                  }}
                />
              ) : (
                <div className="w-full h-52 bg-gray-100" />
              )}
            </Link>

            <div className="p-5">
              <p className="font-montserrat text-xs text-gray-500">{article.readTime}</p>
              <h2 className="font-montserrat font-bold text-lg mt-2">{article.title}</h2>
              <p className="font-montserrat text-sm text-gray-600 mt-2">{article.excerpt}</p>
              <Link to={`/kien-thuc/${article.slug}`} className="inline-block mt-4 text-sm text-[#ED3524] font-semibold hover:underline">
                Đọc bài viết
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <Link to="/contact" className="inline-block text-sm text-[#ED3524] font-semibold hover:underline">
          Cần tư vấn theo bài viết? Liên hệ kỹ thuật
        </Link>
      </div>
    </div>
  );
};

export default Knowledge;
