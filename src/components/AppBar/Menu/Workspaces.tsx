import React, { Fragment, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Popover from '@mui/material/Popover'
import { MENU } from '~/data'

const Workspaces: React.FC = () => {
  const workspacesList = MENU.workspaces
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const id = open ? 'workspaces-popover' : undefined

  return (
    <Fragment>
      <Button aria-describedby={id} endIcon={<ExpandMoreIcon />} onClick={e => setAnchorEl(e.currentTarget)}>
        Workspaces
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
          <Typography sx={{ paddingX: 2, fontWeight: 'medium' }} variant="caption">
            Recent
          </Typography>
          {workspacesList.recent.map(item => (
            <MenuItem key={item.id} sx={{ gap: 1.5 }}>
              <ListItemIcon>
                <Avatar
                  sx={{
                    bgcolor: item.thumbnail,
                    height: '40px',
                    width: '40px'
                  }}
                  variant="rounded"
                >
                  {item.name[0]}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  variant: 'body2',
                  fontWeight: 'medium',
                  noWrap: true
                }}
              >
                {item.name}
              </ListItemText>
            </MenuItem>
          ))}
          <Divider />
          <Typography sx={{ paddingX: 2, fontWeight: 'medium' }} variant="caption">
            Your workspaces
          </Typography>
          {workspacesList.yourWorkspaces.map(item => (
            <MenuItem key={item.id} sx={{ gap: 1.5 }}>
              <ListItemIcon>
                <Avatar
                  sx={{
                    bgcolor: item.thumbnail,
                    height: '40px',
                    width: '40px'
                  }}
                  variant="rounded"
                >
                  {item.name[0]}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  variant: 'body2',
                  fontWeight: 'medium',
                  noWrap: true
                }}
              >
                {item.name}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </Popover>
    </Fragment>
  )
}

export default Workspaces
