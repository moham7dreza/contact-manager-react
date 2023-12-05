import './App.css';
import {Navbar} from "./components/Navbar";
import {Footer} from "./components/Footer";
import {ContactUs} from "./components/ContactUs";
import React, {useEffect, useState} from "react";
import {index_users, store_user} from "./services/UserService";
import {Users} from "./components/users/Users";
import {Route, Routes, useNavigate} from "react-router-dom";
import {ViewUser} from "./components/users/ViewUser";
import {EditUser} from "./components/users/EditUser";
import {UserContext} from "./context/UserContext";

const App = () => {
    const [getUsers, setUsers] = useState([])
    const navigate = useNavigate()
    const [query, setQuery] = useState({})
    const [filteredUsers, setFilteredUsers] = useState([])
    const [getUser, setUser] = useState({})

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
            console.log(e.message)
        }
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const {data: users} = await index_users()
                setFilteredUsers(users)
            } catch (e) {
                console.log(e.message)
            }
        }
        fetch()
    }, []);

    const value = {
        getUser,
        setUser,
        getUsers,
        filteredUsers,
        query,
        setQuery,
        createUserOnSubmit,
        setUserInfo,
        setFilteredUsers,
        searchUser
    }

    return (
        <UserContext.Provider value={value}>
            <Navbar/>
            <Routes>
                <Route path={'/users'} element={<Users/>}/>
                <Route path={'/users/:id'} element={<ViewUser/>}/>
                <Route path={'/users/add'} element={<ContactUs/>}/>
                <Route path={'/users/edit/:id'} element={<EditUser/>}/>
            </Routes>
            <Footer/>
        </UserContext.Provider>
    );
}

export default App;
