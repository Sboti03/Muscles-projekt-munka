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
                const result = res.data as T
                for (let key in result) {
                    result[key] = removeNull(result[key])
                }
                setResponse(result)
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

function removeNull(obj: any) {
    if (obj === null) {
        return undefined
    }
    return obj
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
            return axios.patch(path, body)
        case Methods.DELETE:
            return axios.delete(path)
    }
}

export default useFetch