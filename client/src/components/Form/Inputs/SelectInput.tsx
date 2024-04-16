import { MenuItem, TextField } from '@mui/material'
import { SelectOption } from '../../../types/types'
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'

type SelectInputProps = {
    fieldName: string
    label: string
    defaultValue: string
    selectOptions: SelectOption[]
    register: UseFormRegister<FieldValues>
    config: RegisterOptions
}

export const SelectInput = ({
    fieldName,
    label,
    defaultValue,
    selectOptions,
    register,
    config,
}: SelectInputProps) => {
    return (
        <TextField
            label={label}
            select
            {...register(fieldName, config)}
            defaultValue={defaultValue}
            className="bg-white"
        >
            {selectOptions.map((o) => {
                if (typeof o.value !== 'string') {
                    return <></>
                }
                return (
                    <MenuItem key={o.label + o.value} value={o.value}>
                        <label>{o.label}</label>
                    </MenuItem>
                )
            })}
        </TextField>
    )
}
