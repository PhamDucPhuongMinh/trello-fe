import React from 'react'
import { useColorScheme } from '@mui/material/styles'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import Tooltip from '@mui/material/Tooltip'

const ModeSelect: React.FC = () => {
  const { mode, setMode } = useColorScheme()

  const handleChange = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }

  if (!mode) {
    return null
  }

  return (
    <Tooltip
      title={`Turn ${mode === 'light' ? 'dark' : 'light'} mode on`}
      sx={{ color: 'primary.main', cursor: 'pointer' }}
      onClick={handleChange}
    >
      {mode === 'light' ? (
        <LightModeOutlinedIcon sx={{ color: 'white', cursor: 'pointer' }} />
      ) : (
        <DarkModeOutlinedIcon sx={{ color: 'white', cursor: 'pointer' }} />
      )}
    </Tooltip>
  )
}

export default ModeSelect
