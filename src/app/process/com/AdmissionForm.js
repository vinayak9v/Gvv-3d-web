"use client";
import React, { useState } from 'react';

export default function AdmissionForm() {
  // Initialize state for all form fields
  const [studentName, setStudentName] = useState("");
  const [classApplying, setClassApplying] = useState("");
  const [parentName, setParentName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const documents = [
    { name: "Birth Certificate", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" /> },
    { name: "Aadhaar Card", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" /> },
    { name: "Previous School Report Card", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /> },
    { name: "Transfer Certificate (If applicable)", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /> },
    { name: "Passport Size Photographs", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /> },
    { name: "Parent ID Proof", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /> }
  ];

  // Added 'e' parameter to the function definition here
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/admission-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName,
          parentName,
          classApplying,
          mobileNumber,
          email,
          message,
        }),
      });

      const result = await response.json();
      console.log(result);
      
      // Optional: Clear form inputs after successful submission
      if(response.ok) {
         setStudentName("");
         setParentName("");
         setClassApplying("");
         setMobileNumber("");
         setEmail("");
         setMessage("");
         alert("Enquiry submitted successfully!");
      }
      
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background subtle elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-100/50 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
        
        {/* ============================== */}
        {/* LEFT PANEL: REQUIRED DOCUMENTS */}
        {/* ============================== */}
        <div className="relative bg-white border border-slate-100 rounded-2xl p-8 sm:p-10 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          
          {/* Faint Background Watermark Illustration (Light Theme) */}
          <div className="absolute right-[-20px] top-[20%] text-slate-50 pointer-events-none transform -rotate-12">
            <svg width="350" height="350" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6H12L10 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6ZM20 18H4V8H20V18Z" />
            </svg>
          </div>

          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
              </svg>
            </div>
            <div>
              <h2 className="text-[#020B3D] text-2xl font-extrabold tracking-tight">Required Documents</h2>
              <div className="w-12 h-[3px] bg-[#E9C84A] mt-2 rounded-full"></div>
            </div>
          </div>

          {/* Document List */}
          <ul className="space-y-4 relative z-10">
            {documents.map((doc, index) => (
              <li 
                key={index} 
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors duration-300 group cursor-default border border-transparent hover:border-slate-100"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50/50 text-blue-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    {doc.icon}
                  </svg>
                </div>
                <span className="text-slate-700 text-[15px] font-medium group-hover:text-[#020B3D] transition-colors">{doc.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ============================== */}
        {/* RIGHT PANEL: ADMISSION FORM    */}
        {/* ============================== */}
        <div className="bg-white border border-slate-100 rounded-2xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#E9C84A]/10 text-[#d6b438]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </div>
            <div>
              <h2 className="text-[#020B3D] text-2xl font-extrabold tracking-tight">Admission Enquiry</h2>
              <div className="w-12 h-[3px] bg-[#E9C84A] mt-2 rounded-full"></div>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Student Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-600 ml-1">Student Name</label>
                <input 
                  type="text" 
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter full name" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                  required
                />
              </div>
              
              {/* Class Applying For Dropdown */}
              <div className="space-y-1.5 relative">
                <label className="text-sm font-semibold text-slate-600 ml-1">Class Applying For</label>
                <div className="relative">
                  <select 
                    value={classApplying}
                    onChange={(e) => setClassApplying(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-300"
                    required
                  >
                    <option value="" disabled className="text-slate-400">Select class</option>
                    <option value="nursery">Nursery</option>
                    <option value="kg">KG</option>
                    <option value="1">Class 1</option>
                    <option value="2">Class 2</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Parent Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-600 ml-1">Parent Name</label>
                <input 
                  type="text" 
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Enter parent's name" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                  required
                />
              </div>

              {/* Mobile Number */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-600 ml-1">Mobile Number</label>
                <input 
                  type="tel" 
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="+91 XXXXX XXXXX" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-600 ml-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                required
              />
            </div>

            {/* Message Textarea */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-600 ml-1">Message (Optional)</label>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your query here..." 
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full mt-4 bg-[#020B3D] hover:bg-blue-900 text-white font-bold text-lg rounded-xl px-4 py-4 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              Submit Enquiry
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}