import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Vendors from './pages/Vendors'
import Customers from './pages/Customers'
import SideNav from './components/SideNav'
import AlertMessage from './components/AlertMessage'
import { useGlobalContext } from './contexts/GlobalContextProvider'
import useSocket from './hooks/useSocket'
import { useState } from 'react'

function App() {
    const { alertMessage, setAlertMessage } = useGlobalContext()
    const [errorConnecting, setErrorConnecting] = useState(false)
    const isConnected = useSocket()

    setTimeout(() => {
        setErrorConnecting(!isConnected)
    }, 5000)

    return (
        <main className="flex relative w-full h-full">
            {isConnected ? (
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
            ) : errorConnecting ? (
                <p className="relative m-auto">Connection to socket failed.</p>
            ) : (
                <p className="relative m-auto">Connecting to socket...</p>
            )}
        </main>
    )
}

export default App
