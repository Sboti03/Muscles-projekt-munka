import {createContext} from "react";

interface Value {
    createConnectionRequest: (userId: number) => Promise<boolean>
    acceptConnectionRequest: (profileId: number) => Promise<boolean>
    deleteConnection: (profileId: number) => Promise<boolean>
    deleteConnectionRequest: (profileId: number) => Promise<boolean>
}

const ConnectionContext = createContext<Value>(null as any)

export default ConnectionContext

