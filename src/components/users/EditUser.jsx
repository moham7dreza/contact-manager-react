import {useNavigate, useParams} from "react-router-dom";
import {show_user, update_user} from "../../services/UserService";
import {useEffect, useState} from "react";

export const EditUser = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const [getUser, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        bio: ""
    })

    const setUserInfo = (e) => {
        setUser({...getUser, [e.target.name]: e.target.value})
    }

    const updateUserOnSubmit = async (e) => {
        e.preventDefault()

        try {
            const {data} = await update_user(getUser, id)

            if (data) {
                navigate('/users')
            }
        } catch (e) {

        }
    }

    useEffect(() => {
        const fetch = async () => {

            try {
                const {data: userData} = await show_user(id)

                setUser(userData)
            } catch (e) {

            }
        }

        fetch()
    }, []);

    const user = getUser

    return (
        <>
            {/*<!-- Comment Form -->*/}
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto bg-black">
                <div className="mx-auto max-w-2xl">
                    <div className="text-center">
                        <h2 className="text-xl text-gray-800 font-bold sm:text-3xl dark:text-white">
                            User
                        </h2>
                    </div>

                    {/*<!-- Card -->*/}
                    <div
                        className="mt-5 p-4 relative z-10 bg-white border rounded-xl sm:mt-10 md:p-10 dark:bg-gray-800 dark:border-gray-700">
                        <form onSubmit={updateUserOnSubmit}>
                            <div className="mb-4 sm:mb-8">
                                <label htmlFor="hs-name-1"
                                       className="block mb-2 text-sm font-medium dark:text-white">First name</label>
                                <input type="text" id="hs-name-1" value={`${user.first_name}`} onChange={setUserInfo}
                                       name="first_name"
                                       className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"/>
                            </div>

                            <div className="mb-4 sm:mb-8">
                                <label htmlFor="hs-name-1"
                                       className="block mb-2 text-sm font-medium dark:text-white">Last name</label>
                                <input type="text" id="hs-name-1" value={`${user.last_name}`} onChange={setUserInfo}
                                       name="last_name"
                                       className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"/>
                            </div>

                            <div className="mb-4 sm:mb-8">
                                <label htmlFor="hs-email-1"
                                       className="block mb-2 text-sm font-medium dark:text-white">Email address</label>
                                <input type="email" id="hs-email-1" value={user.email} onChange={setUserInfo}
                                       name="email"
                                       className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                       placeholder="Email address"/>
                            </div>

                            <div className="mb-4 sm:mb-8">
                                <label htmlFor="hs-email-1"
                                       className="block mb-2 text-sm font-medium dark:text-white">Phone Number</label>
                                <input type="number" id="hs-mobile-1" value={user.mobile} onChange={setUserInfo}
                                       name={"mobile"}
                                       className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"/>
                            </div>

                            <div>
                                <label htmlFor="hs-textarea-1"
                                       className="block mb-2 text-sm font-medium dark:text-white">Bio</label>
                                <div className="mt-1">
                                    <textarea id="hs-textarea-1" onChange={setUserInfo}
                                              rows="3" name={"bio"}
                                              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                    >
                                        {user.bio}
                                    </textarea>
                                </div>
                            </div>

                            <div className="mt-6 grid">
                                <button type="submit"
                                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    {/*<!-- End Card -->*/}
                </div>
            </div>
            {/*<!-- End Comment Form -->*/}
        </>
    )
}