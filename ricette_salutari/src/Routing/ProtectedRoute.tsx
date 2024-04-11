import { Navigate, redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../App/api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../App/constants";
import { useState, useEffect } from "react";

//De tre som ble brukt i keycloak
interface IProps {
    children: JSX.Element,
    role?: string,
    redirectTo?: string
}



function ProtectedRouter({children}:IProps) : JSX.Element{
    const [isAuthorized, setIsAuthorized] = useState<boolean | undefined>(undefined) 
    
    //I think onload this is set to false
    useEffect(() =>  {
        auth().catch(()=>setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post("/api/token/refresh/",{
                refresh: refreshToken
            })
            if(res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            }else{
                setIsAuthorized(false)
            }
        }catch (error){
            console.log(error);
            setIsAuthorized(false);
        }

    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenExpiration  = decoded.exp
        const now = Date.now()


        

        if(tokenExpiration && tokenExpiration < now){
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }


    } 

    if(isAuthorized === undefined){
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login"></Navigate>;
}

export default ProtectedRouter;