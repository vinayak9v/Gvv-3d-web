import React from 'react';

export default function ContactUs() {
  return (
    <section className="w-full py-20 px-4 flex justify-center bg-white font-sans">
      <div className="max-w-5xl w-full flex flex-col-reverse md:flex-row items-center md:items-start gap-12 md:gap-20">

        <div className="w-full md:w-3/5">
          <form className="w-full flex flex-col gap-5">

            <div className="flex flex-col sm:flex-row gap-5">
              <input
                type="text"
                placeholder="First name"
                className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors placeholder:text-gray-400"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors placeholder:text-gray-400"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors placeholder:text-gray-400"
              />
            </div>

            <textarea
              placeholder="Your message"
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors placeholder:text-gray-400 resize-none"
            ></textarea>

            <button
              type="submit"
              className="w-full mt-2 bg-[#eed270] text-black text-sm font-medium py-3.5 rounded-md border-b-[3px] border-[#2e2e2e] hover:bg-[#e4c865] active:border-b-0 active:translate-y-[3px] transition-all"
            >
              Submit
            </button>

          </form>
        </div>

        <div className="w-full md:w-2/5 md:pt-16 text-center md:text-left">
          <h2 className="text-3xl md:text-[32px] font-bold text-black mb-4 tracking-tight">
            Contact Us
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

      </div>
    </section>
  );
}
