import React, { createContext, useState } from 'react'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

const ScrollContext = createContext({
    scrollY: 0
})

function ScrollWrapper(props) {
    const [scrollY, setScrollY] = useState(0)

  
    const onScroll = (e) => {
      const inspecting = e
      .elements().scrollOffsetElement.scrollTop
      setScrollY(inspecting)
    }
  return (
    <OverlayScrollbarsComponent defer options={{
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