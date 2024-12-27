
import Link from 'next/link';
import * as React from 'react';
export default function Home() {
  return (
    <div>
      <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-3" style={{backgroundColor: '#EAF8EE'}}>
        <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center justify-between">
            <a style={{color: '#3EBE71'}} className="flex-none text-2xl font-bold focus:outline-none focus:opacity-80" href="#" aria-label="Brand">
              GoMed
            </a>
            <a href="" className="px-10 text-gray-500">Products</a>
            <div className="sm:hidden">
              <button type="button" className="hs-collapse-toggle relative size-7 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" id="hs-navbar-example-collapse" aria-expanded="false" aria-controls="hs-navbar-example" aria-label="Toggle navigation" data-hs-collapse="#hs-navbar-example">
                <svg className="hs-collapse-open:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
                <svg className="hs-collapse-open:block hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                <span className="sr-only">Toggle navigation</span>
              </button>
            </div>
          </div>
          <div id="hs-navbar-example" className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block" aria-labelledby="hs-navbar-example-collapse">
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
              <Link style={{color: '#3EBE71',fontWeight: 'bold'}} className="font-medium focus:outline-none" href="/signUp" aria-current="page">Register</Link>
              <Link style={{fontWeight: 'bold'}} className="font-medium text-gray-600 hover:text-black-400 focus:outline-none focus:text-gray-400" href="/signIn">Sign In</Link>
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

            <form className="max-w-md mx-auto">
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              </div>
            </form>
          </div>
      </div>

      <section className="py-8 antialiased md:py-16 min-h-[500px]">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
            <h2 className="text-xl font-semibold text-[#3EBE71] sm:text-2xl">Shop by category</h2>

            <a href="#" title="" className="flex items-center text-base font-medium text-primary-700 hover:underline">
              See more categories
              <svg className="ms-1 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
              </svg>
            </a>
          </div>

          {/* Category Button */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <a href="#" className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50">
              <span className="text-sm font-medium text-gray-900">Category 1</span>
            </a>
          </div>
        </div>
      </section>

      <section className='bg-[#F9F9F9] h-[770px] grid justify-center items-center py-20'>
        <div className='text-[#3EBE71] text-center font-bold text-[40px] h-0'>Drug Store Near Me</div>
        <div className='relative flex flex-wrap grid-cols-4 md:justify-center md:flex-nowrap justify-center items-center gap-4'>
          <a href="#">
            <div className="w-[275px] overflow-hidden rounded-lg shadow transition hover:shadow-lg border border-[#3EBE71]">
              <div className='h-56 w-full object-cover flex justify-center items-center bg-white'>
                <img
                  alt=""
                  src="store.png"
                  className="h-24 w-24"
                />
              </div>

              <div className="pl-5 grid h-[76px] bg-[#3EBE71] items-center">
                <div className="text-lg font-semibold text-white h-0">Drug Store Name</div>
                <div className="text-sm text-white">0.0 km.</div>
              </div>
            </div>
          </a>
        </div>
      </section>

      <div className='h-[770px] grid justify-center items-center py-20'>
        <div className='text-[#3EBE71] text-center font-bold text-[40px] h-0 mb-10'>Best Seller</div>
        <div className='relative grid grid-cols-2 justify-center items-center md:justify-center md:grid-cols-4 gap-10 mt-10'>
          <Link href="/productDetail">
            <div className="w-[300px] overflow-hidden rounded-lg shadow transition hover:shadow-lg border border-gray-200">
              <div style={{marginTop: '10px', marginLeft: '10px', marginRight: '10px'}}>
                <div className='h-[250px] w-full object-cover flex justify-center items-center bg-white border border-gray-100 rounded-lg'>
                    <img src="med2.png" alt="" className='h-48 w-48'/>
                </div>
              </div>
              <div className='pl-5 pr-5 grid h-[100px] items-center pb-2'>
                <p className="text-lg font-medium text-gray-900 h-0">Product Name</p>
                <div className='flex justify-between items-center pt-5'>
                  <p className="text-sm text-gray-400 ">Category</p>
                  <p className="text-sm text-[#3EBE71] font-semibold">00.00 Baht</p>
                </div>
                  <button className='h-9 rounded-2xl bg-[#3EBE71] text-white font-bold'>Add to Cart</button>
                </div>
            </div>
          </Link>
        </div>
      </div>

      <footer className="bg-[#3EBE71] h-[100px] flex justify-center items-center">
        <span className="block text-sm text-white">© 2025 All Rights Reserved</span>
      </footer>


    </div>
  );
}
