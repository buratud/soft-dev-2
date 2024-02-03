'use client'
import React from 'react'; 
import ReactStars from 'react-stars'

export default function StarRating(){ 
  return ( 
    <div> 
      <ReactStars 
        count={5} 
        size={24} 
        color2={'#C10206'} /> 
    </div> 
  ) 
} 