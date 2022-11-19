import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { instanceToPlain, plainToClass, plainToInstance } from "class-transformer"
import { AppRegistry } from "react-native"
import Config from "../../config"
import { Issue } from "../models/map"
import { Follower, Profile, User } from "../models/user"
import api from "./api"

export const MapServiceKeys = {
    issues: () => ["issues"],
    me: () => ["me"],
    followers: (userID: string) => ["followers", userID],
    following: (userID: string) => ["following", userID],
}

export const retrieveIssues = () => {
    const baseAddress = Config.getConfig().getBackendAddress()

    return api.get(`${baseAddress}/get-issues`)
        .then((response: AxiosResponse<Issue>) => plainToInstance(Issue, response.data))
}

export const useIssues = () => 
    useQuery(MapServiceKeys.issues(), () => retrieveIssues())