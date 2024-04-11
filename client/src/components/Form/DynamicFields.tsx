import { useFormContext } from 'react-hook-form'
import { DynamicFieldData } from '../../types/types'
import { TextField, Input } from '@mui/material'
import { NumericInput, CheckboxInput, RadioInput, SelectInput } from './Inputs'

export const DynamicFields = ({
    inputType = 'text',
    fieldName = '',
    label = '',
    defaultValue,
    selectOptions = [],
    radioOptions = [],
    config = {},
    units,
}: DynamicFieldData) => {
    const { register } = useFormContext()

    switch (inputType) {
        case 'number':
            return (
                <NumericInput
                    {...{
                        fieldName,
                        label,
                        defaultValue,
                        units,
                        register,
                        config,
                    }}
                />
            )

        case 'date':
            return (
                <>
                    <label htmlFor={fieldName}>{label}</label>
                    <Input
                        id={fieldName}
                        type={inputType}
                        {...register(fieldName, config)}
                        defaultValue={defaultValue}
                        className="bg-white"
                    />
                </>
            )

        case 'text':
            return (
                <TextField
                    label={label}
                    type={inputType}
                    {...register(fieldName, config)}
                    defaultValue={defaultValue}
                    className="bg-white"
                />
            )

        case 'select': {
            return (
                <SelectInput
                    {...{
                        fieldName,
                        label,
                        defaultValue,
                        selectOptions,
                        register,
                        config,
                    }}
                />
            )
        }

        case 'checkbox': {
            return (
                <CheckboxInput
                    {...{ fieldName, label, selectOptions, register, config }}
                />
            )
        }

        case 'radio': {
            return (
                <RadioInput
                    {...{
                        fieldName,
                        label,
                        defaultValue,
                        radioOptions,
                        register,
                        config,
                    }}
                />
            )
        }

        default:
            return (
                <>
                    <TextField
                        label={label}
                        type="text"
                        {...register(fieldName, config)}
                        defaultValue={defaultValue}
                    />
                </>
            )
    }
}
