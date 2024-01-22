import styled from '@emotion/styled'
import { TrainSharp } from '@mui/icons-material'
import React, {createContext, useEffect, useRef, useState} from 'react'

const TransitionContext = createContext(
    async (callback) => {
        await callback()
    }
)

function TransitionProvider(props) {
    const wrapperRef = useRef(null)
    
    const Transition = (callback) => {
        // setBrightness(0)
        wrapperRef.current.style.filter = "brightness(0)"
        setTimeout(async ()=>{
            await callback()
            wrapperRef.current.style.filter = "brightness(1)"
        },props.duration)
    }

    useEffect(()=>{
        if(wrapperRef.current.style.filter && wrapperRef.current.style.filter == "brightness(0)") {
            wrapperRef.current.style.filter = "brightness(1)"
        }
    },[])

    useEffect(()=>{
        if(wrapperRef.current.style.filter && wrapperRef.current.style.filter == "brightness(0)") {
            wrapperRef.current.style.filter = "brightness(1)"
        }
    },[props.children])

    const TransitionWrapper = styled.div`
        width: 100%;
        height: 100%;
        position: relative;

        -webkit-transition: ${props.duration + "ms"} -webkit-filter ease-in-out;
        -moz-transition: ${props.duration + "ms"} -moz-filter ease-in-out;
        -moz-transition: ${props.duration + "ms"} filter ease-in-out;
        -ms-transition: ${props.duration + "ms"} -ms-filter ease-in-out;
        -o-transition: ${props.duration + "ms"} -o-filter ease-in-out;
        transition: ${props.duration + "ms"} filter ease-in-out, ${props.duration + "ms"} -webkit-filter ease-in-out;

        /* -webkit-filter: brightness(0);
        -moz-filter: brightness(0);
        -ms-filter: brightness(0);
        -o-filter: brightness(0);
        filter: brightness(0); */
    `

    return (
        <TransitionContext.Provider value={Transition}>
            <TransitionWrapper ref={wrapperRef}>
                {props.children}
            </TransitionWrapper>
        </TransitionContext.Provider>
    )
}

export default TransitionProvider
export {TransitionContext}