import { DynamicFields } from './DynamicFields'
import { ErrorMessage } from '@hookform/error-message'
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'
import Button from '@mui/material/Button/Button'
import { EnergyTypes } from '../../types/types'
import {
    getFormFields,
    validateDynamicFormFields,
} from '../../utils/form-fields'
import { useGlobalContext } from '../../contexts/GlobalContextProvider'

type FormProps = {
    handleSubmit: any
    typeSelected: EnergyTypes
    formMethods: UseFormReturn<FieldValues, any, undefined>
    closeForm: (close: boolean) => void
}

export const Form = ({
    handleSubmit,
    typeSelected,
    formMethods,
    closeForm,
}: FormProps) => {
    const { setAlertMessage } = useGlobalContext()
    const fields = getFormFields(typeSelected)

    if (!validateDynamicFormFields(fields)) {
        console.error('Invalid form fields')
        setAlertMessage({
            message: 'Invalid form fields',
            severity: 'error',
            isOpen: true,
        })
        closeForm(true)
        return null
    }

    return (
        <form
            onSubmit={handleSubmit}
            aria-label="form"
            className="flex-col p-4 bg-gray-200 rounded-lg block w-full m-auto"
        >
            <h2 className="text-2xl mb-4">Enter Trade Details</h2>
            <FormProvider {...formMethods}>
                {fields?.map((field, i) => (
                    <div
                        key={i}
                        className="px-4 py-2 my-2 flex flex-col w-full shadow-md rounded-md bg-white"
                    >
                        <DynamicFields {...field} />

                        <ErrorMessage
                            errors={formMethods.formState.errors}
                            name={field.fieldName || field.label}
                        />
                    </div>
                ))}
            </FormProvider>

            <div className="flex flex-row w-full items-center justify-evenly">
                <Button
                    type="submit"
                    disabled={formMethods.formState.isSubmitting}
                >
                    {formMethods.formState.isSubmitting
                        ? 'Submitting'
                        : 'Submit'}
                </Button>

                <Button
                    disabled={formMethods.formState.isSubmitting}
                    onClick={() => closeForm(true)}
                >
                    Cancel
                </Button>
            </div>
        </form>
    )
}
