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

const Product = () => {
  const { brand, slug } = useParams();
  const { addToCart, products } = useContext(ShopContext);

  // Refs
  const thumbsSwiperRef = useRef(null);
  const mainSwiperRef = useRef(null);

  // Find product using useMemo to avoid recalculation
  const product = useMemo(() => 
    products.find(p => p.slug === slug && p.brandSlug?.toLowerCase() === brand.toLowerCase()),
    [brand, slug, products]
  );

  // Core states
  const [activeTab, setActiveTab] = useState('additional');
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
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] border-t border-gray-300 pt-10">
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
          <h1 className="font-montserrat text-2xl font-bold mt-2">{product.name}</h1>
          <p className="font-montserrat mt-5 text-gray-600">{product.brand}</p>
          <p className="font-montserrat text-2xl mt-5 font-semibold text-primary">
            {product.price.toLocaleString()} VNĐ
          </p>

          <p className="font-montserrat mt-5 font-medium text-gray-500 md:w-4/5">{product.description}</p>

          <button
            className="mt-6 bg-[#000000] text-white font-semibold py-3 px-12 hover:bg-[#414141] transition-colors self-start cursor-pointer"
            onClick={() => addToCart(product._id)}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="font-montserrat mt-20 border-t border-b border-gray-300 -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[8vw]">
        <div className="flex gap-6 pt-8 text-xl justify-center">
          <button
            className={`cursor-pointer pb-2 font-semibold transition-colors ${activeTab === 'additional' ? 'text-black' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('additional')}
          >
            Thông Số Kỹ Thuật
          </button>
          <button
            className={`cursor-pointer pb-2 font-semibold transition-colors ${activeTab === 'reviews' ? 'text-black' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('reviews')}
          >
            {`Đánh giá [${product.reviews ?? 0}]`}
          </button>
        </div>

        <div className="py-8 text-sm px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">
          {activeTab === 'additional' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              <div className="space-y-2">
                {product.caseDiameter && product.caseThickness && (
                  <div className="border-b border-gray-300 pb-2 last:border-b-0">
                    <p className="font-semibold">Kích thước vỏ (Đường kính × Độ dày)</p>
                    <p>{product.caseDiameter} × {product.caseThickness} mm</p>
                  </div>
                )}
                {product.materials && (
                  <div className="border-b border-gray-300 pb-2 last:border-b-0">
                    <p className="font-semibold">Vật liệu</p>
                    <p>{product.materials}</p>
                  </div>
                )}
                {product.movement && (
                  <div className="border-b border-gray-300 pb-2 last:border-b-0">
                    <p className="font-semibold">Cấu trúc máy</p>
                    <p>{product.movement}</p>
                  </div>
                )}
                {product.warranty && (
                  <div className="border-b border-gray-300 pb-2 last:border-b-0">
                    <p className="font-semibold">Bảo hành</p>
                    <p>{product.warranty}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {product.stock && (
                  <div className="border-b border-gray-300 pb-2 last:border-b-0">
                    <p className="font-semibold">Trọng lượng</p>
                    <p>{product.stock} g</p>
                  </div>
                )}
            
                {product.waterResistance && (
                  <div className="border-b border-gray-300 pb-2 last:border-b-0">
                    <p className="font-semibold">Chống nước</p>
                    <p>{product.waterResistance}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="text-gray-600">
              Chưa có đánh giá cho sản phẩm này.
            </div>
          )}
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