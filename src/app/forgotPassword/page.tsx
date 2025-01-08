import Link from "next/link";

export default function Profile() {
    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 border border-[#3EBE71] ">
                <h1 className="text-center text-2xl font-bold text-[#3EBE71] sm:text-3xl">Forgot Password</h1>
                <div className="text-center text-sm text-gray-500 mt-2">Enter the email associated with your account and we'll</div>
                <p className="text-center text-sm text-gray-500" style={{lineHeight: '1px'}}>send an email with instruction to reset your password.</p>

                <form action="#" className="">
                    <div>
                        <label htmlFor="email" className="">Email</label>

                        <div className="relative mt-2">
                            <input type="email" className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Enter your email address"/>

                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-[#3EBE71] hover:bg-white hover:text-[#3EBE71] hover:border-[#3EBE71] hover:border px-5 py-3 text-sm font-bold text-white mt-4"
                    >
                        Send Email
                    </button>
                </form>
            </div>
        </div>
    );
}