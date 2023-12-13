import './App.css';
import {Navbar} from "./components/Navbar";
import {Footer} from "./components/Footer";
import {AddUser} from "./components/users/AddUser";
import React, {useCallback, useEffect, useReducer, useState} from "react";
import UserService from "./services/UserService";
import {Users} from "./components/users/Users";
import {Route, Routes, useNavigate} from "react-router-dom";
import {ViewUser} from "./components/users/ViewUser";
import {EditUser} from "./components/users/EditUser";
import {UserContext} from "./context/UserContext";
import {confirmAlert} from "react-confirm-alert";
import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'

const App = () => {
    const [getUsers, setUsers] = useState([])
    const navigate = useNavigate()
    const [filteredUsers, setFilteredUsers] = useState([])
    const [getUser, setUser] = useState({})

    /*
    let filterTimeout

    const searchUser = useCallback((query) => {
        clearTimeout(filterTimeout)

        if (!query) return setFilteredUsers([...getUsers])

        filterTimeout = setTimeout(() => {
            setFilteredUsers(getUsers.filter(user => user.first_name.toLowerCase().includes(query.toLowerCase())
                || user.last_name.toLowerCase().includes(query.toLowerCase())))
        }, 1000)

    }, [getUsers])
    */
    //  after .5 seconds users will be filtered
    const searchUser = debounce(query => {
        if (!query) return setFilteredUsers([...getUsers])

        setFilteredUsers(getUsers.filter(user => user.first_name.toLowerCase().includes(query.toLowerCase())
            || user.last_name.toLowerCase().includes(query.toLowerCase())))

    }, 500)

    const setUserInfo = (e) => {
        setUser({...getUser, [e.target.name]: e.target.value})
    }

    const createUserOnSubmit = async (values) => {
        // e.preventDefault()
        try {

            const {status, data: user} = await UserService.store(values)
            if (status === 201) {
                // setUser({})
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
    // every 3 seconds confirm alert is shown
    const confirmDelete = throttle((id, name) => {
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
    }, 3000)

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
        createUserOnSubmit,
        setUserInfo,
        setFilteredUsers,
        searchUser,
        confirmDelete,
    }

    // const reducer =  (state, action) => {
    //     switch (action.type) {
    //         case 'add_user':
    //             return {
    //
    //             }
    //         case 'update_user':
    //             return {}
    //         case 'delete_user':
    //             return {}
    //         default:
    //             return state
    //     }
    // }
    //
    // const actions = {
    //     addUser: 'add_user',
    //     editUser:'editUser',
    //     deleteUSer: 'deleteUser'
    // }
    //
    // const [store, dispatch] = useReducer(reducer, {user: {}})

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
