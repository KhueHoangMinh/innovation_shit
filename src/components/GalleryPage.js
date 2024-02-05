import React from 'react'
import { List } from './common/List'
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import { backend } from '../constants';

function GalleryPage() {
  const [highlightCategories, setHighlightCategories] = useState([])
  const [trending, setTrending] = useState([])

  useEffect(()=>{
    Axios.get(backend+'/api/trending').then(res=>{
      setTrending(res.data)
    })
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