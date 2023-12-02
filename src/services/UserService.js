import axios from "axios";

const Server_Url = 'http://localhost:9000'

export const index_users = () => {
    const url = `${Server_Url}/users`

    return axios.get(url)
}

export const show_user = (id) => {
    const url = `${Server_Url}/users/${id}`

    return axios.get(url)
}

export const store_user = (user) => {
    const url = `${Server_Url}/users`

    return axios.post(url, user)
}

export const update_user = (user, id) => {
    const url = `${Server_Url}/users/${id}`

    return axios.put(url, user)
}

export const destroy_user = (user, id) => {
    const url = `${Server_Url}/users/${id}`

    return axios.delete(url)
}