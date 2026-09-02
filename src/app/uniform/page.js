import React from 'react'
import GVVUniformBanner from './com/GVVUniformBanner'
import Navbar from '@/components/landing/Navbar'
import UniformGuidelines  from './com/UniformGuidelines'
import UniformReels from './com/UniformReels'
import Footer from '@/components/landing/Footer'

function page() {
  return (
    <div>
      <Navbar/>
      <GVVUniformBanner/>
      <UniformReels/>
      <UniformGuidelines/>
      <Footer/>
    </div>
  )
}

export default page
