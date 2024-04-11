import { useEffect, useState } from 'react'
import { useGlobalContext } from '../contexts/GlobalContextProvider'
import { io } from 'socket.io-client'

const useSocket = () => {
	const { setSocket } = useGlobalContext()
	const [isConnected, setIsConnected] = useState(false)
	const SOCKET_URL = import.meta.env.VITE_SOCKET_URL
	const SOCKET_PORT = import.meta.env.VITE_SOCKET_PORT

	useEffect(() => {
		const newSocket = io(`${SOCKET_URL}:${SOCKET_PORT}`, {
			transports: ['websocket', 'polling'],
		})

		function onConnect() {
			console.log('connected')
			setIsConnected(true)
			setSocket(newSocket)
		}

		function onDisconnect() {
			console.log('disconnected')
			setIsConnected(false)
			setSocket(null)
		}

		newSocket.connect()

		newSocket.on('connect', onConnect)
		newSocket.on('disconnect', onDisconnect)

		return () => {
			setIsConnected(false)
			newSocket.disconnect()
		}
	}, [])

	return isConnected
}

export default useSocket
