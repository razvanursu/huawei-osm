import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from "../../config";
import api from "../services/api";


export function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    
    const baseAddress = Config.getConfig().getBackendAddress()
    const res = await api.post(`${baseAddress}/graphql`, JSON.stringify({ query, variables }), {
        'axios-retry': {
        retries: 10,  
    }})
    const json = await res.data;

    if (json.errors) {
      const { message } = json.errors[0];
      console.log(json.errors[0].locations)

      if(message === "Signature has expired"){
        await Config.getConfig().deleteAuthToken()
        //const token = await fetcher<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, { refreshToken: refreshToken || "" })()
        //console.log(token.refreshToken.token)
      }

      throw new Error(message);
    }

    return json.data;
  }
}

export const save = async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
}

export const getValueFor = async (key: string) => {
    return await AsyncStorage.getItem(key);
}

export const deleteValueFor = async (key: string) => {
    return await AsyncStorage.removeItem(key);
}

//Format YYYY-MM-DD
export const dateToString = (date: Date) => 
    date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0')

//Necessary to avoid a caching bug
export const generateImageUrl = (url: string) => `${url}?${new Date()}`