import './App.css';
import {Navbar} from "./components/Navbar";
import {Footer} from "./components/Footer";
import {AddUser} from "./components/users/AddUser";
import React, {useCallback, useEffect, useState} from "react";
import UserService from "./services/UserService";
import {Users} from "./components/users/Users";
import {Route, Routes, useNavigate} from "react-router-dom";
import {ViewUser} from "./components/users/ViewUser";
import {EditUser} from "./components/users/EditUser";
import {UserContext} from "./context/UserContext";
import {confirmAlert} from "react-confirm-alert";

const App = () => {
    const [getUsers, setUsers] = useState([])
    const navigate = useNavigate()
    const [query, setQuery] = useState({})
    const [filteredUsers, setFilteredUsers] = useState([])
    const [getUser, setUser] = useState({})

    // const searchUser = (e) => {
    //     const search = e.target.value
    //     setQuery({...query, text: search})
    //     setFilteredUsers(getUsers.filter(user => user.first_name.toLowerCase().includes(search.toLowerCase()) || user.last_name.toLowerCase().includes(search.toLowerCase())))
    // }

    const searchUser = useCallback((e) => {
        const search = e.target.value
        setQuery({...query, text: search})
        setFilteredUsers(getUsers.filter(user => user.first_name.toLowerCase().includes(search.toLowerCase()) || user.last_name.toLowerCase().includes(search.toLowerCase())))
    }, [query, getUsers])

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

    const removeUser = async (id) => {
        const copyUsers = [...getUsers]
        try {
            const updatedUsers = getUsers.filter(user => user.id !== parseInt(id))
            setUsers(updatedUsers)
            setFilteredUsers(updatedUsers)
            const {status} = await UserService.destroy(getUser, id)
            if (status !== 200) {
                setUsers(copyUsers)
                setFilteredUsers(copyUsers)
            }
        } catch (e) {
            console.log(e.message)
            setUsers(copyUsers)
            setFilteredUsers(copyUsers)
        }
    }

    const confirmDelete = (id, name) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div
                        dir="rtl"
                        style={{
                            backgroundColor: 'cyan',
                            border: `1px solid purple`,
                            borderRadius: "1em",
                        }}
                        className="p-4"
                    >
                        <h1 style={{color: 'yellow'}}>پاک کردن مخاطب</h1>
                        <p style={{color: 'forestgreen'}}>
                            مطمئنی که میخوای مخاطب {name} رو پاک کنی ؟
                        </p>
                        <button
                            onClick={() => {
                                removeUser(id);
                                onClose();
                            }}
                            className="btn mx-2"
                            style={{backgroundColor: 'purple'}}
                        >
                            مطمئن هستم
                        </button>
                        <button
                            onClick={onClose}
                            className="btn"
                            style={{backgroundColor: 'green'}}
                        >
                            انصراف
                        </button>
                    </div>
                );
            },
        });
    };

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
        setUsers,
        filteredUsers,
        query,
        setQuery,
        createUserOnSubmit,
        setUserInfo,
        setFilteredUsers,
        searchUser,
        confirmDelete
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
