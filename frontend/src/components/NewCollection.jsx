import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import leftIcon from '../assets/left.png';
import rightIcon from '../assets/right.png';

const NewCollection = () => {
  const { products } = useContext(ShopContext);
  const [newCollections, setNewCollection] = useState([]);
  const [page, setPage] = useState(0);
  const perPage = 5;

  useEffect(() => {
    setNewCollection(products);
    setPage(0);
  }, [products]);

  // Chunk products into pages for horizontal sliding
  const pages = React.useMemo(() => {
    const chunks = [];
    for (let i = 0; i < newCollections.length; i += perPage) {
      chunks.push(newCollections.slice(i, i + perPage));
    }
    return chunks;
  }, [newCollections]);

  const totalPages = pages.length;

  const nextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const canGoNext = page < totalPages - 1;
  const canGoPrev = page > 0;

  // Smooth translateX based on current page
  const sliderStyle = {
    transform: `translateX(-${page * 100}%)`
  };

  return (
    <div className='my-10'>
      <div className='text-start py-8'>
    <h2 className="font-gunken text-4xl font-bold">
        <span className="block">MỚI</span>
        <span className="flex items-baseline justify-between">
        <span>BỘ SƯU TẬP</span>
        <span className="text-4xl font-bold">- 2025 -</span>
        </span>
    </h2>
    </div>

      {/* Slider */}
      <div className='overflow-hidden'>
        <div className='flex transition-transform duration-500 ease-out' style={sliderStyle}>
          {pages.map((items, idx) => (
            <div key={idx} className='min-w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
              {items.map((item) => (
                <ProductItem
                  key={item._id}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  brand={item.brand}
                  brandSlug={item.brandSlug}
                  slug={item.slug}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Buttons */}
      <div className="flex gap-2 mt-6 justify-center">
        <button
          onClick={prevPage}
          disabled={!canGoPrev}
          className={`w-12 h-12 border-2 border-gray-300 flex items-center justify-center transition-all ${
            canGoPrev ? "hover:border-gray-400 hover:bg-gray-50 cursor-pointer" : "opacity-50 cursor-not-allowed"
          }`}
        >
          <img src={leftIcon} alt="Trước" width={16} height={16} />
        </button>

        <button
          onClick={nextPage}
          disabled={!canGoNext}
          className={`w-12 h-12 border-2 border-gray-300 flex items-center justify-center transition-all ${
            canGoNext ? "hover:border-gray-400 hover:bg-gray-50 cursor-pointer" : "opacity-50 cursor-not-allowed"
          }`}
        >
          <img src={rightIcon} alt="Sau" width={16} height={16} />
        </button>
      </div>
    </div>
  );
};

export default NewCollection;
