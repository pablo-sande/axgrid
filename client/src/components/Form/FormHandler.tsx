import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { EnergyTypes, Trade } from '../../types/types.ts'
import { Button, Dialog } from '@mui/material'
import { useId, useState } from 'react'
import EnergyTypeSelector from '../EnergyTypeSelector.tsx'
import useTradeApi from '../../hooks/useApi.ts'
import { Form } from './Form'
import { useGlobalContext } from '../../contexts/GlobalContextProvider.tsx'

type FormProps = {
    closeForm: (close: boolean) => void
}
export const FormHandler = ({ closeForm }: FormProps) => {
    const [typeSelected, setTypeSelected] = useState<EnergyTypes>(null)
    const { setAlertMessage } = useGlobalContext()
    const API_URL = import.meta.env.VITE_API_URL
    const API_PORT = import.meta.env.VITE_API_PORT
    const { makeRequest, error: returnError } = useTradeApi({
        url: `${API_URL}:${API_PORT}/trades/add`,
        method: 'POST',
    })
    const formMethods = useForm()
    const { handleSubmit } = formMethods
    const id = useId()

    const submitFunction = async (data: Trade) => {
        data.id = id
        data.energyType = typeSelected
        data.status = 'PENDING'

        await makeRequest(data)

        if (returnError) {
            console.error('Error submitting form', returnError)
            alert('Error submitting form')
        }

        setAlertMessage({
            message: 'Trade added successfully',
            severity: 'success',
            isOpen: true,
        })
        closeForm(true)
    }

    return (
        <Dialog open={true} onClose={() => {}} fullWidth={true}>
            {!typeSelected ? (
                <>
                    <EnergyTypeSelector setTypeSelected={setTypeSelected} />
                    <Button onClick={() => closeForm(true)}>Cancel</Button>
                </>
            ) : (
                <Form
                    handleSubmit={handleSubmit(
                        submitFunction as SubmitHandler<FieldValues>
                    )}
                    typeSelected={typeSelected}
                    formMethods={formMethods}
                    closeForm={closeForm}
                    aria-label="form"
                />
            )}
        </Dialog>
    )
}
