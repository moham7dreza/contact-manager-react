import './App.css';
import {Navbar} from "./components/Navbar";
import {Footer} from "./components/Footer";
import {AddUser} from "./components/users/AddUser";
import React, {useEffect, useState} from "react";
import UserService from "./services/UserService";
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
        setFilteredUsers(getUsers.filter(user => user.first_name.toLowerCase().includes(search.toLowerCase()) || user.last_name.toLowerCase().includes(search.toLowerCase())))
    }

    const setUserInfo = (e) => {
        setUser({...getUser, [e.target.name]: e.target.value})
    }

    const createUserOnSubmit = async (e) => {
        e.preventDefault()
        try {
            const {status, data: user} = await UserService.store(getUser)
            if (status === 201) {
                setUser({})
                setFilteredUsers([...getUsers, user])
                setUsers([...getUsers, user])
                navigate('/users')
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const {data: users} = await UserService.index()
                setUsers(users)
            } catch (e) {
                console.log(e.message)
            }
        }
        fetch().then(r => {
        })
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
        searchUser,
    }

    return (
        <UserContext.Provider value={value}>
            <Navbar/>
            <Routes>
                <Route path={'/users'} element={<Users/>}/>
                <Route path={'/users/:id'} element={<ViewUser/>}/>
                <Route path={'/users/add'} element={<AddUser/>}/>
                <Route path={'/users/edit/:id'} element={<EditUser/>}/>
            </Routes>
            <Footer/>
        </UserContext.Provider>
    );
}

export default App;
