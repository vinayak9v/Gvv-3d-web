import React from 'react'
import GVVUniformBanner from './com/GVVUniformBanner'
import Navbar from '@/components/landing/Navbar'
import UniformGuidelines  from './com/UniformGuidelines'
import Footer from '@/components/landing/Footer'

function page() {
  return (
    <div>
      <Navbar/>
      <GVVUniformBanner/>
      <UniformGuidelines/>
      <Footer/>
    </div>
  )
}

export default page
