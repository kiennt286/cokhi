import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { brandLogos } from '../assets/assets';

const BrandShowcase = () => {
  const { products } = useContext(ShopContext);
  
  const brands = [...new Set(products.map(p => p.brand))];

  return (
    <section className="py-16 bg-white">
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">
        <div className="text-center mb-12">
          <p className="font-montserrat text-sm tracking-[0.2em] text-[#ED3524] mb-2">ĐỐI TÁC & THƯƠNG HIỆU</p>
          <h2 className="font-montserrat font-extrabold text-4xl text-gray-900 mb-4">
            Thương Hiệu Cung Ứng
          </h2>
          <p className="font-montserrat text-sm text-gray-600">
            Danh mục thương hiệu dao cụ và vật tư cơ khí đang được chúng tôi phân phối.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 items-center">
          {brands.map((brand) => (
            <Link
              key={brand}
              to="/collection"
              className="group p-5 text-center border border-gray-200 bg-[#f8fafc] hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {brandLogos[brand] ? (
                <img
                  src={brandLogos[brand]}
                  alt={brand}
                  className="h-12 mx-auto object-contain"
                />
              ) : (
                <div className="text-lg font-bold text-gray-900 group-hover:text-[#ED3524] transition-colors">
                  {brand}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;

