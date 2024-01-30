import React, { createContext, useEffect, useRef, useState } from 'react'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useLocation } from 'react-router-dom';

const ScrollContext = createContext({
    scrollY: 0
})

function ScrollWrapper(props) {
    const [scrollY, setScrollY] = useState(0)
    const scrollRef = useRef(null)
    const location = useLocation()

    const scrollTo = (x, y) => {
      if(scrollRef.current.osInstance()) {
        scrollRef.current.osInstance().elements().scrollOffsetElement.scrollTop = x
        scrollRef.current.osInstance().elements().scrollOffsetElement.scrollLeft = y
      }
    }
  
    const onScroll = (e) => {
      const inspecting = e.elements().scrollOffsetElement.scrollTop
      setScrollY(inspecting)
    }

    useEffect(()=>{
      scrollTo(0,0)
    },[location])
  return (
    <OverlayScrollbarsComponent defer
      ref={scrollRef}
      options={{
      overflow: {
        x: 'hidden',
        y: 'scroll',
      },
      scrollbars: {
        theme: 'os-theme-light',
        visibility: 'auto',
        autoHide: 'never',
        autoHideDelay: 1300,
        autoHideSuspend: false,
        dragScroll: true,
        clickScroll: false,
        pointers: ['mouse', 'touch', 'pen'],
      },
    }} 
    events={{ scroll: onScroll }} style={{width: "100%", height: "100%"}}>
        <ScrollContext.Provider value={{scrollY: scrollY}}>
            {props.children}
        </ScrollContext.Provider>
    </OverlayScrollbarsComponent>
  )
}

export default ScrollWrapper
export {ScrollContext}