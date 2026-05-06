import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { api } from '../lib/api';

import 'swiper/css';
import 'swiper/css/navigation';

const KnowledgePreviewSection = () => {
  const [posts, setPosts] = React.useState([]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const swiperRef = React.useRef(null);

  React.useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      try {
        const data = await api.getPosts();
        if (isMounted && Array.isArray(data?.posts)) {
          setPosts(data.posts.slice(0, 12));
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
      {/* HEADER */}
      <div className="flex items-end justify-between gap-4 mb-8 flex-wrap container mx-auto">
        <div>
          <p className="font-montserrat text-sm tracking-[0.2em] text-[#ED3524] mb-2 uppercase">
            Góc kiến thức
          </p>
          <h2 className="font-montserrat font-extrabold text-2xl uppercase">
            Kinh Nghiệm Gia Công CNC
          </h2>
        </div>

        <Link
          to="/kien-thuc"
          className="font-montserrat text-sm text-[#ED3524] hover:underline self-end"
        >
          Xem tất cả bài viết
        </Link>
      </div>

      <div className="relative container mx-auto">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={false}
          loop={posts.length > 4}
          spaceBetween={16}
          slidesPerView={1}
          slidesPerGroup={1} // 👉 FIX: swipe từng card

          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}

          onSwiper={(swiper) => (swiperRef.current = swiper)}

          onSlideChange={(swiper) => {
            const perView =
              swiper.params.breakpoints?.[swiper.currentBreakpoint]?.slidesPerView ||
              swiper.params.slidesPerView ||
              1;

            const groupIndex = Math.floor(swiper.realIndex / perView);
            setActiveIndex(groupIndex);
          }}

          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}

          className="knowledge-preview-swiper"
        >
          {posts.map((post) => (
            <SwiperSlide key={post.slug} className="h-auto">
              <article className="border border-gray-200 bg-[#f8fafc] overflow-hidden h-full flex flex-col group">
                <Link to={`/kien-thuc/${post.slug}`} className="overflow-hidden">
                  {post.cover ? (
                    <img
                      src={post.cover}
                      alt={post.title}
                      className="block w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = "/herobg.png";
                      }}
                    />
                  ) : (
                    <div className="w-full aspect-square bg-gray-200" />
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

        {/* CUSTOM PAGINATION */}
        <div className="knowledge-preview-pagination mt-8 flex justify-center gap-3">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => {
                const swiper = swiperRef.current;
                if (!swiper) return;

                const perView =
                  swiper.params.breakpoints?.[swiper.currentBreakpoint]?.slidesPerView ||
                  swiper.params.slidesPerView ||
                  1;

                swiper.slideToLoop(i * perView);
              }}
              className={`swiper-pagination-bullet transition-all duration-300 ${
                activeIndex === i
                  ? 'swiper-pagination-bullet-active'
                  : ''
              }`}
              aria-label={`Go to slide group ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowledgePreviewSection;