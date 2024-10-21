import React from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { BoardType } from '~/types'
import { mapOrder } from '~/utils'

type Props = {
  board: BoardType
}

const BoardContent: React.FC<Props> = ({ board }) => {
  const orderedColumns = mapOrder(board.columns, board.columnOrderIds, '_id')
  return (
    <Box
      sx={{
        backgroundColor: theme => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: theme => theme.trello.boardContentHeight,
        p: '10px 0'
      }}
    >
      <ListColumns columns={orderedColumns} />
    </Box>
  )
}

export default BoardContent
