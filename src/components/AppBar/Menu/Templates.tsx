import React, { Fragment, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'
import Popover from '@mui/material/Popover'
import { MENU } from '~/data'

const Templates: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const templateList = MENU.templates
  const open = Boolean(anchorEl)
  const id = open ? 'templates-popover' : undefined

  return (
    <Fragment>
      <Button
        aria-describedby={id}
        sx={{ color: 'white' }}
        endIcon={<ExpandMoreIcon />}
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        Templates
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        slotProps={{ paper: { sx: { width: 300, paddingY: 1 } } }}
      >
        <Box>
          {templateList.map(item => (
            <MenuItem key={item.id} sx={{ gap: 1.5 }}>
              <ListItemIcon>
                <Box
                  sx={{
                    backgroundColor: item.thumbnail,
                    width: '40px',
                    height: '32px',
                    borderRadius: '4px'
                  }}
                />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2" noWrap={true} sx={{ marginBottom: 0, fontWeight: 'medium' }}>
                  {item.name}
                </Typography>
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </Popover>
    </Fragment>
  )
}

export default Templates
