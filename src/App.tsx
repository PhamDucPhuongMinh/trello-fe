import React from 'react'
import Button from '@mui/material/Button'
import HomeIcon from '@mui/icons-material/Home'
import { pink } from '@mui/material/colors'

const App: React.FC = () => {
  return (
    <>
      <div>Hello Minh</div>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>

      <br />
      <HomeIcon />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon sx={{ color: pink[100] }} />
    </>
  )
}

export default App
