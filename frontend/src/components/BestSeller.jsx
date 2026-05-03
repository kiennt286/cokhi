import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem';

const BestSeller = () => {
    const { products } = useContext(ShopContext) 
    const [bestSeller, setBestSeller] = useState([]);
    
    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller));
        setBestSeller(bestProduct.slice(0,5));
    }, [products])

    return (
        <div className='my-10'>
            <div className='text-start py-8 text-3xl'>
                <h2 className="font-gunken text-4xl font-bold ">
                    Bán chạy
                </h2>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestSeller.map((item, index)=>(
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} brand={item.brand} brandSlug={item.brandSlug} slug={item.slug} />
                    ))
                }
            </div>
        </div>
  )
}

export default BestSeller
