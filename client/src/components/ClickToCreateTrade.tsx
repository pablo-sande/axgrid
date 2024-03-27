import { useState } from 'react'
import { FormHandler } from './FormHandler.tsx'
import AxpoLogo from './AxpoLogo.tsx'

const ClickToCreateTrade = () => {
    const [showForm, setShowForm] = useState(false)

    return (
        <div className="w-full h-full p-12 flex flex-col items-center justify-center">
            {
                <div
                    className="size-72 axpo-logo cursor-pointer"
                    onClick={() => setShowForm(true)}
                >
                    <AxpoLogo />
                </div>
            }

            <h2 className="text-2xl pt-6 font-bold">
                Click to create a new Trade
            </h2>

            {showForm ? (
                <FormHandler closeForm={() => setShowForm(false)} />
            ) : null}
        </div>
    )
}

export default ClickToCreateTrade
