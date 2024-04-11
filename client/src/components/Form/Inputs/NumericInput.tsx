import TextField from '@mui/material/TextField'
import { SelectUnits } from '../../../types/types'
import Input from '@mui/material/Input'
import MenuItem from '@mui/material/MenuItem'
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'

type NumericInputProps = {
    fieldName: string
    label: string
    defaultValue: number
    units?: SelectUnits[]
    register: UseFormRegister<FieldValues>
    config: RegisterOptions
}

export const NumericInput = ({
    fieldName,
    label,
    defaultValue,
    units,
    register,
    config,
}: NumericInputProps) => {
    return (
        <div className="flex flex-row w-full items-center">
            <div className="flex flex-col w-full">
                <label htmlFor={fieldName}>{label}</label>
                <Input
                    id={fieldName}
                    type="number"
                    {...register(
                        (units && units.length && `${fieldName}.value`) ||
                            fieldName,
                        config
                    )}
                    defaultValue={defaultValue}
                    className="bg-white w-full"
                />
            </div>
            {units && units.length ? (
                <div className="flex flex-col ml-4 min-w-26">
                    <TextField
                        label="Units"
                        select
                        {...register(`${fieldName}.units`, config)}
                        defaultValue={units[0].label}
                    >
                        {units.map((unit, index) => (
                            <MenuItem
                                key={unit.label + index}
                                value={unit.label}
                            >
                                <label>{unit.label}</label>
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            ) : null}
        </div>
    )
}
