import { createContext, useContext, useState } from 'react'
import { Socket } from 'socket.io-client'
import { AlertMessageType } from '../types/types'

type GlobalContextType = {
    socket: Socket | null
    setSocket: (socket: Socket | null) => void
    alertMessage: AlertMessageType
    setAlertMessage: (message: AlertMessageType) => void
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
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)
