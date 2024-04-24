import { useEffect, useState } from "react"
import api from "../Context/api"
import { Alert } from "react-native"

const useAPI = ({route}) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    //No asynch inside useffect.
    const fetchData = async () => {
        setIsLoading(true)
        try{
            const response = await api.get(route); //Må legge inn egen request her
            
            setData(response.data)
        }catch(error){
            Alert.alert('Error', error.message)
        }finally{
            setIsLoading(false);
        }
    
    
    }
  
    useEffect(()=>{
      fetchData();
    }, [])
    return { data }
}

const refetch =  () => fetchData();

export default useAPI