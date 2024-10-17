import React, { useState } from 'react'
import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect'
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
import { MENU } from '~/data'

const AppBar: React.FC = () => {
  const [isShowMenuDrawer, setIsShowMenuDrawer] = useState(false)
  const [isShowSearchDrawer, setIsShowSearchDrawer] = useState(false)

  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: theme => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        overflowX: 'auto',
        paddingY: 0
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <AppsIcon
          sx={{
            color: 'primary.main',
            cursor: 'pointer',
            display: {
              xs: 'block',
              md: 'none'
            }
          }}
          onClick={() => setIsShowMenuDrawer(true)}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon fontSize="small" component={TrelloIcon} sx={{ color: 'primary.main' }} inheritViewBox />
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: 'primary.main'
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

        <Button variant="outlined">Create</Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <TextField
          id="outlined-search"
          size="small"
          label="Search..."
          type="search"
          sx={{
            minWidth: '120px',
            display: {
              xs: 'none',
              md: 'block'
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
            <SearchIcon sx={{ color: 'primary.main' }} onClick={() => setIsShowSearchDrawer(true)} />
          </Badge>
        </Tooltip>

        <ModeSelect />
        <Tooltip title="Notifications">
          <Badge color="error" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'primary.main', display: { xs: 'none', sm: 'block' } }} />
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
