import { createContext, useContext, useState } from 'react'
import { Socket } from 'socket.io-client'
import { AlertMessageType } from '../types/types'

export type GlobalContextType = {
    socket: Socket | null
    setSocket: (socket: Socket | null) => void
    alertMessage: AlertMessageType
    setAlertMessage: (message: AlertMessageType) => void
    sidenavExpanded: boolean
    setSidenavExpanded: (expanded: boolean) => void
}

const defaultGlobalContextState: GlobalContextType = {
    alertMessage: {
        message: '',
        severity: 'success',
        isOpen: false,
    },
    setAlertMessage: () => {},
    socket: null,
    setSocket: () => null,
    sidenavExpanded: false,
    setSidenavExpanded: () => false,
}

const GlobalContext = createContext<GlobalContextType>(
    defaultGlobalContextState
)

export const GlobalContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [sidenavExpanded, setSidenavExpanded] = useState(false)
    const [alertMessage, setAlertMessage] = useState<AlertMessageType>({
        message: '',
        severity: 'success',
        isOpen: false,
    })

    return (
        <GlobalContext.Provider
            value={{
                socket,
                setSocket,
                alertMessage,
                setAlertMessage,
                sidenavExpanded,
                setSidenavExpanded,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)
