import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { instanceToPlain, plainToClass, plainToInstance } from "class-transformer"
import { AppRegistry } from "react-native"
import Config from "../../config"
import { User } from "../models/user"
import api from "./api"

export const UserServiceKeys = {
    profile: (userID: string) => ["profile", userID],
    myProfile: () => ["myProfile"],
    followers: (userID: string) => ["followers", userID],
    following: (userID: string) => ["following", userID],
}

export const retrieveUserProfile = ({ userID }: { userID: string }) => {
    const baseAddress = Config.getConfig().getBackendAddress()

    return api.get(`${baseAddress}/users/${userID}/`)
        .then((response: AxiosResponse<User>) => plainToInstance(User, response.data))
}

export const useUserProfile = (userID: string) => 
    useQuery(UserServiceKeys.profile(userID), () => retrieveUserProfile({ userID }))


export const retrieveMyProfile = () => {
    const baseAddress = Config.getConfig().getBackendAddress()

    return api.get(`${baseAddress}/profile?`)
        .then((response: AxiosResponse<User>) => plainToInstance(User, response.data))
}

export const useMyProfile = () => 
    useQuery(UserServiceKeys.myProfile(), () => retrieveMyProfile())
