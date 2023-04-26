import {createContext} from "react";
import {ProfileUserRoleResponse} from "../AdminPage";

interface AdminPageContextType {
    blockUser: (userId: number) => void;
    unBlock: (userId: number) => void;
    users: ProfileUserRoleResponse[];
    fetchUsers: () => void;
}


export const AdminPageContext = createContext<AdminPageContextType>(null as any);