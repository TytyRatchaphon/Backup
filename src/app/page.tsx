
import Link from 'next/link';
import * as React from 'react';
export default function Home() {
  return (
    <div>
      <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-3" style={{backgroundColor: '#EAF8EE'}}>
        <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center justify-between w-full">
            <div>
              <a style={{color: '#3EBE71'}} className="flex-none text-2xl font-bold focus:outline-none focus:opacity-80" href="#" aria-label="Brand">
                GoMed
              </a>
            </div>
            <div>
              <Link style={{fontWeight: 'bold'}} className="font-medium text-gray-600 hover:text-black-400 focus:outline-none focus:text-gray-400" href="/SignIn">Sign In</Link>
            </div>
          </div>
        </nav>
      </header>

      <div style={{backgroundColor: '#EAF8EE', borderRadius: '0 0 100px 100px', borderBottom: '1px solid #3EBE71', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className="max-w-5xl mx-auto px-4 xl:px-0 pt-24 lg:pt-32 pb-24">
          <h1 className="font-semibold text-[#3EBE71] text-5xl md:text-6xl">
            <span className="text-black ">Preline Agency:</span> Transforming ideas into reality
          </h1>
          <div className="max-w-4xl">
            <p className="mt-5 text-neutral-400 text-lg">
              It is a creative hub where imagination meets craftsmanship to transform ideas into tangible realities. At Preline Agency, we specialize in turning conceptual visions into concrete forms, whether it be through design, artistry, or technological innovation.
            </p>
          </div>
        </div>
      </div>

      <section className="bg-white ml-10 mr-10">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <img className="w-[1000px] h-[400px] object-cover" src="/Customer.jpg" alt=""/>
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">Sign Up as Customer</h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg">Flowbite helps you connect with friends and communities of people who share your interests. Connecting with your friends and family as well as discovering new ones is easy with features like Groups.</p>
            <Link className='bg-blue-600 text-white font-semibold px-10 py-1 rounded-lg' href='/customer/SignUp'>Sign Up</Link>
          </div>
        </div>
      </section>

      <section className="bg-white ml-10 mr-10">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <img className="w-[1000px] h-[400px] object-cover" src="/Pharmacist.jpg" alt=""/>
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">Sign Up as Pharmacy</h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg">Flowbite helps you connect with friends and communities of people who share your interests. Connecting with your friends and family as well as discovering new ones is easy with features like Groups.</p>
            <Link className='bg-blue-600 text-white font-semibold px-10 py-1 rounded-lg' href='#'>Sign Up</Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#3EBE71] h-[100px] flex justify-center items-center">
        <span className="block text-sm text-white">© 2025 All Rights Reserved</span>
      </footer>
    </div>
  );
}
