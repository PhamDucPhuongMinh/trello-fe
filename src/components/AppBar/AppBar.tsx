import React, { useState } from 'react'
import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import TrelloIcon from '~/assets/trello.svg?react'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menu/Workspaces'
import Recent from './Menu/Recent'
import Starred from './Menu/Starred'
import Templates from './Menu/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Tooltip from '@mui/material/Tooltip'
import Profile from './Menu/Profile'
import Drawer from '@mui/material/Drawer'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'
import SearchIcon from '@mui/icons-material/Search'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import CloseIcon from '@mui/icons-material/Close'
import { MENU } from '~/data'

const AppBar: React.FC = () => {
  const [isShowMenuDrawer, setIsShowMenuDrawer] = useState(false)
  const [isShowSearchDrawer, setIsShowSearchDrawer] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  return (
    <Box
      sx={{
        width: '100%',
        height: theme => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        paddingX: 2,
        overflowX: 'auto',
        backgroundColor: theme => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <AppsIcon
          sx={{
            color: 'white',
            cursor: 'pointer',
            display: {
              xs: 'block',
              md: 'none'
            }
          }}
          onClick={() => setIsShowMenuDrawer(true)}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon fontSize="small" component={TrelloIcon} sx={{ color: 'white' }} inheritViewBox />
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: 'white'
            }}
          >
            Trello
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
        </Box>

        <Button variant="outlined" sx={{ color: 'white', border: 'none' }} startIcon={<LibraryAddIcon />}>
          Create
        </Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <TextField
          id="outlined-search"
          size="small"
          label="Search..."
          type="text"
          sx={{
            minWidth: '120px',
            display: {
              xs: 'none',
              md: 'block'
            },
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' }
            }
          }}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          slotProps={{
            input: {
              startAdornment: <SearchIcon sx={{ color: 'white' }} />,
              endAdornment: (
                <CloseIcon
                  fontSize="small"
                  sx={{ color: searchValue === '' ? 'transparent' : 'white', cursor: 'pointer' }}
                  onClick={() => setSearchValue('')}
                />
              )
            }
          }}
        />
        <Tooltip title="Notifications">
          <Badge
            color="error"
            sx={{
              cursor: 'pointer',
              display: {
                xs: 'inline-flex',
                md: 'none'
              }
            }}
          >
            <SearchIcon sx={{ color: 'white' }} onClick={() => setIsShowSearchDrawer(true)} />
          </Badge>
        </Tooltip>

        <ModeSelect />
        <Tooltip title="Notifications">
          <Badge color="error" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white', display: { xs: 'none', sm: 'block' } }} />
        </Tooltip>
        <Profile />
      </Box>

      <Drawer open={isShowSearchDrawer} anchor="top" onClose={() => setIsShowSearchDrawer(false)}>
        <Box
          sx={{
            paddingX: 2,
            paddingY: 4
          }}
        >
          <TextField id="outlined-search" size="small" label="Search..." type="search" sx={{ width: '100%' }} />
        </Box>
      </Drawer>

      <Drawer open={isShowMenuDrawer} onClose={() => setIsShowMenuDrawer(false)}>
        <Box sx={{ minHeight: 352, minWidth: 250 }}>
          <SimpleTreeView>
            <TreeItem itemId="workspaces" label="Workspaces">
              <TreeItem itemId="workspaces-recent" label="Recent">
                {MENU.workspaces.recent.map(item => (
                  <TreeItem key={item.id} itemId={`workspaces-recent-${item.id}`} label={item.name} />
                ))}
              </TreeItem>
              <TreeItem itemId="workspaces-your-workspaces" label="Your workspaces">
                {MENU.workspaces.yourWorkspaces.map(item => (
                  <TreeItem key={item.id} itemId={`workspaces-your-workspaces-${item.id}`} label={item.name} />
                ))}
              </TreeItem>
            </TreeItem>
            <TreeItem itemId="recent" label="Recent">
              {MENU.recent.map(item => (
                <TreeItem key={item.id} itemId={`recent-${item.id}`} label={item.name} />
              ))}
            </TreeItem>
            <TreeItem itemId="starred" label="Starred">
              {MENU.starred.map(item => (
                <TreeItem key={item.id} itemId={`starred-${item.id}`} label={item.name} />
              ))}
            </TreeItem>
            <TreeItem itemId="tenplates" label="Templates">
              {MENU.templates.map(item => (
                <TreeItem key={item.id} itemId={`templates-${item.id}`} label={item.name} />
              ))}
            </TreeItem>
          </SimpleTreeView>
        </Box>
      </Drawer>
    </Box>
  )
}

export default AppBar
