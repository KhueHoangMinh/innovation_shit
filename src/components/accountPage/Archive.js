import React from 'react'
import { List } from '../common/List';

function Archive() {
    return (
        <>
          <List title={"Purchased"} link={''} items={[...Array(20)]}/>
        </>
    )
    }

export default Archive