import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';

const RelatedProduct = ({ currentProductId, brand }) => {
  const { products } = useContext(ShopContext);
  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    // Lọc các sản phẩm cùng category, bỏ qua sản phẩm hiện tại
    const filtered = products.filter(
        item => item.brand === brand && item._id !== currentProductId
    );
    // Lấy tối đa 5 sản phẩm liên quan
    setRelatedProduct(filtered.slice(0, 5));
  }, [products, currentProductId, brand]);

  return (
    <div className='my-10'>
      <div className='text-start py-8'>
        <h2 className="font-gunken text-4xl font-bold">
          Sản phẩm liên quan
        </h2>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {relatedProduct.map((item) => (
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
    </div>
  );
};

export default RelatedProduct;
