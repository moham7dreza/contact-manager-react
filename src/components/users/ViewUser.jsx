import {useEffect, useRef} from "react";
import {index_users, show_user} from "../../services/UserService";
import {useParams} from "react-router-dom";

export const ViewUser = ({setUser, getUser}) => {

    const {id} = useParams()

    const user = getUser

    useEffect(() => {
        const fetch = async () => {

            try {
                const {data: user} = await show_user(id)

                setUser(user)
            } catch (e) {

            }
        }

        fetch()
    }, []);

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
                        <form>
                            <div className="mb-4 sm:mb-8">
                                <label htmlFor="hs-name-1"
                                       className="block mb-2 text-sm font-medium dark:text-white">Full name</label>
                                <input type="text" id="hs-name-1" value={`${user.first_name} ${user.last_name}`}
                                       readOnly={true}
                                       className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"/>
                            </div>

                            <div className="mb-4 sm:mb-8">
                                <label htmlFor="hs-email-1"
                                       className="block mb-2 text-sm font-medium dark:text-white">Email address</label>
                                <input type="email" id="hs-email-1" value={user.email} readOnly={true}
                                       className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                       placeholder="Email address"/>
                            </div>

                            <div className="mb-4 sm:mb-8">
                                <label htmlFor="hs-email-1"
                                       className="block mb-2 text-sm font-medium dark:text-white">Phone Number</label>
                                <input type="number" id="hs-mobile-1" value={user.mobile} readOnly={true}
                                       className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"/>
                            </div>

                            <div>
                                <label htmlFor="hs-textarea-1"
                                       className="block mb-2 text-sm font-medium dark:text-white">Bio</label>
                                <div className="mt-1">
                                    <textarea id="hs-textarea-1" readOnly={true}
                                              name="hs-textarea-1" rows="3"
                                              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                    >
                                        {user.bio}
                                    </textarea>
                                </div>
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