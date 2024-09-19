"use client"
import React, { useEffect, useState } from 'react'
import BlogCard from '../UIElements/Card/BlogCard'
import axios from 'axios'
import { BlogCardType } from '../utils/Interfaces'

const BlogSection = () => {
    const  [blogPosts, setBlogPosts] = useState([])
    const fetchBlogs  = async () => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL + "/api";
            const response = await axios.get(url);
            setBlogPosts(response.data.blogs)  
          } catch (error) {
           console.log(error);   
          }   
    }

useEffect(()=>{
    fetchBlogs()
},[])

if(blogPosts){
    return (
        <div className="max-w-72 mx-auto grid grid-cols-1 gap-4 mt-5 sm:max-w-[680px] sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 sm:mt-8 lg:max-w-full lg:grid-cols-4">
    { blogPosts.map((blog: BlogCardType) => (
        <BlogCard key={blog.id} blog={blog} />
    ))}
 </div>
  )
}
}

export default BlogSection