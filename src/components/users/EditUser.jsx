import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "../../context/UserContext";
import UserService from "../../services/UserService";
import {UserValidation} from "../../validations/UserValidation";
import {ErrorMessage, Field, Form, Formik} from "formik";

export const EditUser = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const {
        getUser: user,
        setUser,
        getUsers,
        setUsers,
        filteredUsers,
        setFilteredUsers
    } = useContext(UserContext)

    const updateUserOnSubmit = async (values) => {
        // e.preventDefault()
        try {
            const {data: updatedUser, status} = await UserService.update(values, id)
            if (status === 200) {
                // const allUsers = [...getUsers]
                // const userIndex = allUsers.findIndex(user => user.id === parseInt(id))
                // allUsers[userIndex] = {...updatedUser}
                // setUsers(allUsers)
                // setFilteredUsers(allUsers)

                setUsers(users => {
                    const userIndex = users.findIndex(user => user.id === parseInt(id))
                    users[userIndex] = {...updatedUser}
                })
                setFilteredUsers(users => {
                    const userIndex = users.findIndex(user => user.id === parseInt(id))
                    users[userIndex] = {...updatedUser}
                })
                navigate('/users')
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const {data: userData} = await UserService.find(id)
                setUser(userData)
            } catch (e) {
                console.log(e.message)
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
                        <Formik initialValues={user} onSubmit={values => {
                            updateUserOnSubmit(values)
                        }} validationSchema={UserValidation}>
                            <Form>
                                <div className="grid gap-4 lg:gap-6">
                                    {/*!-- Grid -->*/}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label htmlFor="first_name"
                                                   className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">First
                                                Name</label>
                                            <Field type="text" name="first_name"
                                                   className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"/>

                                            <ErrorMessage name={'first_name'}>
                                                {message => (<div className={'text-red-500 my-2'}>{message}</div>)}
                                            </ErrorMessage>
                                        </div>

                                        <div>
                                            <label htmlFor="last_name"
                                                   className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Last
                                                Name</label>
                                            <Field type="text" name="last_name"
                                                   className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"/>
                                            <ErrorMessage name={'last_name'}>
                                                {message => (<div className={'text-red-500 my-2'}>{message}</div>)}
                                            </ErrorMessage>
                                        </div>
                                    </div>
                                    {/*!-- End Grid -->*/}

                                    {/*<!-- Grid -->*/}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label htmlFor="email"
                                                   className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Email</label>
                                            <Field type="email" name="email"
                                                   autoComplete="email"
                                                   className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"/>
                                            <ErrorMessage name={'email'}>
                                                {message => (<div className={'text-red-500 my-2'}>{message}</div>)}
                                            </ErrorMessage>
                                        </div>

                                        <div>
                                            <label htmlFor="mobile"
                                                   className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Phone
                                                Number</label>
                                            <Field type="text" name="mobile"
                                                   className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"/>
                                            <ErrorMessage name={'mobile'}>
                                                {message => (<div className={'text-red-500 my-2'}>{message}</div>)}
                                            </ErrorMessage>
                                        </div>
                                    </div>
                                    {/*!-- End Grid -->*/}

                                    <div>
                                        <label htmlFor="bio"
                                               className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Details</label>
                                        <Field as={'textarea'} name="bio" rows="4"
                                               className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"/>
                                        <ErrorMessage name={'bio'}>
                                            {message => (<div className={'text-red-500 my-2'}>{message}</div>)}
                                        </ErrorMessage>
                                    </div>
                                </div>
                                {/*!-- End Grid -->*/}

                                <div className="mt-6 grid">
                                    <button type="submit"
                                            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Send
                                        inquiry
                                    </button>
                                </div>

                                <div className="mt-3 text-center">
                                    <p className="text-sm text-gray-500">
                                        We'll get back to you in 1-2 business days.
                                    </p>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                    {/*<!-- End Card -->*/}
                </div>
            </div>
            {/*<!-- End Comment Form -->*/}
        </>
    )
}