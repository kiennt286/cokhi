import React from 'react';
import { Link, useParams } from 'react-router-dom';
import BreadcrumbBar from '../components/BreadcrumbBar';
import { api } from "../lib/api";

const KnowledgeDetail = () => {
  const { slug } = useParams();

  const [post, setPost] = React.useState(null);
  const [relatedPosts, setRelatedPosts] = React.useState([]);

  // 🔥 Fetch post detail
  React.useEffect(() => {
    let isMounted = true;

    const fetchPost = async () => {
      try {
        const data = await api.getPostBySlug(slug);
        if (isMounted && data?.post) {
          setPost(data.post);
        }
      } catch {
        setPost(null);
      }
    };

    fetchPost();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // 🔥 Fetch related posts
  React.useEffect(() => {
    const fetchRelated = async () => {
      try {
        if (!post) return;

        const res = await api.getPosts();
        const posts = res?.posts || [];

        const filtered = posts
          .filter(p => p.slug !== slug)
          .filter(p => p.category === post.category)
          .slice(0, 5);

        setRelatedPosts(filtered);
      } catch {
        setRelatedPosts([]);
      }
    };

    fetchRelated();
  }, [post, slug]);

  // ❌ Not found
  if (!post) {
    return (
      <div className="border-t border-gray-300 pt-10 pb-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">
        <BreadcrumbBar
          items={[
            { label: 'Trang chủ', to: '/' },
            { label: 'Kiến thức cơ khí', to: '/kien-thuc' },
            { label: 'Không tìm thấy' },
          ]}
        />

        <h1 className="font-montserrat font-extrabold text-2xl mt-4">
          Không tìm thấy bài viết
        </h1>

        <p className="font-montserrat text-gray-600 mt-3">
          Bài viết có thể đã bị thay đổi hoặc xóa.
        </p>

        <Link
          to="/kien-thuc"
          className="inline-block mt-4 text-[#ED3524] font-semibold hover:underline"
        >
          Quay lại góc kiến thức
        </Link>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-300 pt-10 pb-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">

      {/* Breadcrumb */}
      <BreadcrumbBar
        items={[
          { label: 'Trang chủ', to: '/' },
          { label: 'Kiến thức cơ khí', to: '/kien-thuc' },
          { label: post.title },
        ]}
      />

      <Link
        to="/kien-thuc"
        className="inline-block mt-3 text-sm text-[#ED3524] font-semibold hover:underline"
      >
        ← Quay lại góc kiến thức
      </Link>

      {/* MAIN LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-8 mt-4">

        {/* LEFT - CONTENT */}
        <article className="lg:w-2/3">

          <h1 className="font-montserrat font-extrabold text-3xl">
            {post.title}
          </h1>

          <p className="text-sm text-gray-500 mt-2 font-montserrat">
            {post.readTime}
          </p>

          {post.cover && (
            <img
              src={post.cover}
              alt={post.title}
              className="w-full mt-6 h-[360px] object-cover border border-gray-200"
              onError={(e) => {
                e.currentTarget.src = "/herobg.png";
              }}
            />
          )}

          <div className="mt-6 space-y-4">
            {post.content?.map((paragraph, idx) => (
              <p key={idx} className="font-montserrat text-gray-700 leading-7">
                {paragraph}
              </p>
            ))}
          </div>

          {/* BULLETS */}
          <div className="mt-6 border border-gray-200 bg-[#f8fafc] p-5">
            <p className="font-montserrat font-bold mb-3">
              Tóm tắt nhanh
            </p>

            <ul className="list-disc pl-5 space-y-2">
              {post.bullets?.map((bullet, idx) => (
                <li key={idx} className="font-montserrat text-gray-700">
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <Link
            to="/contact"
            className="inline-block mt-8 bg-[#ED3524] text-white px-5 py-3 font-montserrat font-semibold hover:bg-[#cf2f20] transition-colors"
          >
            Nhận tư vấn theo bài viết này
          </Link>
        </article>

        {/* RIGHT - SIDEBAR */}
        <aside className="lg:w-1/3 space-y-6">

          {/* Related posts */}
          <div className="border border-gray-200 bg-white p-4">
            <p className="font-montserrat font-bold mb-4">
              Bài viết liên quan
            </p>

            <div className="space-y-3">
              {relatedPosts.length > 0 ? (
                relatedPosts.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/kien-thuc/${item.slug}`}
                    className="flex gap-2 items-start p-2 border border-gray-100 hover:bg-gray-50 hover:border-[#ED3524]/30 transition"
                  >
                    {/* Dot */}
                    <span className="w-2 h-2 bg-[#ED3524] rounded-full mt-[5px] flex-shrink-0" />

                    <div>
                      <p className="text-sm font-semibold font-montserrat line-clamp-2 leading-snug">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.readTime}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  Chưa có bài viết liên quan
                </p>
              )}
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
};

export default KnowledgeDetail;