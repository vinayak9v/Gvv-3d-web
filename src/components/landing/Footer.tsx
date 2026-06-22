import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col font-sans mt-auto">

      <div className="w-full bg-[#020b3a] py-16 px-6 md:px-12 flex justify-center">
        <div className="max-w-7xl w-full grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-8">

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center p-1 shrink-0 overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Garima Vidhya Vihar Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-white text-lg font-bold leading-tight tracking-wide">
                  GARIMA VIDHYA VIHAR
                </h3>
                <p className="text-gray-300 text-[10px] tracking-wider mt-0.5">
                  SR. SECONDARY SCHOOL
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <div className="flex flex-col">
            <h4 className="text-white text-lg font-semibold mb-6">Our Links</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/admission" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Admission
                </Link>
              </li>
              <li>
                <Link href="/academic" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Curriculum
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="text-white text-lg font-semibold mb-6">What We Offer</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Math
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Science
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="text-white text-lg font-semibold mb-6">Get In Touch</h4>
            <ul className="flex flex-col gap-4">
              <li className="text-gray-300 text-sm">1232555555</li>
              <li className="text-gray-300 text-sm">companyname@gmail.com</li>
              <li className="text-gray-300 text-sm">Writing</li>
            </ul>
          </div>

        </div>
      </div>

      <div className="w-full bg-[#0c1ca3] py-5 px-4 text-center">
        <p className="text-gray-200 text-sm">
          Garima Vidhya Mandir &copy; 2026 All Right Reserve
        </p>
      </div>

    </footer>
  );
}
