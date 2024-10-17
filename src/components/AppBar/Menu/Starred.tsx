import React, { useState, Fragment } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { MENU } from '~/data'
import Popover from '@mui/material/Popover'

const Starred: React.FC = () => {
  const starredList = MENU.starred
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const id = open ? 'starred-popover' : undefined

  return (
    <Fragment>
      <Button aria-describedby={id} endIcon={<ExpandMoreIcon />} onClick={e => setAnchorEl(e.currentTarget)}>
        Starred
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
          {starredList.map(item => (
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
                <Typography
                  variant="caption"
                  noWrap={true}
                  sx={{
                    display: 'block',
                    fontWeight: 'regular',
                    color: 'text.secondary'
                  }}
                >
                  {item.workplace}
                </Typography>
              </ListItemText>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {item.starred ? (
                  <StarIcon
                    sx={{
                      width: '16px',
                      height: '16px',
                      color: 'warning.light'
                    }}
                  />
                ) : (
                  <StarBorderIcon
                    sx={{
                      width: '16px',
                      height: '16px',
                      color: 'warning.light'
                    }}
                  />
                )}
              </Typography>
            </MenuItem>
          ))}
        </Box>
      </Popover>
    </Fragment>
  )
}

export default Starred
