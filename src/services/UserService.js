import axios from "axios";

const Server_Url = 'http://localhost:9000'

class UserService {
    static index = () => {
        const url = `${Server_Url}/users`

        return axios.get(url)
    }

    static find = (id) => {
        const url = `${Server_Url}/users/${id}`

        return axios.get(url)
    }

    static store = (user) => {
        const url = `${Server_Url}/users`

        return axios.post(url, user)
    }

    static update = (user, id) => {
        const url = `${Server_Url}/users/${id}`

        return axios.put(url, user)
    }

    static destroy = (user, id) => {
        const url = `${Server_Url}/users/${id}`

        return axios.delete(url)
    }
}

export default UserService