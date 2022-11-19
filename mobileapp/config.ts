import { deleteValueFor, getValueFor, save } from "./src/utils/utils";

export default class Config {
    private static instance: Config;

    public static getConfig = (): Config => {
        if(!Config.instance) Config.instance = new Config()
        return Config.instance
    }

    getAuthToken = async () => await getValueFor("token")
    setAuthToken = async (token: string) => await save("token", token)
    deleteAuthToken = async () => await deleteValueFor("token")

    getRefreshToken = async () => await getValueFor("refreshToken")
    setRefreshToken = async (token: string) => await save("refreshToken", token)
    deleteRefreshToken = async () => await deleteValueFor("refreshToken")

    getBackendAddress = () => "http://10.0.2.2:8000"
}