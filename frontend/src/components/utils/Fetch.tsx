import {useEffect, useState} from "react";
import axios, {Axios} from "axios";
import {AxiosResponse} from 'axios'

function useFetch<T>(path: string, method: Methods, body?: Object) {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<any>(undefined)
    const [response, setResponse] = useState<T | undefined>(undefined)

    useEffect(()=> {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const res = await getAxios(path, method, body)
                setResponse(res.data as T)
            } catch (error: any) {
                if (error.response) {
                    setError(error.response.data)
                } else if(error.request) {
                    setError(error.request.data)
                } else {
                    setError(error)
                }
            } finally {
                setIsLoading(false)
            }

        }
        fetchData()
    }, [])
    return {isLoading, error, response}
}

export async function singleFetch<T>(path: string, method: Methods, body?: Object) {
    try {
        const res = await getAxios(path, method, body)
        return {response: res.data as T}
    } catch (error: any) {
        if (error.response) {
            return {error: error.response.data}
        } else if(error.request) {
            return {error: error.request.data}
        } else {
            return {error}
        }
    }
}




export enum Methods {
    POST,
    GET,
    DELETE,
    PATCH,
}


function getAxios(path: string, method: Methods, body?: Object) {
    switch (method) {
        case Methods.GET:
            return axios.get(path)
        case Methods.POST:
            return axios.post(path, body)
        case Methods.PATCH:
            return axios.patch(path)
        case Methods.DELETE:
            return axios.delete(path)
    }
}

export default useFetch