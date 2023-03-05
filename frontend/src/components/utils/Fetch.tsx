import {useEffect, useState} from "react";
import axios  from "axios";
import {AxiosResponse} from 'axios'

function useFetch<T>(path: string, method: Methods, body?: Object) {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(undefined)
    const [response, setResponse] = useState<T | undefined>(undefined)

    useEffect(()=> {
        setIsLoading(true)
        setError(undefined)
        setResponse(undefined)
        let req:  Promise<AxiosResponse<any, any>>
        switch (method) {
            case Methods.GET:
               req = axios.get(path)
                break
            case Methods.POST:
                req = axios.post(path, body)
                break
            case Methods.DELETE:
                req = axios.delete(path)
                break;
            case Methods.PATCH:
                req = axios.patch(path)
        }
        req.then(res=> {
            setResponse(res.data as T)
        })
        req.catch(error => setError(error))
        req.finally(()=> setIsLoading(false))
    }, [])
    return {isLoading, error, response}
}


export enum Methods {
    POST,
    GET,
    DELETE,
    PATCH,
}


export default useFetch