import axios from "axios"
import Config from "../../config";
import { dateToString } from "../utils/utils"

interface LoginParameters {
    username: string;
    password: string;
}

export interface RegisterParameters {
    email: string;
    username: string;
    name: string;
    birthday: Date;
    password: string
}

export const login = ({username, password}: LoginParameters) => {
    const baseAddress = Config.getConfig().getBackendAddress()
    
    return axios.post(`${baseAddress}/login`, {
        username,
        password
    })
    .then((response) => {
        return response.data
    })
}

export const register = ({email, username, name, birthday, password}: RegisterParameters) => {
    const baseAddress = Config.getConfig().getBackendAddress()

    return axios.post(`${baseAddress}/users/signup`, {
        email,
        username,
        name,
        birthday: dateToString(birthday),
        password
    })
    .then((response) => {
        return response.data
    })
}