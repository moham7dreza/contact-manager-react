import './App.css';
import {Navbar} from "./components/Navbar";
import {Footer} from "./components/Footer";
import {ContactUs} from "./components/ContactUs";
import React, {useEffect, useState} from "react";
import {index_users, show_user, store_user, update_user} from "./services/UserService";
import {Users} from "./components/users/Users";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import {User} from "./components/users/User";
import {ViewUser} from "./components/users/ViewUser";
import {EditUser} from "./components/users/EditUser";
import {Subscribe} from "./components/Subscribe";

const App = () => {

    const [getUsers, setUsers] = useState([])

    const navigate = useNavigate()
    const [query, setQuery] = useState({text: ""})
    const [filteredUsers, setFilteredUsers] = useState([])

    const [getUser, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        bio: ""
    })

    const searchUser = (e) => {
        const search = e.target.value
        setQuery({...query, text: search})

        const users = getUsers.filter(user => {
            return user.first_name.toLowerCase().includes(search.toLowerCase())
        })

        setFilteredUsers(users)
        console.log(filteredUsers)
    }

    const setUserInfo = (e) => {
        setUser({...getUser, [e.target.name]: e.target.value})
    }

    const createUserOnSubmit = async (e) => {
        e.preventDefault()

        try {
            const {status} = await store_user(getUser)

            if (status === 201) {
                setUser({})
                navigate('/users')
            }
        } catch (e) {

        }
    }

    useEffect(() => {
        const fetch = async () => {

            try {
                const {data: users} = await index_users()

                // setUsers(users)
                setFilteredUsers(users)
            } catch (e) {

            }
        }

        fetch()
    }, []);

    return (
        <>
            <Navbar/>
            <Routes>
                <Route path={'/users'} element={<Users users={filteredUsers}/>}>
                    <Route path={'/users/search'} element={<Subscribe query={query} search={searchUser}/>}/>
                </Route>
                <Route path={'/users/:id'} element={<ViewUser setUser={setUser} getUser={getUser}/>}/>
                <Route path={'/users/add'} element={<ContactUs setUserInfo={setUserInfo} user={getUser}
                                                               createUserOnSubmit={createUserOnSubmit}/>}/>
                <Route path={'/users/edit/:id'} element={<EditUser/>}/>
            </Routes>

            <Footer/>
        </>
    );
}

export default App;
