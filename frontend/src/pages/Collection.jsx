import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import BreadcrumbBar from '../components/BreadcrumbBar';

const Collection = () => {
  const { products } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);

  const [visible, setVisible] = useState(false);

  // Toggle brand
  const toggleBrand = (e) => {
    const value = e.target.value;
    setBrandFilter(prev =>
      prev.includes(value)
        ? prev.filter(i => i !== value)
        : [...prev, value]
    );
  };

  // Toggle category
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategoryFilter(prev =>
      prev.includes(value)
        ? prev.filter(i => i !== value)
        : [...prev, value]
    );
  };

  // FILTER PRODUCTS
  const filteredProducts = products.filter(product =>
    (categoryFilter.length === 0 || categoryFilter.includes(product.category)) &&
    (brandFilter.length === 0 || brandFilter.includes(product.brand))
  );

  // COUNT CATEGORY
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  // COUNT BRAND
  const brandCounts = products.reduce((acc, product) => {
    acc[product.brand] = (acc[product.brand] || 0) + 1;
    return acc;
  }, {});

  // Fade effect
  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, [categoryFilter, brandFilter, products]);

  return (
    <div className={`px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] pt-10 border-t border-gray-300 transition-opacity duration-300 ease-in ${visible ? 'opacity-100' : 'opacity-0'}`}>

      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10">

        {/* LEFT FILTER */}
        <div className='min-w-70'>

          <p
            className='font-montserrat text-xl font-bold flex items-center cursor-pointer gap-2'
            onClick={() => setShowFilter(!showFilter)}
          >
            Danh mục
          </p>
          <hr className='mt-1' />

          <div className={`py-3 ${showFilter ? '' : 'hidden'} sm:block`}>

            {/* CATEGORY GROUP */}
            <div className="mb-6">
              <p className='font-montserrat mb-3 text-sm font-bold uppercase tracking-wide text-gray-900'>
                Sản phẩm CNC
              </p>

              <div className='flex flex-col gap-2 text-sm text-gray-700'>
                {["Dao phay", "Dao tiện", "Mảnh chip", "Khoan", "Taro"].map(cat => (
                  <label key={cat} className='flex items-center gap-2 cursor-pointer'>
                    <input
                      type="checkbox"
                      className="w-4"
                      value={cat}
                      checked={categoryFilter.includes(cat)}
                      onChange={toggleCategory}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* BRAND GROUP */}
            <div>
              <p className='font-montserrat mb-3 text-sm font-bold uppercase tracking-wide text-gray-900'>
                Thương hiệu
              </p>

              <div className='flex flex-col gap-2 text-sm text-gray-700'>
                {Object.keys(brandCounts).map(brand => (
                  <label key={brand} className='flex items-center gap-2 cursor-pointer'>
                    <input
                      className='w-4'
                      type="checkbox"
                      value={brand}
                      checked={brandFilter.includes(brand)}
                      onChange={toggleBrand}
                    />
                    {brand} ({brandCounts[brand]})
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT PRODUCT LIST */}
        <div>

          {/* BREADCRUMB */}
          <div className="font-montserrat mb-3">
            <BreadcrumbBar
              items={[
                { label: 'Trang chủ', to: '/' },
                { label: 'Bộ sưu tập', to: '/collection' },
                ...(categoryFilter.length > 0
                  ? [{ label: categoryFilter.join(', ') }]
                  : []),
              ]}
            />
          </div>

          {/* TITLE */}
          <p className="font-montserrat mb-4 text-lg">
            Sản phẩm
          </p>

          {/* GRID */}
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