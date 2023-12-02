import './App.css';
import {Navbar} from "./components/Navbar";
import {Footer} from "./components/Footer";
import {ContactUs} from "./components/ContactUs";
import React, {useEffect, useState} from "react";
import {index_users, store_user} from "./services/UserService";
import {Users} from "./components/users/Users";
import {Route, Routes, useNavigate} from "react-router-dom";
import {User} from "./components/users/User";
import {ViewUser} from "./components/users/ViewUser";

const App = () => {

    const [getUsers, setUsers] = useState([])

    const navigate = useNavigate()

    const [getUser, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        bio: ""
    })

    const setUserInfo = (e) => {
        setUser({ ...getUser, [e.target.name] : e.target.value})
    }

    const createUserOnSubmit = async (e) => {
        e.preventDefault()

        try {
            const { status } = await store_user(getUser)

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

                setUsers(users)
            } catch (e) {

            }
        }

        fetch()
    }, []);

    return (
        <>
            <Navbar/>
            <Routes>

                <Route path={'/users'} element={<Users users={getUsers}/>}/>
                <Route path={'/users/:id'} element={<ViewUser setUser={setUser} getUser={getUser}/>}/>
                <Route path={'/users/add'} element={<ContactUs setUserInfo={setUserInfo} user={getUser} createUserOnSubmit={createUserOnSubmit}/>}/>
            </Routes>

            <Footer/>
        </>
    );
}

export default App;
