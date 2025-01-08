import Link from "next/link";

export default function ProductDetail() {
    return(
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
                    {/* <Link style={{color: '#3EBE71',fontWeight: 'bold'}} className="font-medium focus:outline-none" href="/signUp" aria-current="page">Register</Link>
                    <a style={{fontWeight: 'bold'}} className="font-medium text-gray-600 hover:text-black-400 focus:outline-none focus:text-gray-400" href="#">Login</a> */}
                    </div>
                </div>
                </nav>
            </header>

            <section className="py-8 md:py-16 antialiased">
                <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-2 xl:gap-2 mx-5 my-5">
                        <div className="max-w-md lg:max-w-lg w-[500px] border rounded-2xl mx-auto bg-gray-50">
                            <img src="med1.png" alt="" />
                        </div>

                        <div className="mt-6 sm:mt-8 lg:mt-0 border rounded-2xl w-full">
                            <div className="m-10 mx-15">
                                <Link href="" className="bg-green-500 text-xs rounded-2xl px-5 py-1 text-white font-bold text-nowrap">Drug Store Name</Link>
                                    <div className="flex justify-between items-center pt-5">
                                        <p className="text-xl font-bold text-left">pneumonoultramicroscopicsilicovolcanoconiosis</p>
                                    </div>
                                    <p className="text-xs pt-2 text-gray-500">Category</p>
                                    <p className="pt-5 text-3xl font-bold text-green-500">฿00.00</p>

                                    <hr className="mt-10 pb-5"/>

                                    <p className="text-sm text-gray-600 font-semibold pb-3">Product Details</p>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis veniam architecto suscipit aut voluptas non error, quo mollitia tempora fuga quibusdam adipisci animi, nisi molestias voluptatibus voluptatem atque quasi assumenda?</p>

                                    <div className="flex justify-between items-center gap-5 mt-10">
                                        <form className="max-w-xs mx-auto">
                                            <div className="relative flex items-center max-w-[8rem]">
                                                <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                                    <svg className="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                                                    </svg>
                                                </button>
                                                
                                                <input type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 w-14 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block py-2.5" placeholder="1" required />
                                                
                                                <button type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                                    <svg className="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </form>
                                            <button className="w-full h-11 rounded-lg items-end bg-green-500 text-white font-bold hover:bg-white hover:text-green-500 hover:border-green-500 hover:border">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
        </div>
    );
}