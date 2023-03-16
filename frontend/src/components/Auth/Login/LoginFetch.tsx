import {useEffect, useState} from "react";
import axios from "axios";
import {User} from "../../Types/User";
import {Tokens} from "../../Types/Tokens";


export interface LoginData {
    email: string,
    password: string
}

export interface LoginResponse {
    user: User,
    tokens: Tokens
}
