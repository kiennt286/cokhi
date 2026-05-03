import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import BreadcrumbBar from '../components/BreadcrumbBar';

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000000000]); // Min-Max giá VNĐ

  // State để fade-in
  const [visible, setVisible] = useState(false);

  const toggleCategory = (e) => {
    const value = e.target.value;
    if (categoryFilter.includes(value)) {
      setCategoryFilter(prev => prev.filter(item => item !== value));
    } else {
      setCategoryFilter(prev => [...prev, value]);
    }
  };

  const toggleBrand = (e) => {
    const value = e.target.value;
    setBrandFilter(prev => prev.includes(value) ? prev.filter(i => i !== value) : [...prev, value]);
  };

  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    setPriceRange([priceRange[0], value]);
  };

  const filteredProducts = products.filter(product => 
    (categoryFilter.length === 0 || categoryFilter.includes(product.category)) &&
    (brandFilter.length === 0 || brandFilter.includes(product.brand)) &&
    product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const brandCounts = products.reduce((acc, product) => {
    acc[product.brand] = (acc[product.brand] || 0) + 1;
    return acc;
  }, {});

  // Bật fade-in khi filter hoặc products thay đổi
  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, [categoryFilter, brandFilter, priceRange, products]);

  return (
    <div className={`px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] pt-10 border-t border-gray-300 transition-opacity duration-300 ease-in ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10">

      {/* Filter Option */}
      <div className='min-w-70'>
        <p 
          className='font-montserrat my-2 text-xl flex items-center cursor-pointer gap-2'
          onClick={() => setShowFilter(!showFilter)}
        >
          Bộ lọc
        </p>

        <div className={`py-3 ${showFilter ? '' : 'hidden'} sm:block`}>
          {/* Category */}
          <p className='mb-3 text-sm font-medium'>Danh mục</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {["Nam", "Nữ"].map(cat => (
              <p className='flex gap-2' key={cat}>
                <input 
                  className='w-5' 
                  type="checkbox" 
                  value={cat} 
                  checked={categoryFilter.includes(cat)}
                  onChange={toggleCategory} 
                /> 
                {cat} ({categoryCounts[cat] || 0})
              </p>
            ))}
          </div>

          {/* Brand */}
          <p className='mb-3 mt-4 text-sm font-medium'>Thương hiệu</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {Object.keys(brandCounts).map(brand => (
              <p className='flex gap-2' key={brand}>
                <input 
                  className='w-5'
                  type="checkbox" 
                  value={brand} 
                  checked={brandFilter.includes(brand)}
                  onChange={toggleBrand} 
                /> 
                {brand} ({brandCounts[brand]})
              </p>
            ))}
          </div>

          {/* Price */}
          <p className='mb-3 mt-4 text-sm font-medium'>Giá (0 - 2.000.000.000₫)</p>
          <input
            type="range"
            min="0"
            max="2000000000"
            step="20000"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="w-full"
          />
          <p className='text-sm mt-1'>Tối đa: {priceRange[1].toLocaleString('vi-VN')}₫</p>
        </div>
      </div>

      {/* Product list */}
      <div>
        <div className="mb-3">
          <BreadcrumbBar
            items={[
              { label: 'Trang chủ', to: '/' },
              { label: 'Bộ sưu tập', to: '/collection' },
              ...(categoryFilter.length > 0 ? [{ label: categoryFilter.join(', ') }] : []),
            ]}
          />
        </div>

        {/* Product count */}
        <p className="font-montserrat mb-4 text-lg">
          Sản phẩm
        </p>

        {/* Product grid */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filteredProducts.map(product => (
            <ProductItem
              key={product._id}
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              brand={product.brand}
              brandSlug={product.brandSlug}
              slug={product.slug}
            />
          ))}
        </div>
      </div>

      </div>

    </div>
  );
};

export default Collection;
