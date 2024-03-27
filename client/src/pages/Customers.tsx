import Trades from '../components/Trades'
import TradesContextComponent from '../contexts/TradesContextComponent'

const Customers = () => {
    return (
        <div className="w-[calc(100%-16rem)] h-screen overflow-hidden flex flex-col relative">
            <TradesContextComponent>
                <Trades />
            </TradesContextComponent>
        </div>
    )
}

export default Customers
