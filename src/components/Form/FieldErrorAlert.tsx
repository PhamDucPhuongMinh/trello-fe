import Alert from '@mui/material/Alert'
import { FieldErrors } from 'react-hook-form'

type Props = {
  errors: FieldErrors
  fieldName: string
}

const FieldErrorAlert: React.FC<Props> = ({ errors, fieldName }) => {
  if (!errors || !errors[fieldName]) return null
  return (
    <Alert severity="error" sx={{ mt: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}>
      {typeof errors[fieldName]?.message === 'string' ? errors[fieldName]?.message : null}
    </Alert>
  )
}

export default FieldErrorAlert
