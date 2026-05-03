import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { knowledgePosts } from '../data/knowledgePosts';
import BreadcrumbBar from '../components/BreadcrumbBar';

const KnowledgeDetail = () => {
  const { slug } = useParams();
  const post = knowledgePosts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <div className="border-t border-gray-300 pt-10 pb-16">
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">
          <BreadcrumbBar
            items={[
              { label: 'Trang chủ', to: '/' },
              { label: 'Kiến thức cơ khí', to: '/kien-thuc' },
              { label: 'Không tìm thấy' },
            ]}
          />
        </div>
        <h1 className="font-montserrat font-extrabold text-2xl">Không tìm thấy bài viết</h1>
        <p className="font-montserrat text-gray-600 mt-3">
          Bài viết bạn đang tìm có thể đã được cập nhật hoặc thay đổi đường dẫn.
        </p>
        <Link to="/kien-thuc" className="inline-block mt-4 text-[#ED3524] font-semibold hover:underline">
          Quay lại góc kiến thức
        </Link>
      </div>
    );
  }

  return (
    <article className="border-t border-gray-300 pt-10 pb-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">
      <BreadcrumbBar
        items={[
          { label: 'Trang chủ', to: '/' },
          { label: 'Kiến thức cơ khí', to: '/kien-thuc' },
          { label: post.title },
        ]}
      />

      <Link to="/kien-thuc" className="inline-block mt-3 font-montserrat text-sm text-[#ED3524] font-semibold hover:underline">
        ← Quay lại góc kiến thức
      </Link>

      <div className="mt-4">
        <p className="font-montserrat text-xs tracking-[0.2em] text-[#ED3524]">GÓC KIẾN THỨC</p>
        <h1 className="font-montserrat font-extrabold text-3xl mt-2">{post.title}</h1>
        <p className="font-montserrat text-sm text-gray-500 mt-2">{post.readTime}</p>
      </div>

      {post.cover ? (
        <img src={post.cover} alt={post.title} className="w-full max-w-4xl mt-6 h-[360px] object-cover border border-gray-200" />
      ) : null}

      <div className="max-w-4xl mt-6 space-y-4">
        {post.content.map((paragraph) => (
          <p key={paragraph} className="font-montserrat text-gray-700 leading-7">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="max-w-4xl mt-6 border border-gray-200 bg-[#f8fafc] p-5">
        <p className="font-montserrat font-bold mb-3">Tóm tắt nhanh</p>
        <ul className="list-disc pl-5 space-y-2">
          {post.bullets.map((bullet) => (
            <li key={bullet} className="font-montserrat text-gray-700">
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      <Link to="/contact" className="inline-block mt-8 bg-[#ED3524] text-white px-5 py-3 font-montserrat font-semibold hover:bg-[#cf2f20] transition-colors">
        Nhận tư vấn theo bài viết này
      </Link>
    </article>
  );
};

export default KnowledgeDetail;
