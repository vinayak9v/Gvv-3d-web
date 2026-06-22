import Hero from './com/Hero'
import FeeTable from './com/FeeTable'
import React from 'react'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'

function page() {
  return (
    <div>
        <Navbar/>   
      <Hero/>
      <FeeTable/>
      <Footer/>
    </div>
  )
}

export default page
