import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Vendors from './pages/Vendors'
import Customers from './pages/Customers'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import SideNav from './components/SideNav'
import AlertMessage from './components/AlertMessage'
import { useGlobalContext } from './contexts/GlobalContextProvider'

function App() {
    const { setSocket, alertMessage, setAlertMessage } = useGlobalContext()

    useEffect(() => {
        const newSocket = io('http://localhost:3000', {
            transports: ['websocket', 'polling'],
        })

        function onConnect() {
            console.log('connected')
            setSocket(newSocket)
        }

        function onDisconnect() {
            console.log('disconnected')
            setSocket(null)
        }

        newSocket.connect()

        newSocket.on('connect', onConnect)
        newSocket.on('disconnect', onDisconnect)

        return () => {
            newSocket.disconnect()
        }
    }, [])

    return (
        <>
            <main className="flex relative w-full h-full">
                <Router>
                    <div className="flex relative w-full h-full">
                        <SideNav />
                        <Routes>
                            <Route path="/" element={<Vendors />} />
                            <Route path="/customers" element={<Customers />} />
                        </Routes>
                    </div>
                    <div className="absolute block m-auto top-12 left-1/2 -translate-x-1/2">
                        <AlertMessage
                            alertMessage={alertMessage}
                            setAlertMessage={setAlertMessage}
                        />
                    </div>
                </Router>
            </main>
        </>
    )
}

export default App
