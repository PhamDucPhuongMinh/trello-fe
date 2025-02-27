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
import Button from '@mui/material/Button'
import ListCards from './ListCards/ListCards'
import { ColumnType } from '~/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import { useDispatch, useSelector } from 'react-redux'
import { selectActiveBoard, updateActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { createCardAPI, deleteColumnAPI } from '~/apis'
import { cloneDeep } from 'lodash'

type Props = {
  column: ColumnType
}

const Column: React.FC<Props> = ({ column }) => {
  const dispatch = useDispatch()
  const board = useSelector(selectActiveBoard)
  const orderedCards = column.cards // Đã được sắp xếp theo CardOrderIds ở Board component (_id.tsx)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleOpenOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseOption = () => {
    setAnchorEl(null)
  }

  const [isOpenCreateCardForm, setIsOpenCreateCardForm] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState('')

  const handleAddNewCard = async () => {
    if (newCardTitle.trim() === '') {
      toast.error('Card title is required', {
        position: 'bottom-right'
      })
      return
    }

    if (board) {
      const createdCard = await createCardAPI({ boardId: board._id, columnId: column._id, title: newCardTitle })

      const newBoard = cloneDeep(board)
      const newColumn = newBoard.columns.find(c => c._id === column._id)
      if (newColumn) {
        if (newColumn.cards.length === 1 && newColumn.cards[0].FE_placeholder) {
          newColumn.cards = []
          newColumn.cardOrderIds = []
        }
        newColumn.cards.push(createdCard)
        newColumn.cardOrderIds.push(createdCard._id)
      }
      dispatch(updateActiveBoard(newBoard))
    }

    setNewCardTitle('')
    setIsOpenCreateCardForm(false)
  }

  const confirmDeleteColumn = useConfirm()
  const handleDeleteColumn = () => {
    confirmDeleteColumn({
      title: 'Delete Column? ',
      description: 'This is will delete your Column and its cards! Are you sure?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel'
    })
      .then(() => {
        if (board) {
          const newBoard = cloneDeep(board)
          newBoard.columns = newBoard.columns.filter(c => c._id !== column._id)
          newBoard.columnOrderIds = newBoard.columnOrderIds.filter(id => id !== column._id)
          dispatch(updateActiveBoard(newBoard))
          deleteColumnAPI(column._id).then(res => toast.success(res?.deleteResult))
        }
      })
      .catch(() => {})
  }

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })

  const dndKitColumnStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%', // Chiều cao phải luôn max 100% vì nếu không sẽ bị lỗi khi kéo 1 column ngắn qua vị trí của 1 column dài thì phải kéo ở khu vực giữa. Lưu ý kết hợp với { lisners } ở Box chứ không phải ở div ngoài cùng
    opacity: isDragging ? 0.5 : 1
  }

  return (
    // Phải bọc div ở đây vì vấn đề chiều cao của column khi kéo column ngắn qua column dài hơn
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        {...listeners}
        sx={{
          maxWidth: '300px',
          minWidth: '300px',
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
            height: theme => theme.trello.columnHeightHeader,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography sx={{ fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>{column.title}</Typography>
          <Box>
            <Tooltip title="More options">
              <IconButton
                sx={{ color: 'primary.main', cursor: 'pointer' }}
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpenOption}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Tooltip>

            <Menu
              id="basic-menu-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseOption}
              onClick={handleCloseOption}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}
            >
              <MenuItem
                sx={{
                  '&:hover': {
                    color: 'success.light',
                    '& .add-card-icon': { color: 'success.light' }
                  }
                }}
                onClick={() => setIsOpenCreateCardForm(prev => !prev)}
              >
                <ListItemIcon>
                  <AddCardIcon fontSize="small" className="add-card-icon" />
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
              <MenuItem
                onClick={handleDeleteColumn}
                sx={{
                  '&:hover': {
                    color: 'warning.dark',
                    '& .delete-icon': { color: 'warning.dark' }
                  }
                }}
              >
                <ListItemIcon>
                  <DeleteIcon fontSize="small" className="delete-icon" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
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
        <ListCards cards={orderedCards} />
        {/* Box Column Footer */}
        <Box
          sx={{
            height: theme => theme.trello.columnHeightFooter,
            p: 2
          }}
        >
          {!isOpenCreateCardForm ? (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Button startIcon={<AddCardIcon />} onClick={() => setIsOpenCreateCardForm(prev => !prev)}>
                Add new card
              </Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon />
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1
              }}
            >
              <TextField
                size="small"
                label="Enter card title ..."
                type="text"
                variant="outlined"
                autoFocus
                data-no-dnd="true"
                sx={{
                  '& label': { color: 'text.primary' },
                  '& input': {
                    color: theme => theme.palette.primary.main,
                    bgColor: theme => (theme.palette.mode === 'dark' ? '#333643' : 'white')
                  },
                  '& label.Mui-focused': { color: theme => theme.palette.primary.main },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: theme => theme.palette.primary.main },
                    '&:hover fieldset': { borderColor: theme => theme.palette.primary.main },
                    '&.Mui-focused fieldset': { borderColor: theme => theme.palette.primary.main }
                  },
                  '& .MuiOutlinedInput-input': { borderRadius: 1 }
                }}
                value={newCardTitle}
                onChange={e => setNewCardTitle(e.target.value)}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  className="interceptor-loading"
                  variant="contained"
                  color="success"
                  size="small"
                  sx={{
                    boxShadow: 'none',
                    border: '0.5px solid',
                    borderColor: theme => theme.palette.success.main,
                    '&:hover': {
                      bgColor: theme => theme.palette.success.main
                    }
                  }}
                  onClick={handleAddNewCard}
                >
                  Add
                </Button>
                <CloseIcon
                  fontSize="small"
                  sx={{
                    cursor: 'pointer',
                    color: theme => theme.palette.warning.light
                  }}
                  onClick={() => setIsOpenCreateCardForm(prev => !prev)}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  )
}

export default Column
