import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { collectionGroups } from '../assets/assets';

const ProductItem = ({ image, name, price, brand, brandSlug, slug }) => {
  const { formatPrice } = useContext(ShopContext);
  const formattedPrice = formatPrice(price);

  const src = image && image[0] ? image[0] : collectionGroups[0];
  const routeBrand = brandSlug || String(brand || "").toLowerCase();

  return (
    <Link
      className="font-montserrat relative text-gray-700 cursor-pointer block"
      to={`/${routeBrand}/${slug}`}
    >
      <div className="overflow-hidden relative">
        <img
          className="w-full h-full object-cover transform transition-transform duration-500 "
          src={src}
          alt={name}
        />
      </div>

      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-bold">{formattedPrice}</p>
    </Link>
  );
};

export default ProductItem;
