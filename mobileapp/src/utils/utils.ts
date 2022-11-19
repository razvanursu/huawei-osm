import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from "../../config";
import api from "../services/api";
import { ReactNativeFile } from 'apollo-upload-client';

export async function refreshToken() {
  const refreshToken = await Config.getConfig().getRefreshToken()
  if(!refreshToken) return

  const result = await fetch(Config.getConfig().getBackendAddress() + "/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: `mutation refreshToken($refreshToken: String!) {
        refreshToken(refreshToken: $refreshToken) {
          token
        }
      }`,
      variables: {
        refreshToken: refreshToken,
      },
    })
  })
  const json = await result.json()
  return json.data.refreshToken.token
}

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
        const refreshToken = await Config.getConfig().getRefreshToken()
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

export const generateRNFile = (uri: string, name: string) => {
  const uriParts = uri.split('.');
  const fileType = uriParts[uriParts.length - 1];
  console.log(fileType)
  return uri ? new ReactNativeFile({
    uri,
    type: `image/${fileType}`,
    name,
  }) : null;
}

//Necessary to avoid a caching bug
export const generateImageUrl = (url: string) => `${url}?${new Date()}`