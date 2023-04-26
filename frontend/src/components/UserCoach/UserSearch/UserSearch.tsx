import {Button, Input} from "@mui/joy";
import {FormEvent, useContext, useEffect, useState} from "react";
import {Methods, singleFetch} from "../../utils/Fetch";
import {SearchResponse} from "../data/SearchResponse";
import UserCoachContext from "../context/UserCoachContext";
import styles from './UserView.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRefresh} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../Auth/AuthContext";
import {RoleEnum} from "../../Types/Role";
import BackButton from "../../Common/BackButton";

export default function UserSearch() {
    const [search, setSearch] = useState('')
    const {setSearchResponse, refresh} = useContext(UserCoachContext)
    const {user} = useContext(AuthContext)

    async function handleSearch() {
        const result = await singleFetch<SearchResponse[]>(`/api/profile/search/name/${search}`, Methods.GET)
        if (result.response) {
            setSearchResponse(result.response)
        }
    }

    useEffect(()=> {
        setSearchResponse(undefined)
    }, [search])

    function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        handleSearch().then()
    }

    return (
        <div className="m-3">
            <form onSubmit={handleSearchSubmit} className={styles.container}>
                {user!.role.roleName === RoleEnum.USER && <BackButton />}
                <Input type="search" placeholder="Search..." value={search} onChange={({target: {value}})=> setSearch(value)} endDecorator={
                    <Button onClick={handleSearch}>Search</Button>
                }/>
                <Button onClick={refresh}><FontAwesomeIcon icon={faRefresh}/></Button>
            </form>
        </div>
    )
}