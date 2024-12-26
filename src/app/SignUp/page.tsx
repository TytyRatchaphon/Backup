import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function SignUp() {

    return(
        <div>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Create New Account</h1>

                    <p className="mt-4 text-gray-500 text-left ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque
                    ipsa culpa autem, at itaque nostrum!
                    </p>

                    <p className="mt-4 text-sm text-gray-500 text-left">
                        Already have an account?
                        <a className="underline" href="#">Sign In</a>
                    </p>

                    <hr className="my-10"/>

                </div>
                <div className="mx-auto max-w-lg">
                    <form action="#" className="mx-auto mb-0 max-w-md space-y-4">
                        <div>
                            <label htmlFor="email" className="">Email</label>

                            <div className="relative">
                                <input
                                type="email"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter email"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="">Confirm Email</label>

                            <div className="relative">
                                <input
                                type="email"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter your confirm email"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="">Password</label>

                            <div className="relative">
                                <input
                                type="password"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter password"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="">Confirm Password</label>

                            <div className="relative">
                                <input
                                type="password"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter your confirm password"
                                />
                            </div>
                        </div>

                        
                    </form>
                    <hr className="my-10"/>

                    <form action="#" className="mx-auto mb-0 max-w-md space-y-4">
                        <div className="flex justify-between items-center gap-5">

                            <div>
                                <label htmlFor="" className="">First Name</label>

                                <div className="relative">
                                    <input
                                    type=""
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter your First Name"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="">Last Name</label>

                                <div className="relative">
                                    <input
                                    type=""
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter your Last Name"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="">Gender</label>
                            <div className="relative">
                                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </div>
                        </div>

                        <div style={{border: '1px solid red'}}>
                            <div className='relative'>Date of Birth</div>
                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="Basic date picker" />
                                </DemoContainer>
                            </LocalizationProvider> */}
                        </div>

                        <div>
                            <label htmlFor="email" className="">Phone</label>

                            <div className="relative">
                                <input
                                type="text"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="+66"
                                />
                            </div>
                        </div>


                    </form>
                    <hr className="my-10"/>

                    <form action="#" className="mx-auto mb-0 max-w-md space-y-4">
                        <div></div>
                    </form>

                    <form action="#" className="mx-auto mb-0 max-w-md space-y-4">
                        <div>
                            <div className="sm:col-span-3">
                                <div className="inline-block">
                                    <label htmlFor="af-submit-application-phone" className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500">
                                    Chronic Disease
                                    </label>
                                </div>
                            </div>

                            <div className="sm:col-span-9">
                            <input id="af-submit-application-phone" type="text" className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder='Enter your Chronic Disease'/>

                            <p className="mt-3">
                                <a className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500" href="../docs/index.html">
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                                Add
                                </a>
                            </p>
                            </div>
                        </div>

                        <div>
                            <div className="sm:col-span-3">
                                <div className="inline-block">
                                    <label htmlFor="af-submit-application-phone" className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500">
                                    Medication Allergy
                                    </label>
                                </div>
                            </div>

                            <div className="sm:col-span-9">
                            <input id="af-submit-application-phone" type="text" className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder='Enter your Medication Allergy'/>

                            <p className="mt-3">
                                <a className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500" href="../docs/index.html">
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                                Add
                                </a>
                            </p>
                            </div>
                        </div>
                    </form>

                    <div className="flex items-center justify-between my-10">
                        <button
                            type="submit"
                            className="w-full inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}