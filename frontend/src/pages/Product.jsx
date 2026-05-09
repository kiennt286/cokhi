import React, { useState, useEffect, useContext, useRef, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Zoom, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import RelatedProduct from '../components/RelatedProduct';
import { ShopContext } from '../context/ShopContext';
import leftIcon from '../assets/left.png'; 
import rightIcon from '../assets/right.png';
import BreadcrumbBar from '../components/BreadcrumbBar';
import Seo from '../components/Seo';

const Product = () => {
  const { brand, slug } = useParams();
  const { products } = useContext(ShopContext);

  // Refs
  const thumbsSwiperRef = useRef(null);
  const mainSwiperRef = useRef(null);

  // Find product using useMemo to avoid recalculation
  const product = useMemo(() => 
    products.find(p => p.slug === slug && p.brandSlug?.toLowerCase() === brand.toLowerCase()),
    [brand, slug, products]
  );

  // Core states
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [canSlidePrev, setCanSlidePrev] = useState(false);
  const [canSlideNext, setCanSlideNext] = useState(false);

  // Update product and reset states when params change
  useEffect(() => {
    if (product) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product]);

  // Handle main swiper change
  const handleMainSwiperChange = useCallback((swiper) => {
    if (thumbsSwiperRef.current && thumbsSwiperRef.current.swiper) {
      thumbsSwiperRef.current.swiper.slideTo(swiper.activeIndex);
    }
  }, []);

  // Handle thumbnail click
  const handleThumbnailClick = useCallback((index) => {
    if (mainSwiperRef.current && mainSwiperRef.current.swiper) {
      mainSwiperRef.current.swiper.slideTo(index);
    }
  }, []);

  // Initialize thumbs swiper reference
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!product) return <div className="p-6 text-center">Không tìm thấy sản phẩm</div>;

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] pt-8">
      <Seo
        title={product.name}
        description={product.detailedDescription || `Chi tiết ${product.name}. Liên hệ CNC Bắc Ninh để được tư vấn và báo giá.`}
        path={`/${brand}/${slug}`}
        image={product.image?.[0]}
      />
      <div className="mb-4">
        <BreadcrumbBar
          items={[
            { label: 'Trang chủ', to: '/' },
            { label: 'Bộ sưu tập', to: '/collection' },
            { label: product.name },
          ]}
        />
      </div>
      
      {/* Product DATA */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        
        <div className="max-w-[560px] flex flex-col gap-5 relative">
          {/* Main image swiper */}
          <div className="w-full overflow-hidden rounded-lg relative">
            {isImageLoading && (
              <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center z-10">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            )}
            
                         <Swiper
               ref={mainSwiperRef}
               modules={[Navigation, Thumbs, Zoom, Keyboard]}
               spaceBetween={0}
               slidesPerView={1}
               navigation={{
                 nextEl: '.swiper-button-next',
                 prevEl: '.swiper-button-prev',
               }}
               thumbs={{ swiper: thumbsSwiper }}
               zoom={true}
               keyboard={{ enabled: true }}
               onSlideChange={handleMainSwiperChange}
               onSwiper={(swiper) => {
                 mainSwiperRef.current = swiper;
               }}
               className="main-swiper"
             >
              {product.image.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="swiper-zoom-container">
                    <img 
                      className="w-full h-auto transition-all duration-200 ease-out cursor-zoom-in"
                      src={image} 
                      alt={`${product.name} – ảnh ${index + 1}`}
                      onLoad={() => setIsImageLoading(false)}
                      onLoadStart={() => setIsImageLoading(true)}
                    />
                  </div>
                  
                  {/* Image counter */}
                  <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-sm font-medium z-10">
                    {index + 1} / {product.image.length}
                  </div>
                </SwiperSlide>
              ))}
              
                             {/* Custom navigation buttons */}
               <div className="swiper-button-prev">
                 <img src={leftIcon} alt="Trước" className="w-5 h-5" />
               </div>
               <div className="swiper-button-next">
                 <img src={rightIcon} alt="Sau" className="w-5 h-5" />
               </div>
            </Swiper>
          </div>

          {/* Thumbnail swiper */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (thumbsSwiperRef.current && thumbsSwiperRef.current.swiper) {
                  thumbsSwiperRef.current.swiper.slidePrev();
                }
              }}
              className="flex-shrink-0 w-8 h-10 rounded-full shadow-lg flex items-center justify-center bg-white hover:bg-gray-50 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
              disabled={!canSlidePrev}
              type="button"
            >
              <img src={leftIcon} alt="Trái" className="w-5 h-5" />
            </button>

             <Swiper
               ref={thumbsSwiperRef}
               modules={[Navigation, Thumbs]}
               spaceBetween={8}
               slidesPerView="auto"
               watchSlidesProgress={true}
               allowTouchMove={true}
               grabCursor={true}
               freeMode={true}
               onSwiper={(swiper) => {
                 thumbsSwiperRef.current = swiper;
                 setThumbsSwiper(swiper);
                 setCanSlidePrev(swiper.allowSlidePrev);
                 setCanSlideNext(swiper.allowSlideNext);
               }}
               onSlideChange={(swiper) => {
                 setCanSlidePrev(swiper.allowSlidePrev);
                 setCanSlideNext(swiper.allowSlideNext);
               }}
               className="thumbs-swiper flex-1"
             >
              {product.image.map((image, index) => (
                <SwiperSlide 
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handleThumbnailClick(index)}
                >
                  <div className="w-full h-full p-1">
                    <img
                      src={image}
                      alt={`${product.name} – ảnh nhỏ ${index + 1}`}
                      className="w-full h-full object-cover rounded-md border border-gray-200 transition-all duration-200 hover:border-black"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              onClick={() => {
                if (thumbsSwiperRef.current && thumbsSwiperRef.current.swiper) {
                  thumbsSwiperRef.current.swiper.slideNext();
                }
              }}
              className="flex-shrink-0 w-8 h-10 rounded-full shadow-lg flex items-center justify-center bg-white hover:bg-gray-50 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
              disabled={!canSlideNext}
              type="button"
            >
              <img src={rightIcon} alt="Phải" className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Product Info */}
        <div className="flex-1">
          <p className="font-montserrat text-sm uppercase tracking-[0.2em] text-gray-500">{product.brand}</p>
          <h1 className="font-montserrat text-2xl md:text-3xl font-bold mt-3">{product.name}</h1>

          <div className="mt-8 border border-gray-200 bg-[#f8fafc] p-5 sm:p-6">
            <p className="font-montserrat font-semibold text-lg">Nhận báo giá theo nhu cầu</p>
            <p className="font-montserrat text-gray-600 mt-2 leading-7">
              Sản phẩm được tư vấn theo cấu hình và số lượng thực tế. Để nhận báo giá chính xác,
              vui lòng liên hệ đội ngũ của chúng tôi.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://zalo.me/84966148632"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 min-w-[220px] bg-white text-[#0068ff] font-semibold py-3 px-8 border border-gray-200 shadow-lg hover:scale-105 transition"
              >
                <img src="/icon_zalo.png" alt="Zalo" className="w-5 h-5 object-contain" />
                <span>Liên hệ qua Zalo</span>
              </a>
              <a
                href="tel:1900-0000"
                className="inline-flex items-center justify-center min-w-[220px] bg-[#ef4444] text-white font-semibold py-3 px-8 border border-[#ef4444] shadow-lg hover:bg-[#dc2626] hover:border-[#dc2626] hover:scale-105 transition"
              >
                Gọi tư vấn nhanh
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border-y border-gray-200 py-8">
        <div className="max-w-4xl">
          <h2 className="font-montserrat text-2xl font-semibold mt-2">Chi tiết sản phẩm</h2>
          <p className="font-montserrat text-gray-700 leading-8 mt-4 whitespace-pre-line">
            {product.detailedDescription || "Đang cập nhật mô tả cho sản phẩm này."}
          </p>
        </div>
      </div>

      <RelatedProduct
        currentProductId={product._id}
        brand={product.brand}
      /> 

    </div>
  );
};

export default Product;