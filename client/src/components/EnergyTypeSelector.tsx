import {
    Box,
    FormControl,
    MenuItem,
    SelectChangeEvent,
    TextField,
} from '@mui/material'
import { EnergyTypes, energyTypes } from '../types/types'

type EnergyTypeSelectorProps = {
    setTypeSelected: (type: EnergyTypes) => void
}

const EnergyTypeSelector = ({ setTypeSelected }: EnergyTypeSelectorProps) => {
    const handleChange = (event: SelectChangeEvent) => {
        setTypeSelected(event.target.value as EnergyTypes)
    }

    return (
        <div className="p-8 w-full flex flex-col">
            <h2 className="pb-8 text-2xl">Select Energy Type</h2>

            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <TextField
                        className="bg-white text-black"
                        label="Energy Type"
                        inputProps={{ 'data-testid': 'energy-selector' }}
                        value={''}
                        select
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            handleChange(event)
                        }}
                    >
                        {energyTypes.map((type, index) => (
                            <MenuItem
                                key={index}
                                className=" font-bold py-2"
                                value={type || ''}
                            >
                                {type
                                    ?.charAt(0)
                                    .concat(type?.substring(1).toLowerCase())}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>
            </Box>
        </div>
    )
}

export default EnergyTypeSelector
