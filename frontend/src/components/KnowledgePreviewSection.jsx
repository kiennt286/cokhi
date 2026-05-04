import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { api } from '../lib/api';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const KnowledgePreviewSection = () => {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      try {
        const data = await api.getPosts();
        if (isMounted && Array.isArray(data?.posts)) {
          setPosts(data.posts.slice(0, 10));
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
    <section className="py-16 bg-white">
      <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
        <div>
          <p className="font-montserrat text-sm tracking-[0.2em] text-[#ED3524] mb-2">
            GÓC KIẾN THỨC
          </p>
          <h2 className="font-montserrat font-extrabold text-2xl">
            Kinh Nghiệm Gia Công CNC
          </h2>
        </div>

        <Link
          to="/kien-thuc"
          className="font-montserrat text-sm font-semibold text-[#ED3524] hover:underline"
        >
          Xem tất cả bài viết
        </Link>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={false}
          loop
          spaceBetween={16}
          slidesPerView={1}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            el: '.knowledge-preview-pagination',
            clickable: true,
          }}
          className="knowledge-preview-swiper"
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {posts.map((post) => (
            <SwiperSlide key={post.slug} className="h-auto">
              <article className="border border-gray-200 bg-[#f8fafc] overflow-hidden h-full flex flex-col">
                <Link to={`/kien-thuc/${post.slug}`}>
                  {post.cover ? (
                    <img
                      src={post.cover}
                      alt={post.title}
                      className="block w-full aspect-[1/1] object-cover"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = "/herobg.png";
                      }}
                    />
                  ) : (
                    <div className="w-full aspect-[1/1] bg-gray-200" />
                  )}
                </Link>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-montserrat font-bold text-base leading-snug line-clamp-2 min-h-[2.5rem]">
                    {post.title}
                  </h3>

                  <p className="font-montserrat text-xs text-gray-600 mt-2 line-clamp-3 min-h-[3.25rem]">
                    {post.excerpt}
                  </p>

                  <Link
                    to={`/kien-thuc/${post.slug}`}
                    className="font-montserrat text-sm inline-block mt-auto text-[#ED3524] hover:underline"
                  >
                    Đọc thêm
                  </Link>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination */}
        <div className="knowledge-preview-pagination mt-4 flex justify-center" />
      </div>
    </section>
  );
};

export default KnowledgePreviewSection;