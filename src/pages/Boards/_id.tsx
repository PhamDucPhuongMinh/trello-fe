import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { createColumnAPI, fetchBoardDetailsAPI, createCardAPI, updateBoardDetailsAPI } from '~/apis'
import { BoardType, ColumnType } from '~/types'
import { generatePlaceholcerCard } from '~/utils/formatter'
import { isEmpty } from 'lodash'

const Board: React.FC = () => {
  const [board, setBoard] = useState<BoardType | null>(null)

  const handleCreateColumn = async (title: string) => {
    if (board) {
      const createdColumn: ColumnType = await createColumnAPI({ boardId: board._id, title })

      // Thêm card rỗng để có thể kéo thả card vào column
      createdColumn.cards = [generatePlaceholcerCard(createdColumn)]
      createdColumn.cardOrderIds = [generatePlaceholcerCard(createdColumn)._id]

      const newBoard = { ...board }
      newBoard.columns.push(createdColumn)
      newBoard.columnOrderIds.push(createdColumn._id)
      setBoard(newBoard)
    }
  }

  const handleCreateCard = async (columnId: string, title: string) => {
    if (board) {
      const createdCard = await createCardAPI({ boardId: board._id, columnId, title })

      const newBoard = { ...board }
      const column = newBoard.columns.find(column => column._id === columnId)
      if (column) {
        column.cards.push(createdCard)
        column.cardOrderIds.push(createdCard._id)
      }
      setBoard(newBoard)
    }
  }

  // Xử lý sau khi kéo thả column ở event DragEnd
  const handleMoveColums = (orderedColumns: ColumnType[]) => {
    if (board) {
      const dndOrderedColumnsIds = orderedColumns.map(column => column._id)

      const newBoard = { ...board }
      newBoard.columns = orderedColumns
      newBoard.columnOrderIds = dndOrderedColumnsIds
      setBoard(newBoard)

      // Update API
      updateBoardDetailsAPI(board._id, newBoard)
    }
  }

  useEffect(() => {
    const boardId = '67b3f30391d98682ed4db77f' // Temporarily hardcoded
    fetchBoardDetailsAPI(boardId)
      .then((boardData: BoardType) => {
        // Thêm card rỗng vào column nếu column không có card để có thể kéo thả card vào column
        boardData.columns.forEach(column => {
          if (isEmpty(column.cards)) {
            column.cards = [generatePlaceholcerCard(column)]
            column.cardOrderIds = [generatePlaceholcerCard(column)._id]
          }
        })
        setBoard(boardData)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      {board && <BoardBar board={board} />}
      {board && (
        <BoardContent
          board={board}
          createColumn={handleCreateColumn}
          createCard={handleCreateCard}
          moveColums={handleMoveColums}
        />
      )}
    </Container>
  )
}

export default Board
