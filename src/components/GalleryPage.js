import React from 'react'
import { List } from './common/List'

function GalleryPage() {
  return (
    <>
      <List title={"Category 1"} link={''} items={[...Array(15)]}/>
      <List title={"Category 1"} link={''} items={[...Array(11)]}/>
      <List title={"Category 1"} link={''} items={[...Array(8)]}/>
      <List title={"Category 1"} link={''} items={[...Array(6)]}/>
      <List title={"Category 1"} link={''} items={[...Array(12)]}/>
    </>
  )
}

export default GalleryPage