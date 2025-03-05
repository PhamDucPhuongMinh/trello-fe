import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import React from 'react'

type Props = {
  caption: string
}

const PageLoadingSpinner: React.FC<Props> = ({ caption }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2
      }}
    >
      <CircularProgress />
      <Typography>{caption}</Typography>
    </Box>
  )
}

export default PageLoadingSpinner
