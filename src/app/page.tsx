
import Link from 'next/link';
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

      <div className='bg-[#EAF8EE] rounded-bl-3xl rounded-br-3xl h-[400px] flex justify-between items-center'>
        <div className="max-w-5xl mx-auto px-4 xl:px-0 pb-12">
          <div>
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
              <div className="mt-5 max-w-2xl text-center mx-auto">
                <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl">
                  GoMed:
                  <span className="text-[#3EBE71]">Your Trusted Online Pharmacy</span>
                </h1>
              </div>

              <div className="mt-5 max-w-3xl text-center mx-auto">
                <p className="text-lg text-gray-600">Effortlessly connect with quality pharmacies in your area. Whether you need expert advice from a pharmacist or the right medication for your needs, we're here for you anytime.</p>
                <p className='text-lg text-gray-600'>With comprehensive information and attentive care, your health is our priority.</p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* <div style={{backgroundColor: '#EAF8EE', borderRadius: '0 0 100px 100px', borderBottom: '1px solid #3EBE71', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className="max-w-5xl mx-auto px-4 xl:px-0 pt-24 lg:pt-32 pb-24">
          <h1 className="font-semibold text-[#3EBE71] text-5xl md:text-6xl">
            <span className="text-black ">GoMed: </span> Your Trusted Online Pharmacy
          </h1>
          <div className="max-w-4xl">
            <p className="mt-5 text-neutral-400 text-lg">
            Effortlessly connect with quality pharmacies in your area. Whether you need expert advice from a pharmacist or the right medication for your needs, we're here for you anytime. With comprehensive information and attentive care, your health is our priority.
            </p>
          </div>
        </div>
      </div> */}

      <section className="bg-white ml-10 mr-10">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <img className="w-[1000px] h-[400px] object-cover" src="/Customer.jpg" alt=""/>
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">Sign Up as Customer</h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg">Easily access various pharmacies in your area. Purchase medications and consult with professional pharmacists anytime through real-time chat.</p>
            <Link className='bg-blue-600 text-white font-semibold px-10 py-1 rounded-lg' href='/customer/SignUp'>Sign Up</Link>
          </div>
        </div>
      </section>

      <section className="bg-white ml-10 mr-10">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <img className="w-[1000px] h-[400px] object-cover" src="/Pharmacist.jpg" alt=""/>
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">Sign Up as Pharmacy</h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg">Join our online pharmacy network to expand your reach. Provide consultations and assist customers effectively through real-time chat support.</p>
            <Link className='bg-blue-600 text-white font-semibold px-10 py-1 rounded-lg' href='/pharmacy/SignUp'>Sign Up</Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#3EBE71] h-[100px] flex justify-center items-center">
        <span className="block text-sm text-white">© 2025 All Rights Reserved</span>
      </footer>
    </div>
  );
}
