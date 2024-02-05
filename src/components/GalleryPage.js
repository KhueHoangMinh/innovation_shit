import React from 'react'
import { List } from './common/List'
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import { backend } from '../constants';

// page to list the products
function GalleryPage() {

  // store products from server
  const [highlightCategories, setHighlightCategories] = useState([])
  const [trending, setTrending] = useState([])

  useEffect(()=>{
    // get trending categories from server
    Axios.get(backend+'/api/trending').then(res=>{
      setTrending(res.data)
    })
    
    // get product lists from server
    Axios.get(backend+'/api/home').then(res=>{
      setHighlightCategories(res.data)
    })
  },[])
  return (
    <>
    {
      highlightCategories && 
      <>
        {highlightCategories.categories && highlightCategories.categories.map((category) => (
          <List title={category.name} link={category.name} items={category.list}/>
        ))}
      </>
    }
    </>
  )
}

export default GalleryPage