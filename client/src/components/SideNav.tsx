// This is a really cheap SideNav that I made so I could
// invest more time in the core features of the app
// It's not responsive and it's not using any state management
const SideNav = () => {
    return (
        <div>
            <div className="flex flex-col w-64 h-full bg-gray-800">
                <div className="flex items-center justify-center h-14 border-b border-gray-700">
                    <h1 className="text-2xl font-semibold text-white">
                        AxGrid
                    </h1>
                </div>
                <nav className="flex flex-col p-4">
                    <a
                        href="/"
                        className={`flex items-center space-x-2 px-4 py-2 text-gray-300 rounded-md ${
                            window.location.pathname === '/'
                                ? 'bg-gray-700'
                                : ''
                        }`}
                    >
                        <span className="text-lg">Vendors</span>
                    </a>
                    <a
                        href="/customers"
                        className={`flex items-center space-x-2 px-4 py-2 text-gray-300 rounded-md ${
                            window.location.pathname === '/customers'
                                ? 'bg-gray-700'
                                : ''
                        }`}
                    >
                        <span className="text-lg">Customers</span>
                    </a>
                </nav>
            </div>
        </div>
    )
}

export default SideNav
