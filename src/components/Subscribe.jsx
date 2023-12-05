import {useLocation} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../context/UserContext";

export const Subscribe = () => {
    const {query, setQuery, searchUser: search} = useContext(UserContext)

    return (
        <>
            <div className="max-w-6xl py-10 px-4 sm:px-6 lg:px-8 lg:py-16 mx-auto bg-black">
                <div className="max-w-xl text-center mx-auto">
                    <div className="mb-5">
                        <h2 className="text-2xl font-bold md:text-3xl md:leading-tight dark:text-white">Sign up to our newsletter</h2>
                    </div>

                    <form>
                        <div className="mt-5 lg:mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                            <div className="w-full">
                                <label htmlFor="hero-input" className="sr-only">Search</label>
                                <input onChange={search} value={query.text} type="text" id="hero-input"
                                       name="hero-input"
                                       className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                       placeholder="Enter your email"/>
                            </div>
                            <a className="w-full sm:w-auto whitespace-nowrap py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                                Subscribe
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}