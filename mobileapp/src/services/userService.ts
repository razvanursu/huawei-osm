import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { instanceToPlain, plainToClass, plainToInstance } from "class-transformer"
import { AppRegistry } from "react-native"
import Config from "../../config"
import { Follower, Profile, User } from "../models/user"
import { fetchWithAuth } from "../utils/utils"
import api from "./api"

export const UserServiceKeys = {
    profile: (userID: string) => ["profile", userID],
    me: () => ["me"],
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


export const updateUserProfile = ({ userID, profile }: { userID: string, profile: Profile}) => {
    const baseAddress = Config.getConfig().getBackendAddress()

    return api.put(`${baseAddress}/users/${userID}/`, instanceToPlain(profile))
              .then((response: AxiosResponse<User>) => plainToInstance(User, response.data))
}

export const retrieveUserFollowers = ({ userID }: { userID: string }) => {
    const baseAddress = Config.getConfig().getBackendAddress()

    return api.get(`${baseAddress}/users/${userID}/followers`)
              .then((response: AxiosResponse<Follower[]>) => plainToInstance(Follower, response.data))
}

export const useUserFollowers = (userID: string) => 
    useQuery(UserServiceKeys.followers(userID), () => retrieveUserFollowers({ userID }))

export const retrieveUserFollowing = ({ userID }: { userID: string }) => {
    const baseAddress = Config.getConfig().getBackendAddress()

    return api.get(`${baseAddress}/users/${userID}/following`)
              .then((response: AxiosResponse<Follower[]>) => plainToInstance(Follower, response.data))
}

export const useUserFollowing = (userID: string) => 
    useQuery(UserServiceKeys.following(userID), () => retrieveUserFollowing({ userID }))
