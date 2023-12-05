import {User} from "./User";
import {Link} from "react-router-dom";
import React, {useContext} from "react";
import {UserContext} from "../../context/UserContext";
import {Subscribe} from "../Subscribe";

export const Users = () => {
    const {filteredUsers: users} = useContext(UserContext)

    return (
        <>
            <Subscribe/>
            <div className={'bg-black'}>
                <Link to={'/users/add'} type="button"
                      className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                    Add User
                </Link>
            </div>
            {Object.keys(users).length > 0 && users.map((user) => <User key={user.id} user={user}/>)}
        </>
    )
}