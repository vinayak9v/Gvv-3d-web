import Hero from './com/Hero'
import AdmissionProcess from './com/AdmissionProcess'
import AdmissionForm from './com/AdmissionForm'
import OurSchool from './com/OurSchool'

import React from 'react'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'

function page() {
  return (
    <div>
        <Navbar/>
      <Hero/>
      <AdmissionProcess/>
      <AdmissionForm/>
      <OurSchool/>
      <Footer/>
    </div>
  )
}

export default page
