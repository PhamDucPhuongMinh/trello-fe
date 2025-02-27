import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { ColumnType } from '~/types'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { createColumnAPI } from '~/apis'
import { generatePlaceholcerCard } from '~/utils/formatter'
import { cloneDeep } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { selectActiveBoard, updateActiveBoard } from '~/redux/activeBoard/activeBoardSlice'

type Props = {
  columns: ColumnType[]
}

const ListColumns: React.FC<Props> = ({ columns }) => {
  const dispatch = useDispatch()
  const board = useSelector(selectActiveBoard)
  const [isOpenCreateColumnForm, setIsOpenCreateColumnForm] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  const handleAddNewColumn = async () => {
    if (newColumnTitle.trim() === '') {
      toast.error('Column title is required')
      return
    }

    if (board) {
      const createdColumn: ColumnType = await createColumnAPI({ boardId: board._id, title: newColumnTitle })

      // Thêm card rỗng để có thể kéo thả card vào column
      createdColumn.cards = [generatePlaceholcerCard(createdColumn)]
      createdColumn.cardOrderIds = [generatePlaceholcerCard(createdColumn)._id]

      const newBoard = cloneDeep(board)
      newBoard.columns.push(createdColumn)
      newBoard.columnOrderIds.push(createdColumn._id)
      dispatch(updateActiveBoard(newBoard))

      setNewColumnTitle('')
      setIsOpenCreateColumnForm(false)
    }
  }

  return (
    <SortableContext items={columns.map(item => item._id)} strategy={horizontalListSortingStrategy}>
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
        {columns.map(column => (
          <Column key={column._id} column={column} />
        ))}

        {!isOpenCreateColumnForm ? (
          <Box
            sx={{
              maxWidth: '250px',
              minWidth: '250px',
              mx: 2,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d'
            }}
          >
            <Button
              startIcon={<NoteAddIcon />}
              sx={{ color: 'white', width: '100%', justifyContent: 'flex-start', pl: 2.5, py: 1 }}
              onClick={() => setIsOpenCreateColumnForm(prev => !prev)}
            >
              Add new column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              p: 1,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <TextField
              size="small"
              label="Enter column title ..."
              type="text"
              variant="outlined"
              autoFocus
              sx={{
                '& .MuiInputBase-root': { width: '100%' },
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                }
              }}
              value={newColumnTitle}
              onChange={e => setNewColumnTitle(e.target.value)}
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
                onClick={handleAddNewColumn}
              >
                Add column
              </Button>
              <CloseIcon
                fontSize="small"
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': {
                    color: theme => theme.palette.warning.light
                  }
                }}
                onClick={() => setIsOpenCreateColumnForm(prev => !prev)}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}

export default ListColumns
