import React from 'react'
import Header from './component/Header'

export default function SidebarLess() {
  return (
    <div>
        <div className="header-warp fixed top-0 left-0 w-full bg-white text-gray z-50 shadow-md backdrop-blur-sm">
            <Header></Header>   
        </div>
        <div className=" mt-20 container w-8/12 mx-auto p-10 bg-white text-gray shadow-md">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, velit?
        </div>
              
    </div>
  )
}
