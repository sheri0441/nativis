"use client"
import React, { useEffect, useState } from 'react'
import BlogCard from '../UIElements/Card/BlogCard'
import axios from 'axios'
import { BlogCardType, ProductCardType } from '../utils/Interfaces'
import ProductCardGrid from '../UIElements/Miscellaneous/ProductCardGrid'
import ProductCard from '../UIElements/Card/ProductCard'

const ProductSection = () => {
    const  [products, setProducts] = useState([])
    const fetchBlogs  = async () => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL + "/api";
            const response = await axios.get(url);
            setProducts(response.data.products)  
          } catch (error) {
           console.log(error);   
          }   
    }

useEffect(()=>{
    fetchBlogs()
},[])

if(products){
    return (
        <ProductCardGrid>
        {products.map((product: ProductCardType, index: number) => (
          <ProductCard
            key={product.id}
            product={product}
            extraStyle={
              index + 1 === 4 ? "sm:col-start-2 lg:col-auto" : ""
            }
          />))}
    </ProductCardGrid>

  )
}
}

export default ProductSection