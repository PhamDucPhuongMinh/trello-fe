import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ListItemText from '@mui/material/ListItemText'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import DeleteIcon from '@mui/icons-material/Delete'
import Divider from '@mui/material/Divider'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

const COLUMN_HEIGHT_HEADER = '50px'
const COLUMN_HEIGHT_FOOTER = '56px'

const BoardContent: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box
      sx={{
        backgroundColor: theme => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: theme => theme.trello.boardContentHeight,
        p: '10px 0'
      }}
    >
      <Box
        sx={{
          background: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': {
            m: 2
          }
        }}
      >
        {/* Column 1 */}
        <Box
          sx={{
            width: 300,
            bgcolor: theme => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
            borderRadius: '6px',
            ml: 2,
            height: 'fit-content',
            maxHeight: theme => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} )`
          }}
        >
          {/* Box Column Header */}
          <Box
            sx={{
              height: COLUMN_HEIGHT_HEADER,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography sx={{ fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>Column Title</Typography>
            <Box>
              <Tooltip title="More options">
                <IconButton
                  sx={{ color: 'primary.main', cursor: 'pointer' }}
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Tooltip>

              <Menu
                id="basic-menu-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ⌘X
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ⌘C
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ⌘V
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Removelete this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* Box List Card */}
          <Box
            sx={{
              p: '0 5px',
              m: '0 5px',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              maxHeight: theme =>
                `calc(${theme.trello.boardContentHeight} - ${theme.spacing(
                  5
                )} - ${COLUMN_HEIGHT_HEADER} - ${COLUMN_HEIGHT_FOOTER})`,
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#ced0da'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#bfc2cf'
              }
            }}
          >
            <Card sx={{ cursor: 'pointer', overflow: 'unset', boxShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://d3design.vn/uploads/Anh_bia_summer_sale_holiday_podium_display_on_yellow_background.jpg"
                title="green iguana"
              />
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Lizard</Typography>
              </CardContent>
              <CardActions sx={{ padding: '0 4px 8px 4px' }}>
                <Button size="small" startIcon={<GroupIcon />}>
                  20
                </Button>
                <Button size="small" startIcon={<CommentIcon />}>
                  20
                </Button>
                <Button size="small" startIcon={<AttachmentIcon />}>
                  20
                </Button>
              </CardActions>
            </Card>
            <Card sx={{ cursor: 'pointer', overflow: 'unset', boxShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Lizard</Typography>
              </CardContent>
            </Card>

            <Card sx={{ cursor: 'pointer', overflow: 'unset', boxShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Lizard</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', overflow: 'unset', boxShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Lizard</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', overflow: 'unset', boxShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Lizard</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', overflow: 'unset', boxShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Lizard</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', overflow: 'unset', boxShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Lizard</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', overflow: 'unset', boxShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Lizard</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', overflow: 'unset', boxShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Lizard</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', overflow: 'unset', boxShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Lizard</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', overflow: 'unset', boxShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Lizard</Typography>
              </CardContent>
            </Card>
          </Box>
          {/* Box Column Footer */}
          <Box
            sx={{
              height: COLUMN_HEIGHT_FOOTER,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Button startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon />
            </Tooltip>
          </Box>
        </Box>
        {/* Column s */}
        <Box
          sx={{
            width: 300,
            bgcolor: theme => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
            borderRadius: '6px',
            ml: 2,
            height: 'fit-content',
            maxHeight: theme => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} )`
          }}
        >
          {/* Box Column Header */}
          <Box
            sx={{
              height: COLUMN_HEIGHT_HEADER,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography sx={{ fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>Column Title</Typography>
            <Box>
              <Tooltip title="More options">
                <IconButton
                  sx={{ color: 'primary.main', cursor: 'pointer' }}
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Tooltip>

              <Menu
                id="basic-menu-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ⌘X
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ⌘C
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ⌘V
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Removelete this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* Box List Card */}
          <Box
            sx={{
              p: '0 5px',
              m: '0 5px',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              maxHeight: theme =>
                `calc(${theme.trello.boardContentHeight} - ${theme.spacing(
                  5
                )} - ${COLUMN_HEIGHT_HEADER} - ${COLUMN_HEIGHT_FOOTER})`,
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#ced0da'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#bfc2cf'
              }
            }}
          >
            <Card sx={{ cursor: 'pointer', overflow: 'unset', boxShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://d3design.vn/uploads/Anh_bia_summer_sale_holiday_podium_display_on_yellow_background.jpg"
                title="green iguana"
              />
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Lizard</Typography>
              </CardContent>
              <CardActions sx={{ padding: '0 4px 8px 4px' }}>
                <Button size="small" startIcon={<GroupIcon />}>
                  20
                </Button>
                <Button size="small" startIcon={<CommentIcon />}>
                  20
                </Button>
                <Button size="small" startIcon={<AttachmentIcon />}>
                  20
                </Button>
              </CardActions>
            </Card>
            <Card sx={{ cursor: 'pointer', overflow: 'unset', boxShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Lizard</Typography>
              </CardContent>
            </Card>
          </Box>
          {/* Box Column Footer */}
          <Box
            sx={{
              height: COLUMN_HEIGHT_FOOTER,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Button startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon />
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default BoardContent
