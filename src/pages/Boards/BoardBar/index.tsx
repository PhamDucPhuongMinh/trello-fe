import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import React from 'react'
import AvatarGroup from '@mui/material/AvatarGroup'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const CHIP_STYLE = {
  color: 'primary.main',
  bgcolor: 'white',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': {
    color: 'primary.50 '
  }
}

const BoardBar: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: theme => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        overflowX: 'auto',
        borderTop: '1px solid #1976d2',
        paddingX: 2
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Chip icon={<DashboardIcon />} label="Michu" clickable sx={CHIP_STYLE} />
        <Chip icon={<VpnLockIcon />} label="Public/Private Workspace" clickable sx={CHIP_STYLE} />
        <Chip icon={<AddToDriveIcon />} label="Add to Google Drive" clickable sx={CHIP_STYLE} />
        <Chip icon={<BoltIcon />} label="Automation" clickable sx={CHIP_STYLE} />
        <Chip icon={<FilterListIcon />} label="Filter" clickable sx={CHIP_STYLE} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button startIcon={<PersonAddIcon />} variant="outlined">
          Invite
        </Button>
        <AvatarGroup
          max={4}
          sx={{
            '& .MuiAvatar-root': {
              width: 32,
              height: 32
            }
          }}
        >
          <Tooltip title="Phương Minh" placement="top">
            <Avatar alt="Phương Minh" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="Trúc Loan" placement="top">
            <Avatar alt="Trúc Loan" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="Michu" placement="top">
            <Avatar alt="Michu" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="Lona" placement="top">
            <Avatar alt="Lona" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="Milo" placement="top">
            <Avatar alt="Milo" src="/static/images/avatar/1.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
