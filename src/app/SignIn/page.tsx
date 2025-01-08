import Link from "next/link";

export default function SignIn() {
    return(

        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
                <h1 className="text-center text-2xl font-bold text-[#3EBE71] sm:text-3xl">Get started today</h1>

                <p className="text-center text-sm text-gray-500 mt-2">Don't have any account?
                    <span> </span>
                    <Link className="underline" href="/signUp">Sign Up</Link>
                </p>

                <form action="#" className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 border border-[#3EBE71] ">
                    <p className="text-center text-lg font-medium">Sign In to your account</p>

                    <div>
                        <label htmlFor="email" className="">Email</label>

                        <div className="relative mt-2">
                            <input type="email" className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Enter your email address"/>

                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="">Password</label>

                        <div className="relative mt-2">
                        <input
                            type="password"
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter your password"
                        />

                        </div>
                    </div>

                    <Link className="underline text-[12px] text-zinc-500" href="/forgotPassword">Forgot Password?</Link>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-[#3EBE71] hover:bg-white hover:text-[#3EBE71] hover:border-[#3EBE71] hover:border px-5 py-3 text-sm font-bold text-white"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
