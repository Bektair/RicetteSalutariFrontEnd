import axios from "axios"
import { AccessToken } from "./constants"
import storage from "./Storage";

const api = axios.create({
    baseURL: "http://172.16.3.72:8000/"
});

api.interceptors.request.use(
    async (config) => {
        await storage.load({
            key: AccessToken,
            autoSync: true,
            syncInBackground: true,
            
        }).then(ret => {
            if(ret.token != undefined)
                config.headers.Authorization = `Bearer ${ret.token}`
        }).catch(err => {
            
        })        
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default api;