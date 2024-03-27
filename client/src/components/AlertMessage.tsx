import Alert from '@mui/material/Alert/Alert'
import CheckIcon from '@mui/icons-material/Check'
import { AlertMessageType } from '../types/types'

type MessageProps = {
    children?: string
    alertMessage: AlertMessageType
    setAlertMessage: (message: AlertMessageType) => void
}

const AlertMessage = ({
    children,
    alertMessage,
    setAlertMessage,
}: MessageProps) => {
    if (!alertMessage.isOpen) {
        return null
    }

    setTimeout(() => {
        setAlertMessage({ ...alertMessage, isOpen: false })
    }, 3000)

    return (
        <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity={alertMessage.severity}
        >
            {alertMessage.message || children}
        </Alert>
    )
}

export default AlertMessage
