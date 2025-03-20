import Link from "next/link";

export default function CheckOut() {
    return (
        <div>
            <header
                className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-3"
                style={{ backgroundColor: "#EAF8EE" }}
                >
                <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <a
                                style={{ color: "#3EBE71" }}
                                className="flex-none text-2xl font-bold focus:outline-none focus:opacity-80"
                                href="#"
                                aria-label="Brand"
                            >
                                GoMed
                            </a>
                        </div>
                        <div className="flex gap-8">
                            <Link href="/customer/Message">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-message-circle-more"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" className="text-[#3EBE71]"/><path d="M8 12h.01" className="text-[#3EBE71]"/><path d="M12 12h.01" className="text-[#3EBE71]"/><path d="M16 12h.01" className="text-[#3EBE71]"/></svg>
                            </Link>
                            <Link href="/customer/Cart">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1" className="text-[#3EBE71]"/><circle cx="19" cy="21" r="1" className="text-[#3EBE71]"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" className="text-[#3EBE71]"/></svg>
                            </Link>
                            <Link href="/customer/Profile">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0" className="text-[#3EBE71]"/><circle cx="12" cy="10" r="4" className="text-[#3EBE71]"/><circle cx="12" cy="12" r="10" className="text-[#3EBE71]"/></svg>
                            </Link>
                            <Link href="/SignIn" className="text-[#3EBE71]">
                                Log Out
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
            <section>
                <h1 className="text-4xl font-extrabold text-[#160058] text-center pt-10">Check Out</h1>
                <div>
                    <div className="flex justify-center mt-10">
                        <div className="w-[600px] h-auto">
                            <div className="mt-3">
                                <div className="flex items-center">
                                    <div className="w-24 h-20 border border-[#3EBE71] bg-[#EAF8EE] rounded-lg ml-10">
                                        <img src="" alt="" />
                                    </div>
                                    <div className="flex justify-between w-full ml-5">
                                        <div className="">
                                            <p className="font-medium">product name</p>
                                        </div>
                                        <div className="text-right">
                                            <p>฿100.00</p>
                                            <p>x 1</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="mt-5 border-t" />
                            <div className="flex justify-center">
                                <div className="w-[400px]">
                                    <div className="flex justify-between w-full mt-2">
                                        <h1 className="font-bold">Total</h1>
                                        <h1>฿100.00</h1>
                                    </div>
                                    <h1 className="text-right">x 1</h1>
                                    <button className="bg-[#3EBE71] w-full mt-2 py-2 text-white font-bold rounded-xl">Confirm Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}