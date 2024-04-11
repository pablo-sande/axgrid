import { NavLink } from 'react-router-dom'
import { useGlobalContext } from '../contexts/GlobalContextProvider'
import AxpoLogo from './AxpoLogo'
import StorefrontIcon from '@mui/icons-material/Storefront'
import SellIcon from '@mui/icons-material/Sell'

const SideNav = () => {
    const { sidenavExpanded, setSidenavExpanded } = useGlobalContext()

    return (
        <div
            data-testid="side-nav"
            className={`flex flex-col h-full bg-gray-800 transition-all ${
                sidenavExpanded ? 'w-64' : 'w-14'
            }`}
        >
            <div className="flex flex-row w-full items-center h-14 border-b border-gray-700 px-2">
                <button
                    onClick={() => setSidenavExpanded(!sidenavExpanded)}
                    className="absolute left-3 text-white w-8 flex items-center transition-all hover:rotate-45 justify-start"
                >
                    <AxpoLogo />
                </button>
                <h1
                    className={`flex pl-12 align-center text-2xl font-semibold w-20 text-white`}
                >
                    {sidenavExpanded ? 'AxGrid' : ''}
                </h1>
            </div>
            <nav className="flex flex-col p-2 ">
                <NavLink
                    to="/"
                    data-testid="vendors-link"
                    className={({ isActive }) =>
                        `flex items-center space-x-2 p-2 h-12 text-gray-300 rounded-md ${
                            isActive ? 'bg-gray-700' : ''
                        }`
                    }
                >
                    <SellIcon />
                    {sidenavExpanded && (
                        <span className="text-lg">Vendors</span>
                    )}
                </NavLink>
                <NavLink
                    to="/customers"
                    data-testid="customers-link"
                    className={({ isActive }) =>
                        `flex items-center space-x-2 p-2 h-12 text-gray-300 rounded-md ${
                            isActive ? 'bg-gray-700' : ''
                        }`
                    }
                >
                    <StorefrontIcon />
                    {sidenavExpanded && (
                        <span className="text-lg">Customers</span>
                    )}
                </NavLink>
            </nav>
        </div>
    )
}

export default SideNav
