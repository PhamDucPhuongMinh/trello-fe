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
import { BoardType } from '~/types'
import { capitalizeFirstLetter } from '~/utils'

type Props = {
  board: BoardType
}

const CHIP_STYLE = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    color: 'primary.50 '
  }
}

const BoardBar: React.FC<Props> = ({ board }) => {
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
        borderBottom: '1px solid white',
        paddingX: 2,
        backgroundColor: theme => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Chip icon={<DashboardIcon />} label={board.title} clickable sx={CHIP_STYLE} />
        <Chip icon={<VpnLockIcon />} label={capitalizeFirstLetter(board.type)} clickable sx={CHIP_STYLE} />
        <Chip icon={<AddToDriveIcon />} label="Add to Google Drive" clickable sx={CHIP_STYLE} />
        <Chip icon={<BoltIcon />} label="Automation" clickable sx={CHIP_STYLE} />
        <Chip icon={<FilterListIcon />} label="Filter" clickable sx={CHIP_STYLE} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          startIcon={<PersonAddIcon />}
          sx={{
            borderColor: 'white',
            color: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
          variant="outlined"
        >
          Invite
        </Button>
        <AvatarGroup
          max={4}
          sx={{
            gap: 1,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              border: 'none',
              color: 'white',
              '&:first-of-type': {
                bgcolor: '#a4b0be'
              }
            }
          }}
        >
          <Tooltip title="Milo" placement="top">
            <Avatar
              alt="Milo"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJX-r30P7mmA1o8qgUO6m22g9nylYc9NF1KQ&s"
            />
          </Tooltip>
          <Tooltip title="Phương Minh" placement="top">
            <Avatar
              alt="Phương Minh"
              src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/11/avatar-dep-18.jpg"
            />
          </Tooltip>
          <Tooltip title="Trúc Loan" placement="top">
            <Avatar
              alt="Trúc Loan"
              src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/11/avatar-dep-8.jpg"
            />
          </Tooltip>
          <Tooltip title="Michu" placement="top">
            <Avatar alt="Michu" src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/11/avatar-dep-42.jpg" />
          </Tooltip>
          <Tooltip title="Lona" placement="top">
            <Avatar alt="Lona" src="https://i.pinimg.com/736x/12/37/b3/1237b30268db9ee0c9cbe3a79b1ff8fa.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
