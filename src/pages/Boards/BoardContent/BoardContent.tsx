import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { BoardType, ColumnType } from '~/types'
import { mapOrder } from '~/utils'
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

type Props = {
  board: BoardType
}

const BoardContent: React.FC<Props> = ({ board }) => {
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } }) // Mouse di chuyên 10px mới bắt đầu drag
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } }) // Touch di chuyên 10px mới bắt đầu drag
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState<ColumnType[]>([])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return
    if (active && over && active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(column => column._id === active.id)
      const newIndex = orderedColumns.findIndex(column => column._id === over.id)
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // const dndOrderedColumnsIds = dndOrderedColumns.map(column => column._id)
      setOrderedColumns(dndOrderedColumns)
    }
  }

  useEffect(() => {
    setOrderedColumns(mapOrder(board.columns, board.columnOrderIds, '_id'))
  }, [board])

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
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
    </DndContext>
  )
}

export default BoardContent
