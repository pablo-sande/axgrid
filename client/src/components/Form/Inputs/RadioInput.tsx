import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'
import { RadioOption } from '../../../types/types'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'

type RadioInputProps = {
    fieldName: string
    label: string
    defaultValue: string
    radioOptions: RadioOption[]
    register: UseFormRegister<FieldValues>
    config: RegisterOptions
}

export const RadioInput = ({
    fieldName,
    label,
    defaultValue,
    radioOptions,
    register,
    config,
}: RadioInputProps) => {
    return (
        <FormControl aria-label={label}>
            <label htmlFor={fieldName}>{label}</label>
            <RadioGroup
                aria-labelledby={fieldName}
                row
                defaultValue={defaultValue}
            >
                {radioOptions?.map((o, index) => {
                    return (
                        <FormControlLabel
                            {...register(fieldName, config)}
                            key={fieldName + o.value + index}
                            control={<Radio />}
                            label={o.value}
                            value={o.value}
                        />
                    )
                })}
            </RadioGroup>
        </FormControl>
    )
}
